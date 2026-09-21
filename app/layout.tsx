import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://uyota.film';
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Francis Uyota — Filmmaker, Creative Director & Photographer',
    template: '%s | Francis Uyota',
  },
  description:
    'Francis Onabanjo (Francis Uyota) is a Nigerian filmmaker, creative director, and photographer based in Ibadan. His practice — rooted in surrealism — explores consciousness, loss, and visual identity. Selected for the Whitechapel Gallery, London.',
  keywords: [
    'Francis Uyota', 'Francis Onabanjo', 'Nigerian Filmmaker', 'Cinematographer',
    'Creative Director', 'Photographer', 'Ibadan', 'Lagos', 'Under the Hood',
    'Whitechapel Gallery', 'Almanak Media', 'African Cinema', 'Surrealism',
    'Director of Photography', 'DoP', 'Film', 'Music Video',
  ],
  authors: [{ name: 'Francis Onabanjo', url: SITE_URL }],
  creator: 'Francis Onabanjo',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: 'Francis Uyota',
    title: 'Francis Uyota — Filmmaker, Creative Director & Photographer',
    description:
      'Nigerian filmmaker and creative director. Cinematography studio in Ibadan. Freelance worldwide.',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Francis Uyota — Filmmaker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@F_Uyota',
    creator: '@F_Uyota',
    title: 'Francis Uyota — Filmmaker, Creative Director & Photographer',
    description: 'Nigerian filmmaker and creative director. Cinematography studio in Ibadan.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Cinzel:wght@400;600;700;900&family=Encode+Sans:wght@100;200;300;400;500;600;700;800;900&family=Slackey&display=swap"
          rel="stylesheet"
        />

        {/* Plausible Analytics */}
        {PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/plausible.js"
          />
        )}
      </head>

      <body className="bg-[#FFFAB3] text-[#0B0D0C] antialiased selection:bg-[#50BF8E] selection:text-[#0B0D0C] overflow-x-hidden">
        {children}

        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
