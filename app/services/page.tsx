import type { Metadata } from 'next';
import { getServices } from '@/lib/sanity.queries';
import ServicesClient from './page.client';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Francis Uyota offers directing, cinematography, and creative direction services based in Nigeria, available for worldwide engagements across narrative film, music video, and commercial fashion.',
  openGraph: {
    title: 'Services | Francis Uyota',
    description:
      'Directing and cinematography for narrative film, music videos, fashion campaigns, and documentary worldwide.',
  },
};

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesClient services={services} />;
}
