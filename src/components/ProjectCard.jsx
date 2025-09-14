export default function ProjectCard({ project }) {
  return (
    <div className="border border-gray-800 rounded-lg p-4 flex flex-col gap-2 bg-gray-900/40 hover:border-primary-500 transition">
      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
      <p className="text-sm text-gray-400 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-2 text-xs">
        {project.tech.map((t) => (
          <span key={t} className="px-2 py-1 bg-gray-800 rounded text-gray-300">{t}</span>
        ))}
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="text-primary-400 hover:text-primary-300 text-sm font-medium"
        >
          Voir le projet →
        </a>
      )}
    </div>
  );
}
