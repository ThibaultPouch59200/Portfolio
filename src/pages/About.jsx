import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">{t('about.title')}</h2>
      <p className="text-gray-300 leading-relaxed max-w-2xl">{t('about.text')}</p>
    </section>
  );
}
