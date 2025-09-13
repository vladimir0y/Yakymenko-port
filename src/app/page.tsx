import { Hero, ProjectsList, Services, SkillsExpertise, Achievements, Testimonial, Footer, Navigation } from '@/components';
import { ThemeToggle } from '@/components/theme';
import ResponsiveDebugger from '@/components/ResponsiveDebugger';

export default function Home() {
  return (
    <div className="relative">
      {/* Responsive Debugger - only shows in development */}
      <ResponsiveDebugger position="bottom-left" detailed />

      {/* Navigation */}
      <Navigation />

      {/* Theme Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <main id="main-content">
        <Hero />

        {/* Projects section - moved to second */}
        <section 
          id="projects" 
          className="py-20 md:py-28 bg-white dark:bg-gray-950"
        >
          <div className="container mx-auto px-6">
            <ProjectsList />
          </div>
        </section>

        {/* Services + Contact combined section */}
        <Services />

        {/* Skills & Expertise section */}
        <SkillsExpertise />

        {/* Achievements section */}
        <Achievements />

        {/* Testimonial section */}
        <Testimonial />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
