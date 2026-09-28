/* Órbita: anillos de vidrio concéntricos que giran como un calendario. Cada
   anillo es un ciclo (el mes); un punto de luz recorre el anillo activo.
   opts: n anillos, active(t) → índice del anillo iluminado, tilt, count de marcas. */
import { studio, rim, p, io, out, lerp } from './_studio.js';

export async function create({ THREE, canvas, W, H, opts }) {
  const S = studio(THREE, canvas, W, H, { bloom: 0.9, bloomT: 0.68, room: 1.1, envInt: 1.25, fov: 28, ...opts.studio });
  const { scene, cam, comp } = S;
  const group = new THREE.Group();
  scene.add(group);
  const n = opts.n ?? 4;
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.04, transmission: 1, thickness: 0.4, ior: 1.55, dispersion: 5, clearcoat: 1, envMapIntensity: 1.4 });
  const rings = [];
  for (let i = 0; i < n; i++) {
    const R = 0.9 + i * 0.62;
    const geo = new THREE.TorusGeometry(R, 0.045 + i * 0.006, 48, 320);
    const m = new THREE.Mesh(geo, glass);
    m.add(rim(THREE, geo, 0.5));
    // marcas: doce por anillo, como los meses o las semanas
    const ticks = new THREE.Group();
    const cnt = opts.ticks ?? 12;
    for (let k = 0; k < cnt; k++) {
      const a = (k / cnt) * Math.PI * 2;
      const d = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 12), new THREE.MeshBasicMaterial({ color: 0x7c818a }));
      d.position.set(Math.cos(a) * R, Math.sin(a) * R, 0);
      ticks.add(d);
    }
    m.add(ticks);
    // el punto de luz que recorre el anillo
    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 24, 24), new THREE.MeshBasicMaterial({ color: new THREE.Color(opts.colors?.[i] ?? 0xffffff).multiplyScalar(3) }));
    m.add(orb);
    group.add(m);
    rings.push({ m, R, orb, geo });
  }
  return {
    update(t, l) {
      const k = opts.time ? opts.time(l) : l;
      const tilt = opts.tilt ?? 0.82;
      group.rotation.set(-tilt + 0.05 * Math.sin(k * 0.2), 0.25 * Math.sin(k * 0.13), 0);
      const cz = lerp(opts.camFrom ?? 13, opts.camTo ?? 10.5, io(p(k, 0, opts.camDur ?? 14)));
      cam.position.set(opts.camX ?? 0, opts.camY ?? 0.8, cz);
      cam.lookAt(0, opts.lookY ?? 0, 0);
      // tomas: igual que en mirror.js, un ángulo por sección con dolly corto
      if (opts.shots) {
        let j = -1;
        opts.shots.forEach(([a], i) => { if (k >= a) j = i; });
        if (j >= 0) {
          const [a, S] = opts.shots[j];
          const b = opts.shots[j + 1] ? opts.shots[j + 1][0] : a + 6;
          const e = io(p(k, a, b));
          cam.position.set(S.x + (S.dx ?? 0) * e, S.y + (S.dy ?? 0) * e, S.z + (S.dz ?? -1.2) * e);
          cam.lookAt(S.lx ?? 0, S.ly ?? 0, 0);
        }
      }
      const act = opts.active ? opts.active(k) : -1;
      rings.forEach((r, i) => {
        const speed = (i % 2 ? -1 : 1) * (0.11 + i * 0.03) * (opts.speed ?? 1);
        r.m.rotation.z = k * speed + i * 0.9;
        const on = act < 0 ? 1 : Math.max(0.12, 1 - Math.min(1, Math.abs(act - i)));
        const a = k * (0.6 + i * 0.1) * (opts.orbSpeed ?? 1);
        r.orb.position.set(Math.cos(a) * r.R, Math.sin(a) * r.R, 0);
        r.orb.scale.setScalar(0.45 + 0.55 * on);
        r.orb.material.color.setScalar(0).add(new THREE.Color(opts.colors?.[i] ?? 0xffffff)).multiplyScalar(0.3 + 1.5 * on);
        r.m.visible = k >= (opts.appear?.[i] ?? -1);
      });
      comp.render();
    },
  };
}
