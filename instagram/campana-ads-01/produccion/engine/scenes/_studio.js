/* Estudio común para las escenas 3D: renderer, entorno de luz con tiras
   (softboxes) para que el vidrio tenga filos, fondo tinta con una luz de
   sala muy baja y bloom con umbral alto (solo brilla lo que es luz). */
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export function studio(THREE, canvas, W, H, o = {}) {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true, alpha: !!o.alpha });
  r.setPixelRatio(1);
  r.setSize(W, H, false);
  r.toneMapping = THREE.ACESFilmicToneMapping;
  r.toneMappingExposure = o.exposure ?? 1;
  const scene = new THREE.Scene();
  if (!o.alpha) scene.background = new THREE.Color(0x0a0a0b);

  // Entorno: tiras de luz blanca y dos acentos de marca muy bajos.
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x000000);
  const strip = (w, h, x, y, z, c, i) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(i), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
  };
  strip(0.6, 9, -5, 2, 3, 0xffffff, 4.5);
  strip(0.35, 9, 5, 1, 2.5, 0xffffff, 3.2);
  strip(9, 0.4, 0, 6, -1, 0xffffff, 2.6);
  strip(3, 3, -2, -2, -7, 0xff00ff, o.envMag ?? 0.7);
  strip(3, 3, 6, -3, -4, 0x00ff33, o.envGrn ?? 0.45);
  strip(3, 3, 3, 4, -6, 0x0033ff, o.envBlu ?? 0.6);
  const pm = new THREE.PMREMGenerator(r);
  scene.environment = pm.fromScene(env, 0.02).texture;
  scene.environmentIntensity = o.envInt ?? 0.75;

  // Luz de sala detrás: un degradé casi negro, no un fondo de color.
  if (!o.alpha && o.backdrop !== false) {
    const back = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShaderMaterial({
      uniforms: { c: { value: new THREE.Vector2(o.roomX ?? 0.5, o.roomY ?? 0.55) }, k: { value: o.room ?? 1 } },
      vertexShader: 'varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: 'uniform vec2 c;uniform float k;varying vec2 v;void main(){float d=distance(v,c);vec3 col=mix(vec3(.026,.027,.03),vec3(.0045),smoothstep(0.,.22,d))*k;gl_FragColor=vec4(col,1.);}',
    }));
    back.position.z = -12;
    scene.add(back);
  }
  const cam = new THREE.PerspectiveCamera(o.fov ?? 30, W / H, 0.1, 200);
  const comp = new EffectComposer(r);
  comp.addPass(new RenderPass(scene, cam));
  const bloom = new UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), o.bloom ?? 0.7, o.bloomR ?? 0.5, o.bloomT ?? 0.72);
  comp.addPass(bloom);
  comp.addPass(new OutputPass());
  return { r, scene, cam, comp, bloom };
}

/** Haz de luz: plano aditivo con núcleo y halo. Devuelve {mesh, set(from,to,k)}. */
export function beam(THREE, scene, color, width) {
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
    uniforms: { c: { value: new THREE.Color(color) }, k: { value: 1 }, head: { value: 1 } },
    vertexShader: 'varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: 'uniform vec3 c;uniform float k;uniform float head;varying vec2 v;void main(){if(v.x>head)discard;float y=abs(v.y-.5)*2.;float core=exp(-y*y*70.);float halo=exp(-y*y*5.)*.22;float e=smoothstep(0.,.012,v.x)*smoothstep(head,head-.04,v.x);gl_FragColor=vec4(c*(core+halo)*k*e,1.);}',
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, width), mat);
  scene.add(mesh);
  const d = new THREE.Vector3();
  return {
    mesh, mat,
    set(from, to, k = 1, head = 1) {
      d.subVectors(to, from);
      const len = d.length();
      mesh.scale.set(len, 1, 1);
      mesh.position.copy(from).addScaledVector(d, 0.5);
      mesh.rotation.set(0, 0, Math.atan2(d.y, d.x));
      mat.uniforms.k.value = k;
      mat.uniforms.head.value = head;
      mesh.visible = k > 0.001 && head > 0.001;
    },
  };
}

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const p = (t, a, b) => (b <= a ? (t >= b ? 1 : 0) : clamp((t - a) / (b - a)));
export const io = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
export const out = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
export const lerp = (a, b, k) => a + (b - a) * k;
export const SPECTRUM = [0xff00ff, 0xc010ff, 0x8020ff, 0x0033ff, 0x0080dd, 0x00c088, 0x00ff33];

/** Filo de vidrio: cáscara aditiva con fresnel, para que el volumen se lea
    sobre la tinta sin iluminar el fondo. */
export function rim(THREE, geo, k = 0.5, color = 0xffffff) {
  return new THREE.Mesh(geo, new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { k: { value: k }, c: { value: new THREE.Color(color) } },
    vertexShader: 'varying vec3 n;varying vec3 vd;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);vd=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}',
    fragmentShader: 'uniform float k;uniform vec3 c;varying vec3 n;varying vec3 vd;void main(){float f=pow(1.-abs(dot(normalize(n),normalize(vd))),3.);gl_FragColor=vec4(c*f*k,1.);}',
  }));
}
