import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Archivo_Black, Source_Serif_4 } from 'next/font/google';
import './globals.css';

import { LanguageProvider } from '@/context/LanguageContext';
import { PointerProvider } from '@/context/PointerContext';
import { SiteChrome } from '@/components/chrome/SiteChrome';

/**
 * Rotis Semi Sans — the real brand body face. The original site only ships
 * these five cuts, so we mirror them exactly (no synthetic 400-upright; the
 * stack falls back to Helvetica Neue for that weight, as it did originally).
 */
const rotis = localFont({
  src: [
    { path: './fonts/RotisSemiSansStd-Light.otf', weight: '300', style: 'normal' },
    { path: './fonts/RotisSemiSansStd-LightIt.otf', weight: '300', style: 'italic' },
    { path: './fonts/RotisSemiSansStd-Italic.otf', weight: '400', style: 'italic' },
    { path: './fonts/RotisSemiSansStd-Bold.otf', weight: '700', style: 'normal' },
    { path: './fonts/RotisSemiSansStd-ExtraBold.otf', weight: '800', style: 'normal' },
  ],
  variable: '--font-rotis',
  display: 'swap',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
});

/** Archivo Black — wordmark / display-only face, never for running text. */
const archivo = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

/**
 * Source Serif 4 — the serif companion used, in italic, for every section
 * label. It stands in for Rotis Semi Serif, which the brand specifies but
 * never shipped as a font file (see Design System/readme.md). Swap the
 * `--font-display` token in globals.css the day those OTFs arrive.
 */
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const metadata: Metadata = {
  title: 'FOCUS · El punto donde todo cambia',
  description:
    'FOCUS es una agencia de diseño integral y creación de contenido en Buenos Aires. No construimos marcas desde cero: revelamos el ángulo que ya estaba ahí y lo volvemos imposible de ignorar.',
  metadataBase: new URL('https://focus.studio'),
  openGraph: {
    title: 'FOCUS · El punto donde todo cambia',
    description:
      'Agencia de diseño integral y creación de contenido. Revelamos el ángulo que ya estaba ahí.',
    locale: 'es_AR',
    type: 'website',
  },
  icons: {
    icon: '/assets/focus-logo-light.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
  // Extend under the notch / home indicator so we can honor safe-area insets.
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${rotis.variable} ${archivo.variable} ${sourceSerif.variable}`}
    >
      <body>
        <LanguageProvider>
          <PointerProvider>
            <SiteChrome>{children}</SiteChrome>
          </PointerProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
