import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import projects from '../data/projects.js';
import { getProjects } from '../utils/dataManager.js';
import { getProjectsSettings } from '../utils/projectsSettingsManager.js';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectModal from '../components/ProjectModal.jsx';

export default function Projects() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [mergedProjects, setMergedProjects] = useState(projects);
  const [orderedProjects, setOrderedProjects] = useState(projects);
  const [gridColumns, setGridColumns] = useState(2);
  const slug = params.get('project');
  const project = slug ? mergedProjects.find(p => p.slug === slug || String(p.id) === slug) : null;

  useEffect(() => {
    const allProjects = getProjects(projects);
    setMergedProjects(allProjects);

    // Apply settings
    const settings = getProjectsSettings();
    setGridColumns(settings.gridColumns);

    // Order projects
    if (settings.order && settings.order.length > 0) {
      const ordered = [...allProjects].sort((a, b) => {
        const indexA = settings.order.indexOf(a.id);
        const indexB = settings.order.indexOf(b.id);

        // If not in order array, put at the end
        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB;
      });
      setOrderedProjects(ordered);
    } else {
      setOrderedProjects(allProjects);
    }
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
      {orderedProjects.length === 0 && (
        <p className="text-dark/60 dark:text-beige/70 text-sm">{t('projects.empty')}</p>
      )}
      <div className={`grid gap-6 ${gridColumns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
        {orderedProjects.map((p) => (
          <ProjectCard key={p.id} project={p} onSelect={openModal} />
        ))}
      </div>
      {project && (
        <ProjectModal project={project} onClose={closeModal} />
      )}
    </section>
  );
}
