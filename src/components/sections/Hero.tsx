import { HERO_DIRECTION } from '@/lib/config';
import { HeroUmbral } from './HeroUmbral';
import { HeroPasaje } from './HeroPasaje';
import { HeroDensidad } from './HeroDensidad';

/** Renders the hero for the configured direction (default A — Umbral). */
export function Hero() {
  switch (HERO_DIRECTION) {
    case 'B':
      return <HeroPasaje />;
    case 'C':
      return <HeroDensidad />;
    default:
      return <HeroUmbral />;
  }
}
