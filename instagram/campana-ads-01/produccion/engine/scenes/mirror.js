/* Espejo: una columna de luz sobre un piso negro que refleja. Lo que está
   arriba es la persona; lo que se refleja abajo es la marca, que existe
   aunque la persona no esté. opts: split(t) 0..1 separa la columna de su
   reflejo; shapes: 'column' | 'ring'. */
import { studio, rim, p, io, out, lerp } from './_studio.js';
import { Reflector } from 'three/addons/objects/Reflector.js';

export async function create({ THREE, canvas, W, H, opts }) {
  const S = studio(THREE, canvas, W, H, { bloom: 0.55, bloomT: 0.82, backdrop: false, roomY: 0.62, envInt: 1.1, fov: 32, ...opts.studio });
  const { scene, cam, comp } = S;
  const floor = new Reflector(new THREE.PlaneGeometry(40, 40), { textureWidth: W, textureHeight: H, color: 0x8a8f98, clipBias: 0.003 });
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.6;
  scene.add(floor);
  // velo sobre el espejo para que el reflejo se funda con la tinta
  const veil = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    vertexShader: 'varying vec3 w;void main(){w=(modelMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*viewMatrix*vec4(w,1.);}',
    fragmentShader: 'varying vec3 w;void main(){float d=length(w.xz);gl_FragColor=vec4(vec3(.0033),smoothstep(1.2,6.0,d)*.97+.03);}',
  }));
  veil.rotation.x = -Math.PI / 2; veil.position.y = -1.598; scene.add(veil);
  // la columna: vidrio con un núcleo de luz
  const colH = opts.colH ?? 2.8;
  const colGeo = new THREE.CylinderGeometry(0.34, 0.34, colH, 96, 1);
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.05, transmission: 1, thickness: 0.7, ior: 1.5, dispersion: 4, clearcoat: 1, envMapIntensity: 1.3 });
  const column = new THREE.Mesh(colGeo, glass);
  column.position.y = -1.6 + colH / 2;
  column.add(rim(THREE, colGeo, 0.45));
  scene.add(column);
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, colH - 0.1, 24), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffffff).multiplyScalar(1.3) }));
  column.add(core);
  // anillo que flota (la marca): aparece sobre el reflejo
  const ringGeo = new THREE.TorusGeometry(0.9, 0.035, 32, 240);
  const ring = new THREE.Mesh(ringGeo, glass);
  ring.add(rim(THREE, ringGeo, 0.6, 0xffffff));
  const ringLight = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.008, 12, 240), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xff00ff).multiplyScalar(2) }));
  ring.add(ringLight);
  scene.add(ring);
  return {
    update(t, l) {
      const k = opts.time ? opts.time(l) : l;
      const cz = lerp(opts.camFrom ?? 9.5, opts.camTo ?? 8.2, io(p(k, 0, opts.camDur ?? 16)));
      cam.position.set((opts.camX ?? 0) + 0.9 * Math.sin(k * 0.05), opts.camY ?? 0.35, cz);
      cam.lookAt(opts.lookX ?? 0, opts.lookY ?? -0.9, 0);
      // tomas: opts.shots = [[desde, {x, y, z, lx, ly, dz}], ...] corta de ángulo en cada una
      // y hace un dolly corto (dz) mientras dura
      if (opts.shots) {
        let j = -1;
        opts.shots.forEach(([a], i) => { if (k >= a) j = i; });
        if (j >= 0) {
          const [a, S] = opts.shots[j];
          const b = opts.shots[j + 1] ? opts.shots[j + 1][0] : a + 6;
          const e = io(p(k, a, b));
          cam.position.set(S.x + (S.dx ?? 0) * e, S.y + (S.dy ?? 0) * e, S.z + (S.dz ?? -0.8) * e);
          cam.lookAt(S.lx ?? 0, S.ly ?? -0.3, 0);
        }
      }
      column.rotation.y = k * 0.2;
      const sp = opts.split ? opts.split(k) : 0; // 0: columna presente · 1: columna se va, queda la marca
      column.position.y = opts.exit === 'sink' ? lerp(-1.6 + colH / 2, -1.6 - colH / 2 - 0.05, io(sp)) : lerp(-1.6 + colH / 2, 6.5, io(sp));
      column.visible = sp < 0.999;
      core.material.color.setScalar(1.3 * (1 - sp * 0.6));
      const rk = opts.ring ? opts.ring(k) : 0;
      ring.visible = rk > 0.001;
      ring.scale.setScalar(lerp(0.6, 1, out(rk)));
      ring.position.set(opts.ringX ?? 0, lerp(-0.4, -0.25, rk), 0);
      ring.rotation.set(Math.PI / 2 - 0.35, 0, k * 0.3);
      ringLight.material.color.set(opts.ringColor ?? 0xff00ff).multiplyScalar(2 * rk);
      comp.render();
    },
  };
}
