/* FOCUS · atlas óptico en GLSL.
   Cada fenómeno es una función fx(uv, px) → rgba. uv va de 0 a 1 (y hacia
   arriba), px en píxeles. Uniforms comunes: uT (tiempo local), uAbs, uRes,
   uIn, uOut. La paleta está cerrada: solo tinta, papel, grises y el
   espectro de siete pasos de la marca (magenta → azul → verde). */
(function () {
  const HEAD = `#version 300 es
precision highp float;
in vec2 vUv; out vec4 outColor;
uniform float uT, uAbs, uIn, uOut; uniform vec2 uRes;
#define PI 3.14159265
const vec3 INK = vec3(0.039, 0.039, 0.043);
const vec3 PAPER = vec3(0.965, 0.965, 0.957);
const vec3 MAG = vec3(1., 0., 1.);
const vec3 BLU = vec3(0., 0.2, 1.);
const vec3 GRN = vec3(0., 1., 0.2);
float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float s=0., a=.5; for(int i=0;i<5;i++){ s+=a*noise(p); p*=2.03; a*=.5; } return s; }
/* Espectro de marca: x en 0..1 recorre las siete bandas del sitio. */
vec3 spec(float x){
  vec3 c[7] = vec3[7](vec3(1.,0.,1.), vec3(.753,.063,1.), vec3(.502,.125,1.), vec3(0.,.2,1.), vec3(0.,.502,.867), vec3(0.,.753,.533), vec3(0.,1.,.2));
  x = clamp(x, 0., 1.) * 6.; int i = int(floor(x)); float f = fract(x);
  if (i >= 6) return c[6];
  return mix(c[i], c[i+1], smoothstep(0., 1., f));
}
float sat(float x){ return clamp(x, 0., 1.); }
float ease(float x){ x = sat(x); return x<1. ? 1.-pow(2., -10.*x) : 1.; }
mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }
`;
  const G = (window.F.GLSL = {});
  G.wrap = (body) => HEAD + body + `
void main(){ vec4 c = fx(vUv, vUv*uRes); outColor = vec4(c.rgb, c.a); }`;

  /* Cáustica: la luz que atraviesa agua o vidrio y dibuja una red sobre la
     superficie. Separada en tres canales con un desfase mínimo (refracción).
     uAmt: intensidad · uSplit: separación RGB · uScale: escala · uTint: mezcla con espectro. */
  G.caustic = `
uniform float uAmt, uSplit, uScale, uTint, uSpeed; uniform vec2 uCenter; uniform float uRadius;
float caus(vec2 p, float t){
  vec2 i = p; float c = 1.; float inten = .005;
  for (int n = 0; n < 5; n++) {
    float tt = t * (1. - (3.5 / float(n+1)));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x+tt)/inten), p.y / (cos(i.y+tt)/inten)));
  }
  c /= 5.; c = 1.17 - pow(c, 1.4); return pow(abs(c), 8.);
}
vec4 fx(vec2 uv, vec2 px){
  vec2 q = mod((px - .5*uRes) / uRes.y * uScale * 6.2831853, 6.2831853) - 250.;
  float t = uAbs * uSpeed + 23.;
  float r = caus(q + vec2(uSplit, 0.), t), g = caus(q, t + .02), b = caus(q - vec2(uSplit, 0.), t + .04);
  vec3 col = vec3(r*.9 + g*.1, g, b) ;
  float lum = (r+g+b)/3.;
  vec3 tint = spec(fract(uv.x*.6 + uv.y*.35 + uAbs*.03));
  col = mix(vec3(lum), lum * tint * 1.3, uTint) + (col - vec3(lum)) * 1.2;
  float m = 1.;
  if (uRadius > 0.) { float d = distance(px, uCenter*uRes); m = smoothstep(uRadius, uRadius*.55, d); }
  return vec4(INK + col * uAmt * m, 1.);
}`;

  /* Difracción / interferencia: ondas de varias fuentes que se suman. Con
     uOrder → 1 las franjas se ordenan en una grilla (la estructura del
     software). uCells: celdas de la grilla. */
  G.interference = `
uniform float uOrder, uCells, uAmt, uFreq;
vec4 fx(vec2 uv, vec2 px){
  vec2 q = (px - .5*uRes) / uRes.y;
  float t = uAbs;
  float s = 0.;
  for (int i = 0; i < 5; i++) {
    float fi = float(i);
    vec2 src = .55*vec2(cos(fi*1.9 + t*.11), sin(fi*2.3 + t*.13));
    s += sin(length(q - src) * uFreq - t*2.2 + fi);
  }
  s /= 5.;
  // la grilla: las franjas se alinean con los ejes
  vec2 g = abs(fract(q * uCells + .5) - .5) / uCells;
  float grid = 1. - smoothstep(0., 1.5 / uRes.y, min(g.x, g.y));
  float fr = smoothstep(.55, .98, abs(s));
  float v = mix(fr, grid * .9 + fr * .08, uOrder);
  vec3 col = mix(vec3(v), spec(fract(s*.5 + .5 + q.y*.2)) * v * 1.2, .55 * (1. - uOrder));
  col += vec3(.02) * grid * uOrder;
  return vec4(INK + col * uAmt, 1.);
}`;

  /* Exposición larga: trayectorias de luz que se acumulan en el tiempo, como
     una foto con el obturador abierto. Cinco recorridos (uno por etapa de
     trabajo) que convergen en un punto. uHead: 0..1 cuánto del recorrido
     ya se expuso. uConv: convergencia final. */
  G.trails = `
uniform float uHead, uConv, uAmt, uHi;
vec2 path(float i, float s){
  float a = i*1.2566 + 0.4;
  vec2 start = vec2(cos(a) * .26, sin(a) * .40 + .02);
  vec2 ctrl = vec2(sin(i*3.1)*.22, cos(i*2.7)*.3);
  vec2 end = vec2(0.02, .06);
  vec2 bz = mix(mix(start, ctrl, s), mix(ctrl, end, s), s);
  bz += .012*vec2(sin(s*18.+i), cos(s*15.+i*2.)) * (1.-s);
  return mix(bz, end, uConv * s);
}
vec4 fx(vec2 uv, vec2 px){
  vec2 q = (px - .5*uRes) / uRes.y;
  vec3 acc = vec3(0.);
  for (int k = 0; k < 5; k++) {
    float fk = float(k);
    vec3 col = spec(fk / 4.);
    float dmin = 1e3; float along = 0.;
    vec2 prev = path(fk, 0.);
    for (int j = 1; j < 90; j++) {
      float s = float(j) / 89. * uHead;
      vec2 cur = path(fk, s);
      vec2 pa = q - prev, ba = cur - prev;
      float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0., 1.);
      float d = length(pa - ba * h);
      if (d < dmin) { dmin = d; along = s; }
      prev = cur;
    }
    float fade = .35 + .65 * smoothstep(0., uHead + .001, along);
    fade *= uHi < 0. ? 1. : .35 + 1.6 * exp(-pow(fk - uHi, 2.) * 3.);
    acc += col * (exp(-dmin*dmin*60000.) * 1.3 + exp(-dmin*dmin*4000.) * .25 + exp(-dmin*220.) * .08) * fade;
    // cabeza brillante
    float dh = length(q - path(fk, uHead));
    acc += mix(col, vec3(1.), .7) * exp(-dh*dh*20000.) * 1.6 * step(.001, uHead);
  }
  float core = length(q - vec2(.02, .06));
  acc += vec3(1.) * (exp(-core*core*6000.) * 1.6 + exp(-core*40.) * .25) * uConv;
  return vec4(INK + acc * uAmt, 1.);
}`;

  /* Umbral: una rendija vertical de luz que se abre, con rayos volumétricos
     y polvo en suspensión. uOpen: apertura 0..1 · uX: posición. */
  G.slit = `
uniform float uOpen, uX, uDust, uAmt, uWarm;
vec4 fx(vec2 uv, vec2 px){
  vec2 q = (px - .5*uRes) / uRes.y;
  float x0 = (uX - .5) * uRes.x / uRes.y;
  float w = mix(.0012, .085, pow(uOpen, 1.8));
  float dx = abs(q.x - x0);
  float door = smoothstep(w + .003, w - .002, dx) * smoothstep(.62, .58, abs(q.y));
  // rayos: luz que sale de la rendija y cae hacia la cámara
  float rays = exp(-max(dx - w, 0.) * mix(38., 9., uOpen)) * (0.55 + .45*fbm(vec2(q.x*9., q.y*1.2 + uAbs*.05)));
  rays *= smoothstep(.95, .1, abs(q.y));
  float floorGlow = exp(-pow(q.y + .62, 2.) * 180.) * exp(-dx*6.) * uOpen;
  // polvo en suspensión, solo dentro del haz
  float dust = 0.;
  for (int i = 0; i < 3; i++) {
    vec2 g = q * (60. + float(i)*37.) + vec2(uAbs*.4*(1.+float(i)), uAbs*.25);
    vec2 id = floor(g); vec2 f = fract(g) - .5;
    float h = hash(id + float(i)*7.);
    dust += step(.965, h) * smoothstep(.12, 0., length(f + (vec2(hash(id+3.), hash(id+9.)) - .5)*.5));
  }
  dust *= exp(-max(dx - w, 0.) * 14.) * uDust;
  vec3 lightCol = mix(vec3(1.), vec3(1., .97, .93), uWarm);
  float inner = door * (0.55 + .45 * smoothstep(w, 0., dx));
  vec3 col = lightCol * (inner * .95 + rays * .22 * (.2 + uOpen) + floorGlow * .5) + vec3(dust) * .7;
  // filo espectral en los bordes de la rendija (refracción en el marco)
  float edge = exp(-pow((dx - w) * 260., 2.)) * smoothstep(.62, .5, abs(q.y));
  col += edge * mix(MAG, GRN, step(x0, q.x)) * .55 * uOpen;
  return vec4(INK + col * uAmt, 1.);
}`;

  /* Densidad: anillos concéntricos en zoom infinito. Cuanto más te acercás,
     más hay. uZoom avanza en octavas. uHi: índice del anillo que se ilumina. */
  G.density = `
uniform float uZoom, uAmt, uAccent; uniform vec2 uC;
vec4 fx(vec2 uv, vec2 px){
  vec2 c = uC.x + uC.y > 0. ? uC : vec2(.5, .52);
  vec2 q = (px - c*uRes) / uRes.y;
  float r = length(q);
  float lr = log(r + 1e-4) / log(2.) + uZoom;
  float ring = fract(lr * 3.);
  float line = exp(-pow((ring - .5) * 60., 2.));
  float band = floor(lr * 3.);
  float dots = step(.5, fract(atan(q.y, q.x) / (2.*PI) * (24. + mod(band, 4.)*12.) + band*.13));
  float fine = exp(-pow((fract(lr*12.) - .5) * 40., 2.)) * .18;
  float fade = smoothstep(.0, .06, r) * smoothstep(1.3, .35, r);
  vec3 col = vec3(line * mix(1., dots, .45) + fine) * fade * .8;
  float hi = exp(-pow((lr - floor(uZoom*1.) - .45) * 7., 2.));
  col += spec(fract(band * .19)) * line * .9 * uAccent * fade;
  return vec4(INK + col * uAmt, 1.);
}`;

  /* Bokeh: luces fuera de foco (la ciudad, el ruido del feed). uFocus 0..1
     las cierra en puntos nítidos. uSat: cuánto color conservan. */
  G.bokeh = `
uniform float uFocus, uAmt, uSat, uDrift;
vec4 fx(vec2 uv, vec2 px){
  vec2 q = (px - .5*uRes) / uRes.y;
  vec3 acc = vec3(0.);
  for (int i = 0; i < 46; i++) {
    float fi = float(i);
    vec2 c = vec2(hash(vec2(fi, 1.3)) - .5, hash(vec2(fi, 7.1)) - .5) * vec2(1.1, 1.9);
    c.y += sin(uAbs*.2 + fi) * .02 * uDrift; c.x += cos(uAbs*.17 + fi*1.3) * .015 * uDrift;
    float size = mix(.03, .11, hash(vec2(fi, 3.3)));
    float rad = mix(size, .004, uFocus);
    float d = length(q - c);
    float disk = smoothstep(rad, rad - max(.004, rad*.12), d);
    float rim = exp(-pow((d - rad*.92) / (rad*.08 + .001), 2.)) * .35 * (1. - uFocus);
    vec3 col = mix(vec3(1.), spec(hash(vec2(fi, 9.9))), uSat);
    float bright = mix(.12, .45, hash(vec2(fi, 5.5))) * mix(1., 3.5, uFocus);
    acc += col * (disk + rim) * bright;
  }
  return vec4(INK + acc * uAmt, 1.);
}`;

  /* Halo: un punto de luz con aberración cromática. Sirve de luz de sala
     detrás de una tipografía o de un objeto (nunca como fondo plano). */
  G.halo = `
uniform vec2 uC; uniform float uR, uAmt, uHue, uSplit;
vec4 fx(vec2 uv, vec2 px){
  vec2 q = (px - uC*uRes) / uRes.y;
  float d = length(q);
  vec3 col = vec3(0.);
  col.r = exp(-pow((length(q + vec2(uSplit,0.)))/uR, 2.));
  col.g = exp(-pow(d/uR, 2.));
  col.b = exp(-pow((length(q - vec2(uSplit,0.)))/uR, 2.));
  vec3 tint = uHue < 0. ? vec3(1.) : spec(uHue);
  return vec4(col * tint * uAmt, 1.);
}`;

  /* Superficie refractiva: una imagen (captura de interfaz, foto) vista a
     través de un vidrio ondulado. uWave: amplitud · uAb: aberración. */
  G.glass = `
uniform sampler2D uImg; uniform vec2 uImgSize; uniform float uWave, uAb, uAmt, uDim, uZoom; uniform vec2 uLens; uniform float uLensR;
vec2 cover(vec2 uv){ float ra = uRes.x/uRes.y, ri = uImgSize.x/uImgSize.y; vec2 s = ra > ri ? vec2(1., ri/ra) : vec2(ra/ri, 1.); return (uv - .5) * s / uZoom + .5; }
vec4 fx(vec2 uv, vec2 px){
  vec2 q = (px - .5*uRes) / uRes.y;
  vec2 n = vec2(fbm(q*3. + uAbs*.15), fbm(q*3. + 9. - uAbs*.12)) - .5;
  float lens = 0.;
  if (uLensR > 0.) { float d = distance(px, uLens*uRes)/uRes.y; lens = smoothstep(uLensR, 0., d); n += (q - (uLens*uRes - .5*uRes)/uRes.y) * -.8 * lens; }
  vec2 w = n * uWave;
  vec2 u0 = cover(uv + w);
  float ab = uAb * (0.3 + length(n));
  float r = texture(uImg, cover(uv + w + vec2(ab, 0.))).r;
  float g = texture(uImg, u0).g;
  float b = texture(uImg, cover(uv + w - vec2(ab, 0.))).b;
  vec3 col = vec3(r, g, b);
  float gray = dot(col, vec3(.299,.587,.114));
  col = mix(col, vec3(gray) * .9, uDim * (1. - lens));
  col *= mix(1. - uDim*.7, 1., lens);
  return vec4(col * uAmt, 1.);
}`;

  /* Grilla de luz: la estructura mínima (12 columnas, base 8) que aparece
     como líneas de 1 px iluminadas. uDraw: 0..1 cuánto está dibujado. */
  G.grid = `
uniform float uDraw, uAmt, uCols;
vec4 fx(vec2 uv, vec2 px){
  float edge = 80.;
  float cw = (uRes.x - edge*2.) / uCols;
  float x = px.x - edge;
  float cx = abs(fract(x / cw + .5) - .5) * cw;
  float lineX = (1. - smoothstep(0., 1.2, cx)) * step(0., x) * step(x, uRes.x - edge*2.);
  float rowH = cw;
  float cy = abs(fract((uRes.y - px.y) / rowH + .5) - .5) * rowH;
  float lineY = (1. - smoothstep(0., 1.2, cy)) * .5;
  float draw = step(1. - uDraw, 1. - uv.y);
  float drawX = step(uv.x, uDraw * 1.2);
  vec3 col = vec3(.23, .24, .26) * (lineX * draw + lineY * drawX * .6);
  return vec4(INK + col * uAmt, 1.);
}`;
})();
