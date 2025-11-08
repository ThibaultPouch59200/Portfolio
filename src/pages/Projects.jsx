import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import projects from '../data/projects.js';
import { getProjects } from '../utils/dataManager.js';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectModal from '../components/ProjectModal.jsx';

export default function Projects() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [mergedProjects, setMergedProjects] = useState(projects);
  const slug = params.get('project');
  const project = slug ? mergedProjects.find(p => p.slug === slug || String(p.id) === slug) : null;

  useEffect(() => {
    setMergedProjects(getProjects(projects));
  }, []);

  function closeModal() {
    navigate('/projects', { replace: true });
  }

  function openModal(p) {
    const identifier = p.slug || p.id;
    navigate(`/projects?project=${encodeURIComponent(identifier)}`);
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-dark dark:text-cream">{t('projects.title')}</h2>
      {mergedProjects.length === 0 && (
        <p className="text-dark/60 dark:text-beige/70 text-sm">{t('projects.empty')}</p>
      )}
      <div className="grid gap-6 md:grid-cols-2">
        {mergedProjects.map((p) => (
          <ProjectCard key={p.id} project={p} onSelect={openModal} />
        ))}
      </div>
      {project && (
        <ProjectModal project={project} onClose={closeModal} />
      )}
    </section>
  );
}
