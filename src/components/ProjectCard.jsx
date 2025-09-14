export default function ProjectCard({ project, onSelect }) {
  const hasExtended = project.descriptionLong || project.goals;
  const showInfo = hasExtended && onSelect;
  const primaryTags = project.languages || project.tech || [];

  function handleSeeMore(e) {
    e.preventDefault();
    if (onSelect) onSelect(project);
  }

  return (
    <div className="group border rounded-lg p-4 flex flex-col gap-2 bg-light-surface/80 border-light-border dark:bg-darkTheme-surface/70 dark:border-darkTheme-border hover:border-accent shadow-sm dark:shadow-none transition-colors">
      <h3 className="text-lg font-semibold text-dark dark:text-cream group-hover:text-accent transition-colors">{project.title}</h3>
      <p className="text-sm text-dark/70 dark:text-beige/80 flex-1">{project.description}</p>
      {primaryTags.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs">
          {primaryTags.map((t) => (
            <span key={t} className="px-2 py-1 rounded bg-light-subtle text-dark/80 dark:bg-ink dark:text-beige border border-light-border dark:border-darkTheme-border">{t}</span>
          ))}
        </div>
      )}
      {(showInfo || project.link) && (
        <div className="flex flex-wrap gap-3 pt-1">
          {showInfo && (
            <button
              onClick={handleSeeMore}
              type="button"
              className="text-xs font-medium px-3 py-1.5 rounded border border-accent/60 text-accent hover:bg-accent/10 transition-colors"
            >
              Plus d'infos
            </button>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium px-3 py-1.5 rounded bg-accent text-white hover:opacity-90 transition-colors"
            >
              Voir le projet
            </a>
          )}
        </div>
      )}
    </div>
  );
}
