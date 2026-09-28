// Loads the FOCUS design system tokens into this piece. In a consuming
// project, point base at the bound DS folder relative to this file.
(() => {
  const base = '../..';
  for (const p of ["styles.css"]) {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = base + '/' + p;
    document.head.appendChild(l);
  }
})();
