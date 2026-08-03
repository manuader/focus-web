/**
 * Site-level configuration.
 *
 * In the original Claude Design file the hero was a design-time enum prop
 * (`heroDirection`, default 'A'). We preserve all three directions as separate
 * components and ship the default here — flip this constant to 'B' (Pasaje) or
 * 'C' (Densidad) to change which hero renders in production.
 */
export type HeroDirection = 'A' | 'B' | 'C';

export const HERO_DIRECTION: HeroDirection = 'A';
