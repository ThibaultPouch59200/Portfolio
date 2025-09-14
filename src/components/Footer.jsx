import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();
  return (
    <footer className="mt-20 border-t border-dark/10 dark:border-cream/10 bg-white/60 dark:bg-dark/40 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 grid gap-10 md:grid-cols-4">
        {/* Logo + brief */}
        <div className="space-y-4 col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-md shadow object-cover" />
            <div>
              <p className="font-semibold text-dark dark:text-cream tracking-tight">Thibault Pouch</p>
              <p className="text-xs text-dark/60 dark:text-cream/60">{t('roles.softwareDevOps')}</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-sm text-dark/70 dark:text-beige/80">
            {t('hero.subtitleShort')}
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wide uppercase text-dark/70 dark:text-cream/70">{t('footer.nav')}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="text-dark/70 dark:text-beige/80 hover:text-accent" to="/">{t('nav.home')}</Link></li>
            <li><Link className="text-dark/70 dark:text-beige/80 hover:text-accent" to="/about">{t('nav.about')}</Link></li>
            <li><Link className="text-dark/70 dark:text-beige/80 hover:text-accent" to="/projects">{t('nav.projects')}</Link></li>
            <li><Link className="text-dark/70 dark:text-beige/80 hover:text-accent" to="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-dark/10 dark:border-cream/10 text-center py-4 text-xs text-dark/60 dark:text-cream/60">
        &copy; {year} · {t('footer.allRights')}
      </div>
    </footer>
  );
}
