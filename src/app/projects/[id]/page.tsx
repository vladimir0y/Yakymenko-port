import { ProjectsResponse } from '@/types';
import { getStaticProjectsData } from '@/lib/projects';
import { redirect } from 'next/navigation';

interface Params {
  params: { id: string };
}

export async function generateStaticParams() {
  const data: ProjectsResponse = await getStaticProjectsData();
  return data.folders.map((p) => ({ id: p.id }));
}

export default function LegacyProjectsRoute({ params }: Params) {
  // Redirect old /projects/[id] to new /work/[id]
  redirect(`/work/${params.id}`);
}

