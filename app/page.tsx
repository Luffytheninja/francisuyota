import { getProjects } from '@/lib/sanity.queries';
import { Project } from '@/lib/projectsData';
import PageClient from './page.client';

export default async function Home() {
  const projects = await getProjects();
  return <PageClient projects={projects} />;
}
