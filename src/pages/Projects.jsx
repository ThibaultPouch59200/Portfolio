import { useTranslation } from 'react-i18next';
import projects from '../data/projects.js';
import ProjectCard from '../components/ProjectCard.jsx';

export default function Projects() {
  const { t } = useTranslation();
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
    </section>
  );
}
