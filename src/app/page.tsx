import { Hero, ProjectsList, Services, SkillsExpertise, Achievements, Testimonial, Contact, Footer, Navigation } from '@/components';
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

        {/* Services section */}
        <Services />

        {/* Skills & Expertise section */}
        <SkillsExpertise />

        {/* Achievements section */}
        <Achievements />

        {/* Projects section */}
        <section id="projects" className="min-h-screen py-20 bg-muted/20">
          <div className="container mx-auto px-6">
            <ProjectsList />
          </div>
        </section>

        {/* Testimonial section */}
        <Testimonial />

        {/* Contact section */}
        <Contact />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
