import type { Metadata } from 'next';
import { getServices } from '@/lib/sanity.queries';
import ServicesClient from './page.client';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Francis Uyota offers cinematography, creative direction, and photography services from his studio in Ibadan, Nigeria. Available for worldwide engagements.',
  openGraph: {
    title: 'Services | Francis Uyota',
    description:
      'Cinematography studio in Ibadan. Freelance shoots worldwide. Film, music video, documentary, commercial, and creative direction.',
  },
};

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesClient services={services} />;
}
