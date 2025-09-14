import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const linkBase = 'px-3 py-2 rounded transition text-sm font-medium';
const active = 'text-accent';
const inactive = 'text-beige hover:text-cream';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const changeLang = (lng) => i18n.changeLanguage(lng);

  return (
  <header className="bg-dark/80 backdrop-blur border-b border-dark sticky top-0 z-20">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
  <div className="font-bold text-accent">Portfolio</div>
        <div className="flex items-center gap-2">
          <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>{t('nav.home')}</NavLink>
          <NavLink to="/about" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>{t('nav.about')}</NavLink>
          <NavLink to="/projects" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>{t('nav.projects')}</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}>{t('nav.contact')}</NavLink>
        </div>
        <div className="flex gap-1 text-xs">
          <button onClick={() => changeLang('fr')} className="px-2 py-1 rounded bg-ink hover:bg-dark text-beige">FR</button>
          <button onClick={() => changeLang('en')} className="px-2 py-1 rounded bg-ink hover:bg-dark text-beige">EN</button>
        </div>
      </nav>
    </header>
  );
}
