import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import projects from '../data/projects.js';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectModal from '../components/ProjectModal.jsx';

export default function Projects() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const slug = params.get('project');
  const project = slug ? projects.find(p => p.slug === slug || String(p.id) === slug) : null;

  function closeModal() {
    navigate('/projects', { replace: true });
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-dark dark:text-cream">{t('projects.title')}</h2>
      {projects.length === 0 && (
        <p className="text-dark/60 dark:text-beige/70 text-sm">{t('projects.empty')}</p>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      {project && (
        <ProjectModal project={project} onClose={closeModal} />
      )}
    </section>
  );
}
