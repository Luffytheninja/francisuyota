import type { Metadata } from 'next';
import ComingSoonPage from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Behind-the-lens stories, process diaries, and visual essays from Francis Uyota. Coming soon.',
};

export default function BlogPage() {
  return (
    <ComingSoonPage
      title="The Journal"
      subtitle="Blog"
      description="Behind-the-lens stories, process diaries, set notes, and visual essays. Francis shares the thinking behind the work."
      accentColor="#DFB143"
      backHref="/"
    />
  );
}
