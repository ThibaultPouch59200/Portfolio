export default function ProjectCard({ project }) {
  return (
    <div className="border border-dark rounded-lg p-4 flex flex-col gap-2 bg-dark/40 hover:border-accent transition">
      <h3 className="text-lg font-semibold text-cream">{project.title}</h3>
      <p className="text-sm text-beige/80 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 bg-ink rounded text-beige">{t}</span>
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
