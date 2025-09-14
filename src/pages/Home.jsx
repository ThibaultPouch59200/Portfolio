import { useTranslation } from 'react-i18next';
import Timeline from '../components/Timeline';
import projects from '../data/projects';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith('en') ? 'en' : 'fr';

  // Featured projects: pick a subset (adjust later after feedback)
  const featuredSlugs = ['jeb-incubator', 'zappy', 'raytracer'];
  const featuredProjects = projects.filter(p => featuredSlugs.includes(p.slug)).slice(0, 3);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-dark dark:text-cream">
            {t('hero.title')} <span className="text-accent">Thibault Pouch</span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-dark/60 dark:text-cream/60">
            <span className="px-2 py-1 rounded bg-dark/5 dark:bg-cream/10">ThePandorBox</span>
            <span className="px-2 py-1 rounded bg-dark/5 dark:bg-cream/10">heathcliff</span>
            <span className="text-xs uppercase tracking-wide font-medium">{t('hero.currentStatus')}</span>
          </div>
          <p className="max-w-2xl text-dark/75 dark:text-beige/90 leading-relaxed">
            {t('hero.subtitleShort')}
          </p>
          <p className="max-w-2xl text-sm text-dark/60 dark:text-beige/70 leading-relaxed">
            {t('hero.subtitleTech')}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/projects" className="inline-flex items-center gap-2 px-5 py-2 rounded bg-accent text-white font-medium shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/60 transition">
              {t('home.cta.viewProjects')}
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-5 py-2 rounded border border-dark/15 dark:border-cream/20 text-dark dark:text-cream hover:bg-dark/5 dark:hover:bg-cream/10 font-medium transition">
              {t('home.cta.contact')}
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Timeline Section (limited) */}
      <section className="space-y-8">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-dark dark:text-cream">
            {t('home.sections.timeline')}
          </h2>
          <Link to="/about" className="text-sm font-medium text-accent hover:underline">
            {locale === 'fr' ? 'Tout voir' : 'View all'}
          </Link>
        </header>
        <Timeline limit={4} />
      </section>

      {/* Curriculum / Method Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-dark dark:text-cream">{t('curriculum.title')}</h2>
        <div className="space-y-5 max-w-3xl">
          {(t('curriculum.paragraphs', { returnObjects: true }) || []).map((p, i) => (
            <p key={i} className="text-sm sm:text-base leading-relaxed text-dark/70 dark:text-beige/85">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-8">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-dark dark:text-cream">
            {t('home.sections.featuredProjects')}
          </h2>
          <Link to="/projects" className="text-sm font-medium text-accent hover:underline">
            {locale === 'fr' ? 'Tous les projets' : 'All projects'}
          </Link>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map(p => (
            <article key={p.id} className="group relative border border-dark/10 dark:border-cream/10 rounded-md p-5 bg-white dark:bg-dark/50 backdrop-blur-sm shadow-sm hover:shadow transition">
              <h3 className="font-semibold text-lg text-dark dark:text-cream mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-dark/70 dark:text-beige/80 mb-4 leading-relaxed">
                {p.description[locale] || p.description.fr}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tech.slice(0, 4).map(tk => (
                  <span key={tk} className="text-xs px-2 py-1 rounded bg-dark/5 dark:bg-cream/10 text-dark/70 dark:text-beige/80">{tk}</span>
                ))}
              </div>
              <Link to={`/projects?project=${p.slug}`} className="text-sm font-medium text-accent hover:underline">
                {locale === 'fr' ? 'Détails' : 'Details'} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="space-y-10">
        <h2 className="text-2xl font-semibold text-dark dark:text-cream">
          {t('home.sections.stats')}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label={t('home.stats.projects')} value="7+" />
          <StatCard label={t('home.stats.years')} value="2+" />
          <StatCard label={t('home.stats.languages')} value="6" />
          <StatCard label={t('home.stats.automation')} value="10+" />
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="relative overflow-hidden rounded-md border border-dark/10 dark:border-cream/10 bg-white dark:bg-dark/50 p-5 shadow-sm">
      <div className="text-3xl font-bold text-accent mb-1 tracking-tight">{value}</div>
      <div className="text-sm font-medium text-dark dark:text-cream">{label}</div>
    </div>
  );
}
