import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <section className="space-y-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-white">
        {t('hero.title')} <span className="text-primary-400">Thibault Pouch</span>
      </h1>
      <p className="text-gray-300 max-w-xl">
        {t('about.text')}
      </p>
    </section>
  );
}
