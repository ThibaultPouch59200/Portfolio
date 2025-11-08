import { useState, useMemo } from 'react';
import AutocompleteInput from './AutocompleteInput.jsx';

export default function ProjectForm({ project, onSave, onCancel, allProjects = [] }) {
  const [currentLang, setCurrentLang] = useState('fr');
  const [activeSection, setActiveSection] = useState('description'); // 'description' or 'stack'
  const [formData, setFormData] = useState({
    id: project.id || Date.now(),
    slug: project.slug || '',
    title: project.title || { fr: '', en: '' },
    description: project.description || { fr: '', en: '' },
    descriptionLong: project.descriptionLong || { fr: '', en: '' },
    goals: project.goals || { fr: [], en: [] },
    tech: project.tech || [],
    languages: project.languages || [],
    technologies: project.technologies || [],
    values: project.values || [],
    link: project.link || ''
  });

  const [goalFr, setGoalFr] = useState('');
  const [goalEn, setGoalEn] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (field, lang, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value }
    }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), value]
    }));
  };

  const removeFromArray = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Extract all existing values from all projects
  const existingValues = useMemo(() => {
    const techSet = new Set();
    const languagesSet = new Set();
    const technologiesSet = new Set();
    const valuesSet = new Set();
    const goalsFrSet = new Set();
    const goalsEnSet = new Set();

    allProjects.forEach(p => {
      (p.tech || []).forEach(t => techSet.add(t));
      (p.languages || []).forEach(l => languagesSet.add(l));
      (p.technologies || []).forEach(t => technologiesSet.add(t));
      (p.values || []).forEach(v => valuesSet.add(v));
      (p.goals?.fr || []).forEach(g => goalsFrSet.add(g));
      (p.goals?.en || []).forEach(g => goalsEnSet.add(g));
    });

    return {
      tech: Array.from(techSet).sort(),
      languages: Array.from(languagesSet).sort(),
      technologies: Array.from(technologiesSet).sort(),
      values: Array.from(valuesSet).sort(),
      goalsFr: Array.from(goalsFrSet).sort(),
      goalsEn: Array.from(goalsEnSet).sort()
    };
  }, [allProjects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 border border-light-border dark:border-darkTheme-border rounded-lg bg-light-surface dark:bg-darkTheme-surface">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-dark dark:text-cream">
          {project.isNew ? 'Add New Project' : 'Edit Project'}
        </h3>
        {activeSection === 'description' && (
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
        )}
      </div>

      {/* Section Tabs */}
      <div className="mb-6 border-b border-light-border dark:border-darkTheme-border">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setActiveSection('description')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeSection === 'description'
                ? 'border-accent text-accent'
                : 'border-transparent text-dark/60 dark:text-beige/60 hover:text-dark dark:hover:text-beige'
            }`}
          >
            Description
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('stack')}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeSection === 'stack'
                ? 'border-accent text-accent'
                : 'border-transparent text-dark/60 dark:text-beige/60 hover:text-dark dark:hover:text-beige'
            }`}
          >
            Stack & Tags
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description Section */}
        {activeSection === 'description' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">ID</label>
              <input
                type="number"
                value={formData.id}
                onChange={(e) => handleChange('id', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Title ({currentLang.toUpperCase()})</label>
              <input
                type="text"
                value={typeof formData.title === 'object' ? formData.title[currentLang] : ''}
                onChange={(e) => handleNestedChange('title', currentLang, e.target.value)}
                className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Description ({currentLang.toUpperCase()})</label>
              <textarea
                value={typeof formData.description === 'object' ? formData.description[currentLang] : ''}
                onChange={(e) => handleNestedChange('description', currentLang, e.target.value)}
                className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
                rows="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Long Description ({currentLang.toUpperCase()})</label>
              <textarea
                value={typeof formData.descriptionLong === 'object' ? formData.descriptionLong[currentLang] : ''}
                onChange={(e) => handleNestedChange('descriptionLong', currentLang, e.target.value)}
                className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
                rows="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Link</label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => handleChange('link', e.target.value)}
                className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
              />
            </div>
          </div>
        )}

        {/* Stack Section */}
        {activeSection === 'stack' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Goals (FR)</label>
              <AutocompleteInput
                value={goalFr}
                onChange={setGoalFr}
                onAdd={(value) => {
                  setFormData(prev => ({
                    ...prev,
                    goals: {
                      ...prev.goals,
                      fr: [...(prev.goals?.fr || []), value]
                    }
                  }));
                  setGoalFr('');
                }}
                suggestions={existingValues.goalsFr}
                placeholder="Type to search existing goals or add new..."
              />
              <div className="space-y-1 mt-2">
                {(formData.goals?.fr || []).map((g, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1 bg-accent/10 rounded text-sm">
                    <span className="flex-1">{g}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          goals: {
                            ...prev.goals,
                            fr: prev.goals.fr.filter((_, idx) => idx !== i)
                          }
                        }));
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Goals (EN)</label>
              <AutocompleteInput
                value={goalEn}
                onChange={setGoalEn}
                onAdd={(value) => {
                  setFormData(prev => ({
                    ...prev,
                    goals: {
                      ...prev.goals,
                      en: [...(prev.goals?.en || []), value]
                    }
                  }));
                  setGoalEn('');
                }}
                suggestions={existingValues.goalsEn}
                placeholder="Type to search existing goals or add new..."
              />
              <div className="space-y-1 mt-2">
                {(formData.goals?.en || []).map((g, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1 bg-accent/10 rounded text-sm">
                    <span className="flex-1">{g}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          goals: {
                            ...prev.goals,
                            en: prev.goals.en.filter((_, idx) => idx !== i)
                          }
                        }));
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Tech Stack</label>
          <AutocompleteInput
            value={newTech}
            onChange={setNewTech}
            onAdd={(value) => {
              handleArrayChange('tech', value);
              setNewTech('');
            }}
            suggestions={existingValues.tech}
            placeholder="Type to search existing tech or add new..."
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tech.map((t, i) => (
              <span key={i} className="px-2 py-1 bg-accent/20 text-accent rounded text-sm flex items-center gap-1">
                {t}
                <button
                  type="button"
                  onClick={() => removeFromArray('tech', i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Languages</label>
          <AutocompleteInput
            value={newLanguage}
            onChange={setNewLanguage}
            onAdd={(value) => {
              handleArrayChange('languages', value);
              setNewLanguage('');
            }}
            suggestions={existingValues.languages}
            placeholder="Type to search existing languages or add new..."
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.languages.map((l, i) => (
              <span key={i} className="px-2 py-1 bg-accent/20 text-accent rounded text-sm flex items-center gap-1">
                {l}
                <button
                  type="button"
                  onClick={() => removeFromArray('languages', i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Technologies</label>
          <AutocompleteInput
            value={newTechnology}
            onChange={setNewTechnology}
            onAdd={(value) => {
              handleArrayChange('technologies', value);
              setNewTechnology('');
            }}
            suggestions={existingValues.technologies}
            placeholder="Type to search existing technologies or add new..."
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.technologies.map((t, i) => (
              <span key={i} className="px-2 py-1 bg-accent/20 text-accent rounded text-sm flex items-center gap-1">
                {t}
                <button
                  type="button"
                  onClick={() => removeFromArray('technologies', i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Values</label>
          <AutocompleteInput
            value={newValue}
            onChange={setNewValue}
            onAdd={(value) => {
              handleArrayChange('values', value);
              setNewValue('');
            }}
            suggestions={existingValues.values}
            placeholder="Type to search existing values or add new..."
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.values.map((v, i) => (
              <span key={i} className="px-2 py-1 bg-accent/20 text-accent rounded text-sm flex items-center gap-1">
                {v}
                <button
                  type="button"
                  onClick={() => removeFromArray('values', i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
          </div>
        )}

        <div className="flex gap-4 pt-4 border-t border-light-border dark:border-darkTheme-border">
          <button
            type="submit"
            className="px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

