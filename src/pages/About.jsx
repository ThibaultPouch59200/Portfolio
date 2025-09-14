import { useTranslation } from 'react-i18next';
import Timeline from '../components/Timeline';

export default function About() {
  const { t } = useTranslation();
  return (
    <section className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-dark dark:text-cream">{t('about.title')}</h2>
        <p className="leading-relaxed max-w-2xl text-dark/70 dark:text-beige/90">{t('about.text')}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-dark dark:text-cream">{t('about.timelineTitle', 'Parcours')}</h3>
        <Timeline />
      </div>
    </section>
  );
}
