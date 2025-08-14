import { Hero, ProjectsList } from '@/components';
import { ThemeToggle } from '@/components/theme';
import ResponsiveDebugger from '@/components/ResponsiveDebugger';

export default function Home() {
  return (
    <div className="relative">
      {/* Responsive Debugger - only shows in development */}
      <ResponsiveDebugger position="bottom-left" detailed />

      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <main id="main-content">
        <Hero />

        {/* Projects section */}
        <section id="projects" className="min-h-screen py-20 bg-muted/20">
          <div className="container mx-auto px-6">
            <ProjectsList />
          </div>
        </section>

        <section
          id="contact"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Contact Section</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </section>
      </main>
    </div>
  );
}
