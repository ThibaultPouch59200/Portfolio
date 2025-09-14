import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

export default function ProjectModal({ project, onClose }) {
  const { i18n, t } = useTranslation();
  const locale = i18n.language.startsWith('en') ? 'en' : 'fr';

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const long = project.descriptionLong?.[locale];
  const goals = project.goals?.[locale];
  const { languages, technologies, values } = project;

  function onBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 backdrop-blur-sm bg-dark/40 dark:bg-black/60 animate-fadein"
      onMouseDown={onBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-w-2xl w-full bg-white dark:bg-dark rounded-lg border border-dark/10 dark:border-cream/10 shadow-lg overflow-hidden" onMouseDown={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-dark/60 dark:text-cream/60 hover:text-accent transition-colors text-sm font-semibold"
          aria-label={t('close') || 'Close'}
        >×</button>
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-dark dark:text-cream">{project.title}</h2>
          <p className="text-sm text-dark/70 dark:text-beige/80 leading-relaxed">
            {long || project.description}
          </p>
          {goals && goals.length > 0 && (
            <ul className="list-disc list-inside text-sm space-y-1 text-dark/70 dark:text-beige/80">
              {goals.map((g, i) => <li key={i}>{g}</li>)}
            </ul>
          )}
          {(languages || technologies || values || project.tech) && (
            <div className="space-y-3 pt-2">
              {languages && languages.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wide text-dark/60 dark:text-beige/60 font-semibold mb-1">{t('projects.categories.languages', 'Langages')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {languages.map(l => <span key={l} className="px-2 py-1 rounded bg-light-subtle dark:bg-ink border border-light-border dark:border-darkTheme-border text-xs text-dark/80 dark:text-beige/80">{l}</span>)}
                  </div>
                </div>
              )}
              {technologies && technologies.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wide text-dark/60 dark:text-beige/60 font-semibold mb-1">{t('projects.categories.technologies', 'Technologies')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map(te => <span key={te} className="px-2 py-1 rounded bg-light-subtle dark:bg-ink border border-light-border dark:border-darkTheme-border text-xs text-dark/80 dark:text-beige/80">{te}</span>)}
                  </div>
                </div>
              )}
              {values && values.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wide text-dark/60 dark:text-beige/60 font-semibold mb-1">{t('projects.categories.values', 'Compétences')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {values.map(v => <span key={v} className="px-2 py-1 rounded bg-light-subtle dark:bg-ink border border-light-border dark:border-darkTheme-border text-xs text-dark/80 dark:text-beige/80">{v}</span>)}
                  </div>
                </div>
              )}
              {!languages && !technologies && !values && project.tech && (
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(tk => (
                    <span key={tk} className="px-2 py-1 rounded bg-light-subtle dark:bg-ink border border-light-border dark:border-darkTheme-border text-xs text-dark/80 dark:text-beige/80">{tk}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
