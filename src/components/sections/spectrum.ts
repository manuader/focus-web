/**
 * The spectrum, one stop per service. It runs through the brand's three
 * additive primaries (magenta, blue, green) rather than a literal rainbow:
 * the manual allows those three and nothing else, and red/orange/yellow
 * appear nowhere else on the site. Presentational, so it lives here rather
 * than in content.ts. Shared by the desktop bench and the mobile scene.
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

/** Below this the horizontal bench has no room and the mobile scene takes over. */
export const NARROW_AT = 760;
