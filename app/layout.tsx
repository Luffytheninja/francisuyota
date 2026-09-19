import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UYOTA — Cinematographer & Director of Photography',
  description: 'Director of Photography and Colorist crafting visceral, textured visuals for narrative cinema, commercials, and evocative documentaries. ARRI, RED, Sony Venice.',
  keywords: ['Cinematographer', 'Director of Photography', 'DoP', 'Uyota', 'Lagos Cinematography', 'Film', 'ARRI Alexa 35', 'Colorist'],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'UYOTA — Cinematography Portfolio',
    description: 'Selected cinematography, feature films, and commercial showreel.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Encode+Sans:wght@100;200;300;400;500;600;700;800;900&family=Slackey&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0E100F] text-[#141716] antialiased selection:bg-[#141716] selection:text-[#D4F88D] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
