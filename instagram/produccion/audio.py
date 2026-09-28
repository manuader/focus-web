"""Banda sonora original para cada reel de FOCUS, sintetizada desde cero.

Música y efectos son una sola pieza, en la misma tonalidad (Re) y el mismo
espacio (una sola reverb), como pide la skill: pad cálido, aire, un pulso
bajo opcional, el "tick" de lente cuando algo entra en foco, un swell cuando
se abre el haz y un acorde que se resuelve (de Re menor 9 a Re mayor 9) en la
recomposición.

Uso: python3 audio.py ../entregables/reels/<nombre>.cues.json
Escribe <nombre>.wav y mezcla el .mp4 final con el video mudo.
"""
import json
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np
import imageio_ffmpeg

SR = 48000
RNG = np.random.default_rng(7)

D2 = 73.416
def hz(semi):  # semitonos sobre Re2
    return D2 * 2 ** (semi / 12)

CHORDS = {
    'min': [0, 12, 15, 19, 22, 26],   # D F A C E  (Dm9)
    'maj': [0, 12, 16, 19, 23, 26],   # D F# A C# E (Dmaj9)
    'sus': [0, 12, 17, 19, 24, 26],   # D G A D E  (Dsus)
}


def env_adsr(n, a, r):
    e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    if na:
        e[:na] = np.linspace(0, 1, na) ** 2
    if nr:
        e[-nr:] *= np.linspace(1, 0, nr) ** 2
    return e


def onepole_lp(x, fc):
    from scipy.signal import lfilter
    a = np.exp(-2 * np.pi * fc / SR)
    return lfilter([1 - a], [1, -a], x)


def pad(total, chords, dur):
    """Pad: cada voz es un par de senos desafinados con armónico suave."""
    out = np.zeros((total, 2))
    tt = np.arange(total) / SR
    # tramos de acorde
    marks = sorted(chords) + [[dur, None]]
    for (t0, name), (t1, _) in zip(marks, marks[1:]):
        i0, i1 = int(t0 * SR), min(total, int((t1 + 1.2) * SR))
        n = i1 - i0
        if n <= 0:
            continue
        seg = np.zeros((n, 2))
        t = tt[i0:i1]
        for k, semi in enumerate(CHORDS[name]):
            f = hz(semi)
            amp = 0.16 if k == 0 else 0.085 / (1 + 0.15 * k)
            for det, pan in ((-0.0025, 0.3), (0.0025, 0.7)):
                ph = RNG.uniform(0, 6.28)
                s = np.sin(2 * np.pi * f * (1 + det) * t + ph) + 0.18 * np.sin(4 * np.pi * f * (1 + det) * t + ph)
                lfo = 0.75 + 0.25 * np.sin(2 * np.pi * (0.07 + 0.03 * k) * t + k)
                seg[:, 0] += s * amp * lfo * (1 - pan)
                seg[:, 1] += s * amp * lfo * pan
        e = env_adsr(n, 1.6, 1.2)[:, None]
        out[i0:i1] += seg * e
    return out


def noise_band(n, lo, hi):
    from scipy.signal import butter, sosfilt
    sos = butter(2, [lo, hi], btype='band', fs=SR, output='sos')
    return sosfilt(sos, RNG.standard_normal(n))


def add(buf, t, sig, gain=1.0, pan=0.5):
    i = int(t * SR)
    if i >= len(buf):
        return
    n = min(len(sig), len(buf) - i)
    buf[i:i + n, 0] += sig[:n] * gain * (1 - pan) * 2
    buf[i:i + n, 1] += sig[:n] * gain * pan * 2


def tick():
    n = int(0.25 * SR)
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * hz(60) * t) * np.exp(-t * 38)          # Re7, brillante y corto
    s += 0.5 * np.sin(2 * np.pi * hz(48) * t) * np.exp(-t * 22)   # Re6
    s += 0.25 * noise_band(n, 3000, 9000) * np.exp(-t * 160)      # el "clic" mecánico
    return s * 0.22


def click():
    n = int(0.12 * SR)
    t = np.arange(n) / SR
    return (noise_band(n, 1500, 6000) * np.exp(-t * 90) + 0.4 * np.sin(2 * np.pi * hz(43) * t) * np.exp(-t * 60)) * 0.16


def swell(length=2.2):
    n = int(length * SR)
    t = np.arange(n) / SR
    e = np.sin(np.pi * np.clip(t / length, 0, 1)) ** 2
    return noise_band(n, 400, 5000) * e * 0.05


def resolve():
    n = int(4.5 * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for k, semi in enumerate([24, 28, 31, 35, 38]):  # D4 F#4 A4 C#5 E5
        s += np.sin(2 * np.pi * hz(semi) * t) * np.exp(-t * (0.9 + 0.2 * k)) / (1 + 0.3 * k)
    return s * env_adsr(n, 0.02, 0.5) * 0.11


def low():
    n = int(2.4 * SR)
    t = np.arange(n) / SR
    f = 55 * np.exp(-t * 0.6) + 36
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.6) * 0.34


def kick():
    n = int(0.5 * SR)
    t = np.arange(n) / SR
    f = 42 + 60 * np.exp(-t * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7) * 0.30


def shaker():
    n = int(0.09 * SR)
    t = np.arange(n) / SR
    return noise_band(n, 6000, 12000) * np.exp(-t * 55) * 0.035


def reverb(x, secs=2.6, mix=0.28):
    from scipy.signal import fftconvolve
    n = int(secs * SR)
    t = np.arange(n) / SR
    ir = np.stack([RNG.standard_normal(n) * np.exp(-t * 3.2), RNG.standard_normal(n) * np.exp(-t * 3.0)], 1)
    ir[:, 0] = onepole_lp(ir[:, 0], 5000)
    ir[:, 1] = onepole_lp(ir[:, 1], 5000)
    ir /= np.sqrt((ir ** 2).sum(0))
    wet = np.stack([fftconvolve(x[:, c], ir[:, c])[: len(x)] for c in (0, 1)], 1)
    return x * (1 - mix) + wet * mix


def build(cues):
    dur = cues['dur']
    total = int((dur + 0.05) * SR)
    music = pad(total, cues.get('chords', [[0, 'min']]), dur)
    air = noise_band(total, 300, 3000)
    music[:, 0] += air * 0.012
    music[:, 1] += np.roll(air, 900) * 0.012

    fx = np.zeros((total, 2))
    if cues.get('pulse'):
        a, b = cues['pulse']
        beat = 60 / cues.get('bpm', 84)
        t = a
        k = 0
        while t < b:
            add(fx, t, kick(), 1.0)
            add(fx, t + beat / 2, shaker(), 1.0, 0.35 + 0.3 * (k % 2))
            t += beat
            k += 1
    SFX = {'tick': tick, 'click': click, 'swell': swell, 'resolve': resolve, 'low': low}
    for ev in cues.get('events', []):
        t, kind = ev[0], ev[1]
        pan = ev[2] if len(ev) > 2 else 0.5
        add(fx, t, SFX[kind](), 1.0, pan)

    mix = reverb(music * 0.9 + fx)
    # fundidos de entrada y salida
    fi, fo = int(0.35 * SR), int(1.2 * SR)
    mix[:fi] *= np.linspace(0, 1, fi)[:, None]
    mix[-fo:] *= np.linspace(1, 0, fo)[:, None] ** 1.5
    # nivel: RMS a ~ -16 dBFS y techo a -1 dBFS (aprox. -14 LUFS para este material)
    rms = np.sqrt((mix ** 2).mean())
    mix *= 10 ** (-16 / 20) / max(rms, 1e-9)
    peak = np.abs(mix).max()
    ceil = 10 ** (-1 / 20)
    if peak > ceil:
        mix = np.tanh(mix / ceil) * ceil
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
    write_wav(wav, build(cues))
    silent = cues_path.with_name(name + '.silent.mp4')
    final = cues_path.with_name(name + '.mp4')
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    subprocess.run([ff, '-y', '-loglevel', 'error', '-i', str(silent), '-i', str(wav), '-c:v', 'copy',
                    '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest', '-movflags', '+faststart', str(final)], check=True)
    print('listo', final)
