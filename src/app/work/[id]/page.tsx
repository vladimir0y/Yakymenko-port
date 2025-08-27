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
          We couldn&apos;t find a project with id &quot;{params.id}&quot;.
        </p>
      </div>
    );
  }

  // Helper to prefix with base path for GitHub Pages
  const withBasePath = (p: string) => {
    // If absolute URL, return as-is
    if (/^https?:\/\//i.test(p)) return p;
    // Always point to GitHub Pages absolute base so it works on Vercel too
    const base = 'https://vladimir0y.github.io/Yakymenko-port';
    // Ensure no double slashes when concatenating
    return `${base}${p.startsWith('/') ? p : `/${p}`}`;
  };

  // Build list of candidate iframe URLs, prioritizing project.live
  const candidates = (() => {
    const result: string[] = [];
    
    // Prioritize project.projectData.live URL first
    if (project.projectData?.live) {
      const liveUrl = Array.isArray(project.projectData.live) ? project.projectData.live[0] : project.projectData.live;
      if (liveUrl) result.push(liveUrl);
    }
    
    // Add fallback URLs only if no live URL exists
    if (!project.projectData?.live) {
      const m = project.image?.match(/^\/?Projects\/([^/]+)\//);
      if (m?.[1]) {
        const folderRaw = m[1];
        const folderEnc = encodeURIComponent(folderRaw);
        const folderSlug = folderRaw
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        const files = ['story.html', 'html5/index.html', 'index.html'];
        const folders = [folderEnc, folderRaw, folderSlug];

        for (const f of folders) {
          for (const file of files) {
            result.push(withBasePath(`/Projects/${f}/${file}`));
          }
        }
      }
    }
    
    return Array.from(new Set(result));
  })();

  const primary = candidates[0];

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-6 md:py-10 space-y-4 md:space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
          {project.projectData?.title || project.title || project.name}
        </h1>
        {primary && (
          <a
            href={primary}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-3 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >Open in new tab</a>
        )}
      </div>

      {primary ? (
        <ProjectPlayer
          src={primary}
          title={project.projectData?.title || project.name}
          openUrl={primary}
          fallbackSrcs={candidates.slice(1)}
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

