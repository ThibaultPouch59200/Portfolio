import { useTranslation } from 'react-i18next';
import { getTimeline, formatTimelineDate } from '../data/timeline';

// Color coding by type (Tailwind classes)
const typeStyles = {
  education: 'bg-blue-500 dark:bg-blue-400',
  internship: 'bg-emerald-500 dark:bg-emerald-400',
  work: 'bg-indigo-500 dark:bg-indigo-400',
  project: 'bg-orange-500 dark:bg-orange-400',
  default: 'bg-gray-400 dark:bg-gray-500'
};

export default function Timeline({ limit }) {
  const { i18n } = useTranslation();
  const locale = i18n.language.startsWith('en') ? 'en' : 'fr';
  const events = getTimeline(locale).slice(0, limit || undefined);

  return (
    <div className="relative">
      {/* Vertical line (position fixe) */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-dark/40 to-dark/10 dark:from-cream/40 dark:to-cream/10" aria-hidden="true" />
      <ul className="space-y-16">
        {events.map((evt, idx) => {
          const color = typeStyles[evt.type] || typeStyles.default;
          return (
            <li key={evt.id} className="group relative">
              <div className={`absolute left-4 -translate-x-1/2 transform top-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white dark:border-dark shadow ring-2 ring-dark/10 dark:ring-cream/20 flex items-center justify-center z-10 ${color}`}>
                <span className="sr-only">{evt.type}</span>
              </div>
              {/* Carte décalée à droite pour laisser respirer le point */}
              <div className="ml-14 sm:ml-16 bg-white dark:bg-dark/50 backdrop-blur-sm border border-dark/10 dark:border-cream/10 rounded-md p-5 shadow-sm transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-dark dark:text-cream text-lg">
                    {evt.title}
                  </h3>
                  <time className="text-sm font-medium text-dark/60 dark:text-cream/60 whitespace-nowrap">
                    {formatTimelineDate(evt.date, locale)}
                  </time>
                </div>
                <p className="text-sm text-dark/70 dark:text-beige/80 leading-relaxed">
                  {evt.description}
                </p>
                {evt.id === 'project-zappy-2025-06' && (
                  <div className="mt-3">
                    <a
                      href="/projects?project=zappy"
                      className="inline-block text-xs font-semibold tracking-wide px-3 py-1.5 rounded bg-accent text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/60 transition"
                    >Voir le projet</a>
                  </div>
                )}
                {evt.details && (
                  <ul className="mt-3 list-disc list-inside text-sm space-y-1 text-dark/70 dark:text-beige/80">
                    {evt.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
