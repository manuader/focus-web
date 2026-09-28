"""FOCUS · banda sonora original de cada anuncio, sintetizada desde cero.

Lee la partitura (cues) que escribe render.mjs desde el SPEC del anuncio, así
imagen y sonido comparten una sola fuente de verdad del tiempo. Música y
efectos son una pieza: misma tonalidad, mismo espacio, los efectos debajo
de la música. Carácter de la marca: ambient electrónico, pads cálidos,
cristal, pulso bajo, nada de whooshes de librería (el barrido del montaje
se sintetiza en el mismo espacio).

Partitura:
  key       tónica en semitonos sobre La (0 = A, 5 = D, 7 = E...)
  bpm       tempo del pulso
  chords    [[t, 'min9'|'maj9'|'sus2'|'lyd'|'min11'|'add9', grado], ...]
  energy    [[t, 0..1], ...]  brillo del pad y presencia del pulso
  layers    {'pulse': [[a, b]], 'hats': [[a, b]], 'bass': [[a, b]],
             'arp': [[a, b, 'up'|'down'|'bell']], 'air': 1}
  events    [[t, tipo, ganancia, paneo], ...]  tipos en SFX
  duck      true: la música baja 3 dB en cada impacto

Uso: python audio2.py ../entregables/anuncios/<nombre>.cues.json
Escribe <nombre>.wav y el <nombre>.mp4 final (video mudo + audio).
"""
import json
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np
from scipy.signal import butter, sosfilt, sosfiltfilt, fftconvolve, sawtooth, resample_poly, lfilter

SR = 48000
RNG = np.random.default_rng(11)
A1 = 55.0

CHORDS = {
    'min9': [0, 7, 12, 15, 19, 22, 26],
    'min11': [0, 7, 12, 15, 17, 22, 26],
    'maj9': [0, 7, 12, 16, 19, 23, 26],
    'lyd': [0, 7, 12, 16, 18, 23, 26],      # maj7#11: la luz
    'sus2': [0, 7, 12, 14, 19, 24, 26],
    'sus4': [0, 7, 12, 17, 19, 24, 29],
    'add9': [0, 7, 12, 16, 19, 26, 28],
    'min7': [0, 7, 12, 15, 19, 22, 27],
}


def hz(semi):
    return A1 * 2 ** (semi / 12)


def bp(lo, hi, order=2):
    return butter(order, [lo, hi], btype='band', fs=SR, output='sos')


def lp(fc, order=2):
    return butter(order, fc, btype='low', fs=SR, output='sos')


def hp(fc, order=2):
    return butter(order, fc, btype='high', fs=SR, output='sos')


def interp_env(points, total, default=0.5):
    """[[t, v], ...] → curva por muestra, con interpolación suave."""
    if not points:
        return np.full(total, default)
    ts = np.array([p[0] for p in points]) * SR
    vs = np.array([p[1] for p in points], dtype=float)
    x = np.arange(total)
    e = np.interp(x, ts, vs)
    # suavizado (medio segundo) para que no haya escalones
    k = int(0.35 * SR)
    ker = np.hanning(k)
    ker /= ker.sum()
    return np.convolve(e, ker, mode='same')


def add(buf, t, sig, gain=1.0, pan=0.5):
    i = int(round(t * SR))
    if i >= len(buf) or i + len(sig) <= 0:
        return
    s = sig
    if i < 0:
        s = sig[-i:]
        i = 0
    n = min(len(s), len(buf) - i)
    if s.ndim == 1:
        buf[i:i + n, 0] += s[:n] * gain * np.sqrt(2 * (1 - pan))
        buf[i:i + n, 1] += s[:n] * gain * np.sqrt(2 * pan)
    else:
        buf[i:i + n] += s[:n] * gain


def adsr(n, a, r, curve=2.0):
    e = np.ones(n)
    na, nr = min(n, int(a * SR)), min(n, int(r * SR))
    if na:
        e[:na] = np.linspace(0, 1, na) ** curve
    if nr:
        e[-nr:] *= np.linspace(1, 0, nr) ** curve
    return e


# ---------------------------------------------------------------- grilla de tiempo

def beat_grid(a, b, anchors, nominal, forced=()):
    """Tiempos de pulso entre a y b que caen exactamente en cada ancla (los
    cortes del video). Cada tramo entre anclas se divide en un número entero
    de pulsos, así el tempo varía apenas (unos puntos) y todo corte cae en un
    tiempo fuerte."""
    pts = [a]
    forced = set(round(x, 3) for x in forced)
    for x in sorted(set(anchors) | forced):
        gap = 1.8 if round(x, 3) in forced else 2.9
        if a + nominal * gap <= x <= b - nominal * gap and x - pts[-1] >= nominal * gap:
            pts.append(x)
    pts.append(b)
    out = []
    for t0, t1 in zip(pts, pts[1:]):
        n = max(1, round((t1 - t0) / nominal))
        out += [t0 + k * (t1 - t0) / n for k in range(n)]
    return out


# ---------------------------------------------------------------- instrumentos

def supersaw(f, n, voices=5, spread=0.012):
    t = np.arange(n) / SR
    s = np.zeros(n)
    for v in range(voices):
        det = 1 + spread * (v - (voices - 1) / 2) / ((voices - 1) / 2 or 1)
        s += sawtooth(2 * np.pi * f * det * t + RNG.uniform(0, 6.28))
    return s / voices


def pad_layer(total, chords, key, energy, dur):
    """Pad: supersaw filtrado, dos versiones (oscura y brillante) que se
    mezclan según la energía. Cada voz respira con su propio LFO."""
    dark = np.zeros((total, 2))
    marks = sorted(chords, key=lambda c: c[0]) + [[dur + 2, None, 0]]
    for (t0, name, deg), (t1, _, _) in zip(marks, marks[1:]):
        i0 = int(t0 * SR)
        i1 = min(total, int((t1 + 1.6) * SR))
        n = i1 - i0
        if n <= 0:
            continue
        seg = np.zeros((n, 2))
        tt = np.arange(n) / SR
        root = key + deg + 12  # La2 + tónica
        for k, semi in enumerate(CHORDS[name]):
            f = hz(root + semi)
            amp = (0.22 if k == 0 else 0.13) / (1 + 0.12 * k)
            s = supersaw(f, n, voices=4 if k else 3, spread=0.008 + 0.002 * k)
            lfo = 0.8 + 0.2 * np.sin(2 * np.pi * (0.05 + 0.021 * k) * tt + k * 1.3)
            pan = 0.5 + 0.32 * np.sin(k * 2.1)
            seg[:, 0] += s * amp * lfo * np.sqrt(1 - pan)
            seg[:, 1] += s * amp * lfo * np.sqrt(pan)
        e = adsr(n, 1.4, 1.6)[:, None]
        dark[i0:i1] += seg * e
    bright = np.stack([sosfilt(lp(4200, 2), dark[:, c]) for c in (0, 1)], 1)
    darkf = np.stack([sosfilt(lp(900, 2), dark[:, c]) for c in (0, 1)], 1)
    en = energy[:, None]
    out = darkf * (1 - en) * 1.3 + bright * en * 0.8
    return sosfilt(hp(70), out, axis=0)


def sub_bass(total, chords, key, spans, bpm, dur, anchors=(), forced=()):
    out = np.zeros(total)
    beat = 60 / bpm
    marks = sorted(chords, key=lambda c: c[0]) + [[dur + 2, None, 0]]
    for a, b in spans:
        for t in beat_grid(a, b, anchors, beat, forced)[::2]:
            # tónica del acorde vigente
            deg = [c for c in marks if c[0] <= t + 1e-6][-1][2]
            f = hz(key + deg - 12 + 12)  # La1..La2
            n = int(beat * 2 * SR)
            tt = np.arange(n) / SR
            s = np.sin(2 * np.pi * f * tt) + 0.12 * np.sin(4 * np.pi * f * tt)
            s = np.tanh(s * 1.4) * adsr(n, 0.02, beat * 0.9, 1.5) * np.exp(-tt * 0.6)
            i = int(t * SR)
            m = min(n, total - i)
            if m > 0:
                out[i:i + m] += s[:m] * 0.16
    return out


def kick(v=1.0):
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = 44 + 70 * np.exp(-t * 32)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 8.5)
    s += sosfilt(bp(1500, 5000), RNG.standard_normal(n)) * np.exp(-t * 180) * 0.12
    return np.tanh(s * 1.3) * 0.34 * v


def hat(v=1.0, open_=False):
    n = int((0.22 if open_ else 0.06) * SR)
    t = np.arange(n) / SR
    s = sosfilt(bp(7000, 15000), RNG.standard_normal(n)) * np.exp(-t * (18 if open_ else 75))
    return s * 0.05 * v


def pluck(f, dur=0.6, bright=1.0):
    n = int(dur * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(4 * np.pi * f * t) * np.exp(-t * 8) + 0.15 * sawtooth(2 * np.pi * f * t) * np.exp(-t * 14) * bright
    return s * np.exp(-t * 5.5) * adsr(n, 0.004, 0.05) * 0.1


def bell(f, dur=2.4, idx=2.2):
    n = int(dur * SR)
    t = np.arange(n) / SR
    mod = np.sin(2 * np.pi * f * 3.5 * t) * idx * np.exp(-t * 3)
    s = np.sin(2 * np.pi * f * t + mod) * np.exp(-t * 1.6)
    s += 0.3 * np.sin(2 * np.pi * f * 2.0 * t) * np.exp(-t * 3.2)
    return s * adsr(n, 0.003, 0.2) * 0.075


def arp_layer(total, chords, key, spans, bpm, dur, anchors=(), forced=()):
    out = np.zeros((total, 2))
    marks = sorted(chords, key=lambda c: c[0]) + [[dur + 2, None, 0]]
    for span in spans:
        a, b = span[0], span[1]
        mode = span[2] if len(span) > 2 else 'up'
        g = beat_grid(a, b, anchors, 60 / bpm, forced) + [b]
        steps = []
        for u, v in zip(g, g[1:]):
            steps += [u, (u + v) / 2]
        for k, t in enumerate(steps):
            if t >= b - 0.05:
                break
            name, deg = [(c[1], c[2]) for c in marks if c[0] <= t + 1e-6][-1]
            tones = CHORDS[name][2:]
            if mode == 'down':
                tones = tones[::-1]
            semi = tones[k % len(tones)] + (12 if (k // len(tones)) % 2 else 0)
            f = hz(key + deg + 24 + semi)
            prog = (t - a) / max(0.1, b - a)
            if mode == 'bell':
                if k % 2 == 0:
                    add(out, t, bell(f, 2.0, 1.8), 0.9, 0.3 + 0.4 * ((k // 2) % 2))
            else:
                v = 0.6 + 0.4 * (k % 4 == 0)
                add(out, t, pluck(f, 0.5, 0.6 + prog), v, 0.25 + 0.5 * (k % 2))
    # delay ping-pong a corchea con puntillo
    d = int(60 / bpm * 0.75 * SR)
    wet = np.zeros_like(out)
    fb = 0.38
    for rep in range(1, 5):
        g = fb ** rep
        ch = rep % 2
        if d * rep < total:
            wet[d * rep:, ch] += out[:-d * rep, 1 - ch] * g
    return out + sosfilt(lp(5000), wet, axis=0) * 0.7


# ---------------------------------------------------------------- efectos

def fx_tick():
    n = int(0.3 * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * 2349 * t) * np.exp(-t * 40) + 0.5 * np.sin(2 * np.pi * 1174.7 * t) * np.exp(-t * 22)
    s += 0.3 * sosfilt(bp(3000, 9000), RNG.standard_normal(n)) * np.exp(-t * 170)
    return s * 0.13


def fx_click():
    n = int(0.12 * SR)
    t = np.arange(n) / SR
    return (sosfilt(bp(1500, 6000), RNG.standard_normal(n)) * np.exp(-t * 95) + 0.4 * np.sin(2 * np.pi * 880 * t) * np.exp(-t * 60)) * 0.12


def fx_shutter():
    a = fx_click()
    n = int(0.07 * SR) + len(a)
    s = np.zeros(n)
    s[:len(a)] += a
    s[int(0.07 * SR):int(0.07 * SR) + len(a)] += a * 0.7
    return s * 1.2


def fx_type(count=14, span=1.4):
    n = int((span + 0.1) * SR)
    s = np.zeros(n)
    for i in range(count):
        t = i * span / count + RNG.uniform(-0.02, 0.02)
        k = fx_click() * RNG.uniform(0.3, 0.7)
        j = max(0, int(t * SR))
        m = min(len(k), n - j)
        s[j:j + m] += k[:m]
    return s * 0.7


def fx_blip(up=True):
    n = int(0.18 * SR)
    t = np.arange(n) / SR
    f = (1400 if up else 2100) * np.exp((1 if up else -1) * t * 3)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 26) * 0.07


def fx_swell(length=2.2):
    n = int(length * SR)
    t = np.arange(n) / SR
    e = np.sin(np.pi * np.clip(t / length, 0, 1)) ** 2
    return sosfilt(bp(300, 5000), RNG.standard_normal(n)) * e * 0.05


def fx_riser(length=2.0):
    """Subida de aire que desemboca en el corte (termina en t)."""
    n = int(length * SR)
    t = np.arange(n) / SR
    x = t / length
    noise = RNG.standard_normal(n)
    out = np.zeros(n)
    blocks = 24
    for b in range(blocks):
        i0, i1 = b * n // blocks, (b + 1) * n // blocks
        c = 400 * (18 ** (b / blocks))
        seg = sosfilt(bp(c * 0.6, min(c * 1.6, 20000)), noise[max(0, i0 - 2000):i1])[-(i1 - i0):]
        out[i0:i1] = seg
    tone = np.sin(2 * np.pi * np.cumsum(220 * (2 ** (x * 2))) / SR) * 0.25
    return (out + tone * 0.3) * (x ** 2.2) * 0.09


def fx_impact():
    n = int(3.0 * SR)
    t = np.arange(n) / SR
    f = 36 + 50 * np.exp(-t * 7)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.2)
    air = sosfilt(bp(200, 3000), RNG.standard_normal(n)) * np.exp(-t * 5) * 0.4
    return np.tanh((boom * 0.9 + air) * 1.2) * 0.3


def fx_low():
    n = int(2.4 * SR)
    t = np.arange(n) / SR
    f = 55 * np.exp(-t * 0.6) + 36
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.6) * 0.28


def fx_resolve(key):
    n = int(5.0 * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for k, semi in enumerate([24, 28, 31, 35, 38, 43]):
        s += np.sin(2 * np.pi * hz(key + semi + 12) * t) * np.exp(-t * (0.8 + 0.2 * k)) / (1 + 0.3 * k)
    return s * adsr(n, 0.02, 0.6) * 0.09


def fx_glass(key):
    s = np.zeros(int(3 * SR))
    for k, semi in enumerate([36, 43, 48]):
        b = bell(hz(key + semi + 12), 2.8, 3.0)
        s[int(k * 0.035 * SR):int(k * 0.035 * SR) + len(b)] += b
    return s * 1.4


def fx_reverse(key, length=1.6):
    b = fx_glass(key)[: int(length * SR)]
    b = np.convolve(b, np.exp(-np.arange(int(0.4 * SR)) / SR * 6) * 0.02, mode='full')[: int(length * SR)]
    r = b[::-1]
    return r / (np.abs(r).max() + 1e-9) * 0.09


def fx_swish(length=0.62, peak=0.55):
    """Barrido de aire del montaje: sube hacia el corte y se apaga enseguida.
    Filtrado y en la tonalidad del espacio, no un whoosh de librería."""
    n = int(length * SR)
    t = np.arange(n) / SR
    x = t / length
    noise = RNG.standard_normal(n)
    out = np.zeros(n)
    blocks = 20
    for b in range(blocks):
        i0, i1 = b * n // blocks, (b + 1) * n // blocks
        u = (b + 0.5) / blocks
        c = 700 * (9 ** min(u / peak, 1.0)) * (1 - 0.5 * max(0.0, (u - peak) / (1 - peak)))
        seg = sosfilt(bp(c * 0.55, min(c * 1.7, 20000)), noise[max(0, i0 - 1500):i1])[-(i1 - i0):]
        out[i0:i1] = seg
    e = np.where(x < peak, (x / peak) ** 2.6, np.exp(-(x - peak) * 14))
    return out * e * 0.11


def fx_thump():
    """Golpe seco y corto para los cortes de encuadre."""
    n = int(0.5 * SR)
    t = np.arange(n) / SR
    f = 48 + 70 * np.exp(-t * 30)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 11)
    tick = sosfilt(bp(2500, 8000), RNG.standard_normal(n)) * np.exp(-t * 220) * 0.25
    return (body + tick) * 0.16


def fx_breath():
    n = int(1.2 * SR)
    t = np.arange(n) / SR
    e = np.sin(np.pi * t / 1.2) ** 3
    return sosfilt(bp(500, 2500), RNG.standard_normal(n)) * e * 0.035


# ---------------------------------------------------------------- espacio y master

def reverb(x, secs=3.2, mix=0.3, pre=0.018):
    n = int(secs * SR)
    t = np.arange(n) / SR
    ir = np.stack([RNG.standard_normal(n) * np.exp(-t * 2.6), RNG.standard_normal(n) * np.exp(-t * 2.45)], 1)
    ir[:, 0] = sosfilt(lp(6500, 1), ir[:, 0])
    ir[:, 1] = sosfilt(lp(6000, 1), ir[:, 1])
    ir = np.concatenate([np.zeros((int(pre * SR), 2)), ir])
    ir /= np.sqrt((ir ** 2).sum(0))
    wet = np.stack([fftconvolve(x[:, c], ir[:, c])[: len(x)] for c in (0, 1)], 1)
    wet = sosfilt(hp(180), wet, axis=0)
    return x * (1 - mix) + wet * mix


def k_weight(x):
    # BS.1770: shelf + highpass (coeficientes a 48 kHz)
    b1 = [1.53512485958697, -2.69169618940638, 1.19839281085285]
    a1 = [1.0, -1.69065929318241, 0.73248077421585]
    b2 = [1.0, -2.0, 1.0]
    a2 = [1.0, -1.99004745483398, 0.99007225036621]
    return lfilter(b2, a2, lfilter(b1, a1, x, axis=0), axis=0)


def lufs(x):
    y = k_weight(x)
    blk, hop = int(0.4 * SR), int(0.1 * SR)
    ms = []
    for i in range(0, len(y) - blk, hop):
        ms.append((y[i:i + blk] ** 2).mean(0).sum())
    ms = np.array(ms)
    l = -0.691 + 10 * np.log10(ms + 1e-12)
    g = ms[l > -70]
    rel = -0.691 + 10 * np.log10(g.mean() + 1e-12) - 10
    g2 = ms[(l > -70) & (l > rel)]
    return -0.691 + 10 * np.log10(g2.mean() + 1e-12)


def true_peak(x):
    return np.abs(resample_poly(x, 4, 1, axis=0)).max()


def limiter(x, ceiling_db=-1.2, look=0.004, release=0.12):
    ceil = 10 ** (ceiling_db / 20)
    peak = np.abs(x).max(1)
    need = np.minimum(1, ceil / np.maximum(peak, 1e-9))
    la = int(look * SR)
    # mínimo en la ventana de anticipación
    from scipy.ndimage import minimum_filter1d
    g = minimum_filter1d(need, size=2 * la + 1)
    # suavizado: ataque instantáneo (ya anticipado), release exponencial
    a = np.exp(-1 / (release * SR))
    out = np.empty_like(g)
    cur = 1.0
    for i in range(len(g)):
        cur = g[i] if g[i] < cur else a * cur + (1 - a) * g[i]
        out[i] = cur
    return x * out[:, None]


def build(cues):
    dur = cues['dur']
    total = int((dur + 0.05) * SR)
    key = cues.get('key', 5)
    bpm = cues.get('bpm', 84)
    chords = cues.get('chords', [[0, 'min9', 0]])
    L = cues.get('layers', {})
    energy = interp_env(cues.get('energy', [[0, 0.3], [dur, 0.6]]), total)

    # anclas de la grilla: los cortes marcados en la partitura
    anchors = [ev[0] for ev in cues.get('events', []) if ev[1] in ('impact', 'click', 'shutter', 'low', 'thump')]
    forced = list(cues.get('grid', []))
    music = pad_layer(total, chords, key, energy, dur) * 0.55
    if L.get('bass'):
        b = sub_bass(total, chords, key, L['bass'], bpm, dur, anchors, forced)
        music[:, 0] += b
        music[:, 1] += b
    if L.get('arp'):
        music += arp_layer(total, chords, key, L['arp'], bpm, dur, anchors, forced) * 0.9
    if L.get('air', 1):
        air = sosfilt(bp(300, 3500), RNG.standard_normal(total))
        music[:, 0] += air * 0.006 * (0.6 + energy)
        music[:, 1] += np.roll(air, 1100) * 0.006 * (0.6 + energy)

    drums = np.zeros((total, 2))
    beat = 60 / bpm
    kicks = []
    for a, b in L.get('pulse', []):
        g = beat_grid(a, b, anchors, beat, forced)
        kicks += g
        for k, t in enumerate(g):
            add(drums, t, kick(0.8 + 0.2 * (k % 4 == 0)), 1.0)
    for span in L.get('hats', []):
        a, b = span[0], span[1]
        g = beat_grid(a, b, anchors, beat, forced) + [b]
        for k, (u, v) in enumerate(zip(g, g[1:])):
            t = (u + v) / 2
            add(drums, t, hat(0.7 + 0.3 * (k % 2)), 1.0, 0.35 + 0.3 * (k % 2))
            if len(span) > 2 and span[2] == 16:
                add(drums, t + (v - u) / 4, hat(0.35), 1.0, 0.6)

    fx = np.zeros((total, 2))
    duck = np.ones(total)
    SFX = {
        'tick': fx_tick, 'click': fx_click, 'shutter': fx_shutter, 'type': fx_type,
        'blip': fx_blip, 'blipdown': lambda: fx_blip(False), 'swell': fx_swell, 'impact': fx_impact,
        'low': fx_low, 'resolve': lambda: fx_resolve(key), 'glass': lambda: fx_glass(key),
        'breath': fx_breath, 'thump': fx_thump,
    }
    for ev in cues.get('events', []):
        t, kind = ev[0], ev[1]
        gain = ev[2] if len(ev) > 2 else 1.0
        pan = ev[3] if len(ev) > 3 else 0.5
        if kind == 'riser':
            ln = ev[4] if len(ev) > 4 else 2.0
            add(fx, t - ln, fx_riser(ln), gain, pan)
        elif kind == 'swish':
            add(fx, t - 0.62 * 0.55, fx_swish(), gain, pan)
        elif kind == 'reverse':
            ln = ev[4] if len(ev) > 4 else 1.6
            add(fx, t - ln, fx_reverse(key, ln), gain, pan)
        else:
            add(fx, t, SFX[kind](), gain, pan)
        if kind in ('impact', 'low') and cues.get('duck', True):
            i = int(t * SR)
            n = int(1.2 * SR)
            if i < total:
                m = min(n, total - i)
                duck[i:i + m] = np.minimum(duck[i:i + m], 1 - 0.3 * np.exp(-np.arange(m) / SR * 2.5))
    # sidechain del pulso sobre la música: respira con el bombo
    for t in kicks:
        i = int(t * SR)
        n = int(beat * 0.9 * SR)
        if i < total:
            m = min(n, total - i)
            duck[i:i + m] = np.minimum(duck[i:i + m], 1 - 0.22 * np.exp(-np.arange(m) / SR * 7))

    mix = music * duck[:, None] + drums * 0.9 + fx
    mix = reverb(mix, mix=0.28)
    # fundidos
    fi, fo = int(0.08 * SR), int(cues.get('fadeOut', 1.4) * SR)
    mix[:fi] *= np.linspace(0, 1, fi)[:, None]
    mix[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.6
    # master: glue suave, loudness -14 LUFS, limitador con true peak < -1 dBTP
    mix = np.tanh(mix * 1.1) / 1.1
    target = cues.get('lufs', -14.0)
    for _ in range(5):
        cur = lufs(mix)
        mix *= 10 ** ((target - cur) / 20)
        mix = limiter(mix, -2.6, release=0.08)
    # techo de true peak con margen para el códec AAC (que agrega sobrepicos)
    tp = true_peak(mix)
    if tp > 10 ** (-2.0 / 20):
        mix *= 10 ** (-2.0 / 20) / tp
    return mix


def write_wav(path, x):
    y = (np.clip(x, -1, 1) * 32767).astype('<i2')
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(y.tobytes())


if __name__ == '__main__':
    cues_path = Path(sys.argv[1])
    cues = json.loads(cues_path.read_text())
    name = cues_path.name.replace('.cues.json', '')
    wav = cues_path.with_name(name + '.wav')
    mix = build(cues)
    write_wav(wav, mix)
    print(f'{name}: {lufs(mix):.1f} LUFS · true peak {20 * np.log10(true_peak(mix)):.1f} dBTP')
    silent = cues_path.with_name(name + '.silent.mp4')
    final = cues_path.with_name(name + '.mp4')
    if silent.exists():
        # El master de video sale de capturas JPEG (rango completo). Acá se pasa a
        # rango de TV con matriz BT.709 y etiquetas explícitas, que es lo que
        # esperan los teléfonos y el reproductor de Instagram.
        # Portada: el cuadro asentado que indica el SPEC, tomado del master, y el
        # cuadro 0 del video es esa misma portada (así la muestra Instagram).
        cover = cues_path.with_name(name + '.jpg')
        vf = 'scale=in_range=full:out_range=tv:out_color_matrix=bt709,format=yuv420p'
        inputs = ['-i', str(silent), '-i', str(wav)]
        if cues.get('cover') is not None:
            subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', f"{cues['cover']:.3f}", '-i', str(silent), '-frames:v', '1', '-q:v', '2', str(cover)], check=True)
            inputs += ['-i', str(cover)]
            vf = "[0:v][2:v]overlay=enable='eq(n,0)'," + vf
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *inputs,
                        '-filter_complex' if cues.get('cover') is not None else '-vf', vf + ('[v]' if cues.get('cover') is not None else ''),
                        *(['-map', '[v]', '-map', '1:a'] if cues.get('cover') is not None else []),
                        '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-profile:v', 'high', '-level', '4.2', '-g', '60',
                        '-color_range', 'tv', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
                        '-c:a', 'aac', '-b:a', '256k', '-ar', '48000', '-shortest', '-movflags', '+faststart',
                        '-metadata', 'title=' + name, str(final)], check=True)
        print('listo', final)
