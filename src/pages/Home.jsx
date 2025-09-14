import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <section className="space-y-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-dark dark:text-cream">
        {t('hero.title')} <span className="text-accent">Thibault Pouch</span>
      </h1>
      <p className="max-w-xl text-dark/70 dark:text-beige/90">
        {t('about.text')}
      </p>
    </section>
  );
}
