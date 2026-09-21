import type { Metadata } from 'next';
import ContactPageClient from './page.client';

export const metadata: Metadata = {
  title: 'Contact & Commissions',
  description:
    'Get in touch with Francis Uyota for film projects, commercials, music videos, creative direction, and photography inquiries. Based in Ibadan, Nigeria, available worldwide.',
  openGraph: {
    title: 'Contact | Francis Uyota',
    description:
      'Book Francis Uyota for cinematography, directing, and creative direction. Studio in Ibadan, available for global productions.',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
