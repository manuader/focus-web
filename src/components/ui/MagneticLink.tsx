'use client';

import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Hover accent — sets the `--btn-accent` custom property. */
  accent?: string;
  strength?: number;
  children: ReactNode;
}

/** Anchor with the magnetic hover pull, forwarding all standard anchor props. */
export function MagneticLink({
  accent,
  strength,
  style,
  children,
  ...rest
}: MagneticLinkProps) {
  const ref = useMagnetic<HTMLAnchorElement>(strength);
  const merged = {
    ...(accent ? { '--btn-accent': accent } : null),
    ...style,
  } as CSSProperties;

  return (
    <a ref={ref} style={merged} {...rest}>
      {children}
    </a>
  );
}
