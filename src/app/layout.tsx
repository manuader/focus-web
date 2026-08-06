import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Archivo_Black, Source_Serif_4 } from 'next/font/google';
import './globals.css';

import { LanguageProvider } from '@/context/LanguageContext';
import { PointerProvider } from '@/context/PointerContext';
import { SiteChrome } from '@/components/chrome/SiteChrome';
import {
  buildJsonLd,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from '@/lib/seo';

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

const TITLE = 'FOCUS creatives · Agencia de diseño y contenido en Buenos Aires';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · FOCUS creatives',
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  category: 'design',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'es_AR',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'FOCUS creatives · El punto donde todo cambia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
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

/**
 * Every load starts on the hero.
 *
 * Runs while the HTML is still parsing, which is the only moment early
 * enough to matter: browsers restore the previous scroll position on reload,
 * and they jump to `#hash` anchors as soon as the target element parses.
 * Turning restoration off and dropping the hash before either can happen
 * beats both without a visible jump. React would hydrate far too late.
 *
 * The opening sequence assumes it is playing over the top of the page, so
 * landing mid-document would leave the logo flying to a header above a
 * section nobody chose.
 */
const START_AT_TOP = `try{
if('scrollRestoration' in history){history.scrollRestoration='manual'}
if(location.hash){history.replaceState(null,'',location.pathname+location.search)}
addEventListener('load',function(){scrollTo({top:0,left:0,behavior:'instant'})})
}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${rotis.variable} ${archivo.variable} ${sourceSerif.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: START_AT_TOP }} />

        {/* Server-rendered, so crawlers and generative engines get the graph
            without executing anything. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: buildJsonLd() }}
        />
        <LanguageProvider>
          <PointerProvider>
            <SiteChrome>{children}</SiteChrome>
          </PointerProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
