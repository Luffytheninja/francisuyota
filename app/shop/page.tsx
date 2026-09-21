import type { Metadata } from 'next';
import ComingSoonPage from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Limited edition prints, LUT packs, and exclusive merch from Francis Uyota. Coming soon.',
};

export default function ShopPage() {
  return (
    <ComingSoonPage
      title="The Shop"
      subtitle="Shop"
      description="Limited edition fine-art prints, cinematography LUT packs, zines, and exclusive merch. Dropping soon."
      accentColor="#8ECDE2"
      backHref="/"
    />
  );
}
