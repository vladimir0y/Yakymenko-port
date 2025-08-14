import { ProjectsResponse } from '@/types';
import { getStaticProjectsData } from '@/lib/projects';
import Image from 'next/image';
import ProjectPlayer from '@/components/ProjectPlayer';

interface Params {
  params: { id: string };
}

export async function generateStaticParams() {
  // Build-time: use static projects list
  const data: ProjectsResponse = await getStaticProjectsData();
  return data.folders.map((p) => ({ id: p.id }));
}

export default async function ProjectPage({ params }: Params) {
  const data: ProjectsResponse = await getStaticProjectsData();
  const project = data.folders.find((p) => p.id === params.id);

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">
          We couldn't find a project with id "{params.id}".
        </p>
      </div>
    );
  }

  // Compute iframe URL: prefer project.live; otherwise derive from image folder
  const iframeUrl = (() => {
    if (project.live) return project.live;
    const m = project.image?.match(/^\/?Projects\/([^/]+)\//);
    if (m?.[1]) {
      const folder = m[1];
      const filename = /rock/i.test(folder) ? 'content/index.html' : 'story.html';
      return `/Projects/${folder}/${filename}`;
    }
    return undefined;
  })();

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-6 md:py-10 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          {project.projectData?.title || project.title || project.name}
        </h1>
        {iframeUrl && (
          <a
            href={iframeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >Open in new tab</a>
        )}
      </div>

      {iframeUrl ? (
        <ProjectPlayer
          src={iframeUrl}
          title={project.projectData?.title || project.name}
          openUrl={iframeUrl}
        />
      ) : (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800">
          {project.image && (
            <Image
              src={project.image}
              alt={project.projectData?.title || project.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          )}
        </div>
      )}
    </div>
  );
}

