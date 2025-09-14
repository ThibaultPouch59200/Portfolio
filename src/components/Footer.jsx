import { useTranslation } from 'react-i18next';

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();
  return (
  <footer className="border-t border-dark mt-8 py-6 text-center text-sm text-beige/70">
      <p>&copy; {year} · {t('hero.role')} · React Portfolio</p>
    </footer>
  );
}
