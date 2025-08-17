export default function Skills() {
  const skills = [
    'Moodle',
    'Talent LMS',
    'Docebo',
    'Articulate 360',
    'Storyline',
    'Rise',
    'Camtasia',
    'Vyond',
    'H5P',
    'SCORM',
    'xAPI',
    'Captivate',
    'Figma',
    'Miro',
    'Notion',
    'Trello',
    'Asana',
    'Google Workspace',
    'Courselab',
  ];

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 id="skills-heading" className="text-2xl sm:text-3xl font-bold mb-8 text-foreground">
          My Skills
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div
              key={skill}
              className="bg-gray-100 dark:bg-gray-800 rounded px-3 py-2 text-sm font-medium text-center text-foreground/90 border border-border"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
