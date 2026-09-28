/* Prisma: un haz blanco entra, el vidrio lo descompone en las siete bandas
   de la marca y (en modo 'merge') las vuelve a juntar en un haz blanco.
   opts: mode 'split'|'merge', timings {beam:[a,b], bands:[a,b], exit:[a,b]},
   cam {from:[x,y,z], to:[x,y,z], dur}, labels: nada (los rótulos van en DOM). */
import { studio, beam, rim, p, io, out, lerp, SPECTRUM } from './_studio.js';

export async function create({ THREE, canvas, W, H, opts }) {
  const S = studio(THREE, canvas, W, H, { bloom: 0.85, bloomT: 0.7, room: 1.2, roomY: 0.5, envInt: 1.3, ...opts.studio });
  const { scene, cam, comp } = S;
  const s = opts.size ?? 0.85;
  const sh = new THREE.Shape();
  for (let i = 0; i < 3; i++) { const a = Math.PI / 2 + (i * 2 * Math.PI) / 3; const x = s * Math.cos(a), y = s * Math.sin(a); i ? sh.lineTo(x, y) : sh.moveTo(x, y); }
  sh.closePath();
  const geo = new THREE.ExtrudeGeometry(sh, { depth: opts.depth ?? 1.5, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.025, bevelSegments: 5 });
  geo.center();
  const mat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.03, transmission: 1, thickness: 1.3, ior: 1.6, dispersion: 7, specularIntensity: 1, clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 1.3, attenuationColor: new THREE.Color(0xe8ecff), attenuationDistance: 6 });
  const prism = new THREE.Mesh(geo, mat);
  scene.add(prism);
  // aristas: filo fino que dibuja el volumen sobre la tinta
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), new THREE.LineBasicMaterial({ color: 0xf6f6f4, transparent: true, opacity: opts.edge ?? 0.55 }));
  prism.add(edges);
  prism.add(rim(THREE, geo, opts.rim ?? 0.35));

  const white = beam(THREE, scene, 0xffffff, 0.11);
  const inner = beam(THREE, scene, 0xffffff, 0.06);
  const bands = SPECTRUM.map((c) => beam(THREE, scene, c, 0.085));
  const exitW = beam(THREE, scene, 0xffffff, 0.1);
  const T = { beam: [0.3, 1.6], bands: [1.6, 3.2], exit: [3.4, 4.6], ...opts.t };
  const mode = opts.mode || 'split';
  const V = (x, y, z = 0.25) => new THREE.Vector3(x, y, z);
  // Composición vertical: la luz cae desde arriba, se abre hacia abajo.
  const entry = V(...(opts.entry ?? [-0.18, 0.5, 0.2])), exit = V(...(opts.exit ?? [0.12, -0.42, 0.2]));
  const src = V(...(opts.src ?? [-1.6, 7.5, 0.2]));
  const bandTo = (i) => V(...(opts.bandTo ? opts.bandTo(i) : [1.2 + i * 0.55, -7.5, 0.2]));
  const mergeFrom = (i) => V(...(opts.mergeFrom ? opts.mergeFrom(i) : [-3.6 + i * 0.5, 7.5, 0.2]));
  const outTo = V(...(opts.outTo ?? [0.9, -7.5, 0.2]));
  inner.mat.depthTest = false;

  return {
    update(t, l) {
      const k = opts.time ? opts.time(l) : l;
      // cámara: deriva lenta, siempre hacia la resolución
      const cf = opts.cam?.from ?? [0.3, 0.6, 10.5], ct = opts.cam?.to ?? [0.1, 0.2, 8.6];
      const ck = io(p(k, 0, opts.cam?.dur ?? 12));
      cam.position.set(lerp(cf[0], ct[0], ck), lerp(cf[1], ct[1], ck), lerp(cf[2], ct[2], ck));
      cam.lookAt(opts.look?.[0] ?? 0, opts.look?.[1] ?? 0, 0);
      prism.rotation.set(0.35 + 0.03 * Math.sin(k * 0.3), 0.75 + k * (opts.spin ?? 0.02), 0.12);
      const kb = io(p(k, ...T.beam)), kd = io(p(k, ...T.bands)), ke = io(p(k, ...T.exit));
      const breath = 1 + 0.08 * Math.sin(k * 2.1);
      if (mode === 'split') {
        white.set(src, entry, 2.2 * breath, kb);
        inner.set(entry, exit, 0.9 * (kb >= 1 ? 1 : 0), kb >= 1 ? 1 : 0);
        bands.forEach((b, i) => {
          const to = bandTo(i);
          const hi = opts.focusBand == null ? 1 : (i === opts.focusBand ? 1.8 : lerp(1, 0.25, io(p(k, ...(opts.focusAt || [99, 100])))));
          b.set(exit, to, 1.6 * breath * hi, kd);
        });
        exitW.set(exit, exit, 0, 0);
      } else {
        // merge: las bandas llegan desde la izquierda y sale un solo haz blanco
        bands.forEach((b, i) => {
          b.set(mergeFrom(i), entry, 1.5 * breath, kd);
        });
        inner.set(entry, exit, 1.2 * (kd >= 1 ? 1 : 0), kd >= 1 ? 1 : 0);
        exitW.set(exit, outTo, 2.3 * breath, ke);
        white.set(src, src, 0, 0);
      }
      S.bloom.strength = (opts.studio?.bloom ?? 0.85) * (1 + 0.35 * (mode === 'merge' ? out(p(k, T.exit[1] - 0.3, T.exit[1] + 0.6)) : 0));
      comp.render();
    },
  };
}
