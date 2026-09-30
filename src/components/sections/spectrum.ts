/**
 * The spectrum, one stop per service. It runs through the brand's three
 * additive primaries (magenta, blue, green) rather than a literal rainbow:
 * the manual allows those three and nothing else, and red/orange/yellow
 * appear nowhere else on the site. Presentational, so it lives here rather
 * than in content.ts. Used by the prism scene.
 */
export const SPECTRUM = [
  '#FF00FF',
  '#C010FF',
  '#8020FF',
  '#0033FF',
  '#0080DD',
  '#00C088',
  '#00FF33',
] as const;
