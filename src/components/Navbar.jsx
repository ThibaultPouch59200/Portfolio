import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext.jsx';

const linkBase = 'px-3 py-2 rounded transition text-sm font-medium';
const active = 'text-accent';
const inactive = 'text-dark/70 hover:text-dark dark:text-beige dark:hover:text-cream';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const changeLang = (lng) => i18n.changeLanguage(lng);
  const { theme, toggleTheme } = useTheme();

  return (
  <header className="bg-light-surface/80 dark:bg-darkTheme-surface/80 backdrop-blur border-b border-light-border dark:border-darkTheme-border sticky top-0 z-20 transition-colors">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
  <div className="font-bold text-accent">Portfolio</div>
        <div className="flex items-center gap-2">
          <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>{t('nav.home')}</NavLink>
          <NavLink to="/about" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>{t('nav.about')}</NavLink>
          <NavLink to="/projects" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>{t('nav.projects')}</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>{t('nav.contact')}</NavLink>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-1 text-xs">
            <button onClick={() => changeLang('fr')} className="px-2 py-1 rounded bg-light-subtle hover:bg-light-border dark:bg-ink dark:hover:bg-dark text-dark dark:text-beige transition-colors">FR</button>
            <button onClick={() => changeLang('en')} className="px-2 py-1 rounded bg-light-subtle hover:bg-light-border dark:bg-ink dark:hover:bg-dark text-dark dark:text-beige transition-colors">EN</button>
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 inline-flex items-center justify-center rounded bg-light-subtle hover:bg-light-border text-dark dark:bg-ink dark:hover:bg-dark dark:text-beige transition-colors"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l1.41-1.41m8.5-8.5 1.41-1.41" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
