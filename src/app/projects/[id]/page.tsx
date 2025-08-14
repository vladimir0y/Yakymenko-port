import { ProjectsResponse } from '@/types';
import { getStaticProjectsData } from '@/lib/projects';
import Image from 'next/image';

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

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {project.projectData?.title || project.title || project.name}
        </h1>
        {project.projectData?.description && (
          <p className="text-zinc-600 dark:text-zinc-300">
            {project.projectData.description}
          </p>
        )}
      </div>

      {project.image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800">
          <Image
            src={project.image}
            alt={project.projectData?.title || project.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Details</h2>
          <ul className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
            {project.projectData?.date && (
              <li>
                <span className="font-medium">Date:</span>{' '}
                {new Date(project.projectData.date).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })}
              </li>
            )}
            {project.technologies?.length ? (
              <li>
                <span className="font-medium">Technologies:</span>{' '}
                {project.technologies.join(', ')}
              </li>
            ) : null}
            {project.projectData?.tags?.length ? (
              <li>
                <span className="font-medium">Tags:</span>{' '}
                {project.projectData.tags.join(', ')}
              </li>
            ) : null}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Links</h2>
          <div className="flex gap-3 flex-wrap text-sm">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              >
                View Project
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700"
              >
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

