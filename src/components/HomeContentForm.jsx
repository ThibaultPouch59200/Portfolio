import { useState, useEffect } from 'react';
import { getHomeContent, saveHomeContent, defaultHomeContent } from '../utils/homeContentManager';

export default function HomeContentForm({ onSave, onCancel, availableProjects = [] }) {
  const [activeBlock, setActiveBlock] = useState('hero');
  const [content, setContent] = useState(defaultHomeContent);
  const [currentLang, setCurrentLang] = useState('fr');

  useEffect(() => {
    setContent(getHomeContent());
  }, []);

  const handleChange = (path, value) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const handleNestedChange = (path, lang, value) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[lang] = value;
      return newContent;
    });
  };

  const handleArrayChange = (path, value) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      if (!Array.isArray(current[keys[keys.length - 1]])) {
        current[keys[keys.length - 1]] = [];
      }
      current[keys[keys.length - 1]].push(value);
      return newContent;
    });
  };

  const handleArrayRemove = (path, index) => {
    setContent(prev => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const keys = path.split('.');
      let current = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_, i) => i !== index);
      return newContent;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveHomeContent(content);
    onSave(content);
  };

  const blocks = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'featured', label: 'Projets en avant' },
    { id: 'stats', label: 'Chiffres clés' },
    { id: 'curriculum', label: 'Cursus & Méthode' }
  ];

  return (
    <div className="p-6 border border-light-border dark:border-darkTheme-border rounded-lg bg-light-surface dark:bg-darkTheme-surface">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-dark dark:text-cream">Gestion du contenu de la page d'accueil</h3>
        {activeBlock === 'hero' || activeBlock === 'curriculum' ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCurrentLang('fr')}
              className={`px-4 py-2 rounded transition-colors ${
                currentLang === 'fr'
                  ? 'bg-accent text-white'
                  : 'bg-light-subtle dark:bg-ink text-dark dark:text-cream hover:opacity-80'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setCurrentLang('en')}
              className={`px-4 py-2 rounded transition-colors ${
                currentLang === 'en'
                  ? 'bg-accent text-white'
                  : 'bg-light-subtle dark:bg-ink text-dark dark:text-cream hover:opacity-80'
              }`}
            >
              EN
            </button>
          </div>
        ) : null}
      </div>

      {/* Block Navigation */}
      <div className="mb-6 border-b border-light-border dark:border-darkTheme-border">
        <div className="flex gap-4 flex-wrap">
          {blocks.map(block => (
            <button
              key={block.id}
              type="button"
              onClick={() => setActiveBlock(block.id)}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeBlock === block.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-dark/60 dark:text-beige/60 hover:text-dark dark:hover:text-beige'
              }`}
            >
              {block.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Hero Block */}
        {activeBlock === 'hero' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Nom</label>
              <input
                type="text"
                value={content.hero.name}
                onChange={(e) => handleChange('hero.name', e.target.value)}
                className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Pseudos (un par ligne)</label>
              <div className="space-y-2">
                {content.hero.aliases.map((alias, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={alias}
                      onChange={(e) => {
                        const newAliases = [...content.hero.aliases];
                        newAliases[i] = e.target.value;
                        handleChange('hero.aliases', newAliases);
                      }}
                      className="flex-1 px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
                    />
                    <button
                      type="button"
                      onClick={() => handleArrayRemove('hero.aliases', i)}
                      className="px-3 py-2 bg-red-600 text-white rounded hover:opacity-90"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleArrayChange('hero.aliases', '')}
                  className="px-4 py-2 bg-accent text-white rounded hover:opacity-90 text-sm"
                >
                  + Ajouter un pseudo
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Statut actuel ({currentLang.toUpperCase()})</label>
              <input
                type="text"
                value={content.hero.currentStatus[currentLang]}
                onChange={(e) => handleNestedChange('hero.currentStatus', currentLang, e.target.value)}
                className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Sous-titre court ({currentLang.toUpperCase()})</label>
              <textarea
                value={content.hero.subtitleShort[currentLang]}
                onChange={(e) => handleNestedChange('hero.subtitleShort', currentLang, e.target.value)}
                className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
                rows="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Sous-titre tech ({currentLang.toUpperCase()})</label>
              <textarea
                value={content.hero.subtitleTech[currentLang]}
                onChange={(e) => handleNestedChange('hero.subtitleTech', currentLang, e.target.value)}
                className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
                rows="2"
              />
            </div>
          </div>
        )}

        {/* Featured Projects Block */}
        {activeBlock === 'featured' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Projets en avant</label>
              <p className="text-xs text-dark/60 dark:text-beige/60 mb-4">
                Sélectionnez les projets à afficher en avant sur la page d'accueil. L'ordre d'affichage suit l'ordre de sélection.
              </p>

              {availableProjects.length === 0 ? (
                <p className="text-sm text-dark/60 dark:text-beige/60 italic">Aucun projet disponible</p>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto border border-light-border dark:border-darkTheme-border rounded-lg p-4">
                  {availableProjects.map((project) => {
                    const isSelected = content.featuredProjects.slugs.includes(project.slug);
                    const projectTitle = typeof project.title === 'object'
                      ? (project.title[currentLang] || project.title.fr || project.title.en)
                      : project.title;
                    const projectDescription = typeof project.description === 'object'
                      ? (project.description[currentLang] || project.description.fr || project.description.en)
                      : project.description;

                    return (
                      <div
                        key={project.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-accent bg-accent/10 dark:bg-accent/20'
                            : 'border-light-border dark:border-darkTheme-border bg-light-surface dark:bg-darkTheme-surface hover:border-accent/50'
                        }`}
                        onClick={() => {
                          const newSlugs = isSelected
                            ? content.featuredProjects.slugs.filter(s => s !== project.slug)
                            : [...content.featuredProjects.slugs, project.slug];
                          handleChange('featuredProjects.slugs', newSlugs);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}} // Handled by parent div onClick
                            className="mt-1 w-4 h-4 text-accent border-light-border dark:border-darkTheme-border rounded focus:ring-accent"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-dark dark:text-cream mb-1">{projectTitle}</h4>
                            <p className="text-sm text-dark/70 dark:text-beige/80 line-clamp-2">{projectDescription}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-dark/50 dark:text-beige/50">Slug:</span>
                              <code className="text-xs px-2 py-0.5 bg-dark/5 dark:bg-cream/10 rounded text-dark/70 dark:text-beige/70">
                                {project.slug}
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {content.featuredProjects.slugs.length > 0 && (
                <div className="mt-4 p-3 bg-accent/10 dark:bg-accent/20 rounded-lg">
                  <p className="text-sm font-medium text-dark dark:text-cream mb-2">
                    Projets sélectionnés ({content.featuredProjects.slugs.length}) :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {content.featuredProjects.slugs.map((slug, index) => {
                      const project = availableProjects.find(p => p.slug === slug);
                      const projectTitle = project
                        ? (typeof project.title === 'object'
                          ? (project.title[currentLang] || project.title.fr || project.title.en)
                          : project.title)
                        : slug;

                      return (
                        <div
                          key={slug}
                          className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-darkTheme-surface border border-accent rounded text-sm"
                        >
                          <span className="text-dark dark:text-cream">{projectTitle}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const newSlugs = content.featuredProjects.slugs.filter((_, i) => i !== index);
                              handleChange('featuredProjects.slugs', newSlugs);
                            }}
                            className="text-red-500 hover:text-red-700 ml-1"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-dark/60 dark:text-beige/60 mt-2">
                    Vous pouvez réorganiser l'ordre en supprimant et re-sélectionnant les projets dans l'ordre souhaité.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats Block */}
        {activeBlock === 'stats' && (
          <div className="space-y-4">
            {Object.entries(content.stats).map(([key, stat]) => (
              <div key={key} className="p-4 border border-light-border dark:border-darkTheme-border rounded">
                <h4 className="font-medium mb-3 text-dark dark:text-cream capitalize">{key}</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Valeur</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleChange(`stats.${key}.value`, e.target.value)}
                      className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Label (FR)</label>
                    <input
                      type="text"
                      value={stat.label.fr}
                      onChange={(e) => handleChange(`stats.${key}.label.fr`, e.target.value)}
                      className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Label (EN)</label>
                    <input
                      type="text"
                      value={stat.label.en}
                      onChange={(e) => handleChange(`stats.${key}.label.en`, e.target.value)}
                      className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Curriculum Block */}
        {activeBlock === 'curriculum' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">
                Paragraphes ({currentLang.toUpperCase()})
              </label>
              <p className="text-xs text-dark/60 dark:text-beige/60 mb-2">
                Un paragraphe par ligne. Utilisez Entrée pour créer un nouveau paragraphe.
              </p>
              <div className="space-y-2">
                {content.curriculum.paragraphs[currentLang].map((para, i) => (
                  <div key={i} className="flex gap-2">
                    <textarea
                      value={para}
                      onChange={(e) => {
                        const newParas = [...content.curriculum.paragraphs[currentLang]];
                        newParas[i] = e.target.value;
                        handleChange(`curriculum.paragraphs.${currentLang}`, newParas);
                      }}
                      className="flex-1 px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
                      rows="3"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newParas = content.curriculum.paragraphs[currentLang].filter((_, idx) => idx !== i);
                        handleChange(`curriculum.paragraphs.${currentLang}`, newParas);
                      }}
                      className="px-3 py-2 bg-red-600 text-white rounded hover:opacity-90"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newParas = [...content.curriculum.paragraphs[currentLang], ''];
                    handleChange(`curriculum.paragraphs.${currentLang}`, newParas);
                  }}
                  className="px-4 py-2 bg-accent text-white rounded hover:opacity-90 text-sm"
                >
                  + Ajouter un paragraphe
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-4 border-t border-light-border dark:border-darkTheme-border">
          <button
            type="submit"
            className="px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Sauvegarder
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

