/* Lente: un disco de vidrio biconvexo que cruza el cuadro. Detrás, una
   textura (texto, captura, foto) se deforma y se enfoca a través de él.
   opts: tex (url), path(t) → {x,y} en unidades de escena, zoom. */
import { studio, rim, p, io, out, lerp } from './_studio.js';

export async function create({ THREE, canvas, W, H, opts, wait }) {
  const S = studio(THREE, canvas, W, H, { bloom: 0.5, bloomT: 0.8, backdrop: false, envInt: 1.2, fov: 30, ...opts.studio });
  const { scene, cam, comp } = S;
  cam.position.set(0, 0, 10);
  cam.lookAt(0, 0, 0);
  const vh = 2 * Math.tan((30 * Math.PI) / 360) * 10; // alto visible a z=0
  const vw = vh * (W / H);
  // plano de fondo con la textura (lo que la lente enfoca)
  const tex = await new Promise((res) => new THREE.TextureLoader().load(opts.tex, res));
  tex.colorSpace = THREE.SRGBColorSpace;
  const back = new THREE.Mesh(new THREE.PlaneGeometry(vw * 1.02, vh * 1.02), new THREE.MeshBasicMaterial({ map: tex, color: new THREE.Color(opts.dim ?? 0.55, opts.dim ?? 0.55, opts.dim ?? 0.55) }));
  back.position.z = -1.5;
  scene.add(back);
  // lente biconvexa: esfera achatada
  const g = new THREE.SphereGeometry(1, 96, 64);
  g.scale(1, 1, 0.22);
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.02, transmission: 1, thickness: 1.8, ior: 1.7, dispersion: 6, clearcoat: 1, envMapIntensity: 1.1 });
  const lens = new THREE.Mesh(g, glass);
  lens.add(rim(THREE, g, 0.4));
  const r = opts.r ?? 1.3;
  lens.scale.setScalar(r);
  scene.add(lens);
  return {
    update(t, l) {
      const k = opts.time ? opts.time(l) : l;
      const pos = opts.path ? opts.path(k) : { x: 0, y: 0 };
      lens.position.set(pos.x * vw * 0.5, pos.y * vh * 0.5, 1.2);
      lens.rotation.set(0.25 * Math.sin(k * 0.4), 0.3 * Math.cos(k * 0.3), 0);
      lens.scale.setScalar(r * (pos.s ?? 1));
      comp.render();
    },
  };
}
