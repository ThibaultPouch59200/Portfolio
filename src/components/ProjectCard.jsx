export default function ProjectCard({ project }) {
  return (
    <div className="group border rounded-lg p-4 flex flex-col gap-2 bg-light-surface/80 border-light-border dark:bg-darkTheme-surface/70 dark:border-darkTheme-border hover:border-accent shadow-sm dark:shadow-none transition-colors">
      <h3 className="text-lg font-semibold text-dark dark:text-cream group-hover:text-accent transition-colors">{project.title}</h3>
      <p className="text-sm text-dark/70 dark:text-beige/80 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 rounded bg-light-subtle text-dark/80 dark:bg-ink dark:text-beige border border-light-border dark:border-darkTheme-border">{t}</span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:opacity-80 text-sm font-medium"
        >
          Voir le projet →
        </a>
      )}
    </div>
  );
}
