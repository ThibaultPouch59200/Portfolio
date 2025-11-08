import { useState } from 'react';

export default function EventForm({ event, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: event.id || `event-${Date.now()}`,
    date: event.date || new Date().toISOString().split('T')[0],
    type: event.type || 'education',
    title: event.title || { fr: '', en: '' },
    description: event.description || { fr: '', en: '' },
    details: event.details || { fr: [], en: [] },
    projectSlug: event.projectSlug || ''
  });

  const [detailFr, setDetailFr] = useState('');
  const [detailEn, setDetailEn] = useState('');

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (field, lang, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value }
    }));
  };

  const handleArrayChange = (field, lang, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: [...(prev[field][lang] || []), value]
      }
    }));
  };

  const removeFromArray = (field, lang, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: prev[field][lang].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-6 border border-light-border dark:border-darkTheme-border rounded-lg bg-light-surface dark:bg-darkTheme-surface">
      <h3 className="text-xl font-semibold mb-4 text-dark dark:text-cream">
        {event.isNew ? 'Add New Event' : 'Edit Event'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">ID</label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => handleChange('id', e.target.value)}
            className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Type</label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
            >
              <option value="education">Education</option>
              <option value="work">Work</option>
              <option value="internship">Internship</option>
              <option value="project">Project</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Project Slug (optional, for project type events)</label>
          <input
            type="text"
            value={formData.projectSlug}
            onChange={(e) => handleChange('projectSlug', e.target.value)}
            className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
            placeholder="e.g., jeb-incubator"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Title (FR)</label>
            <input
              type="text"
              value={typeof formData.title === 'object' ? formData.title.fr : ''}
              onChange={(e) => handleNestedChange('title', 'fr', e.target.value)}
              className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Title (EN)</label>
            <input
              type="text"
              value={typeof formData.title === 'object' ? formData.title.en : ''}
              onChange={(e) => handleNestedChange('title', 'en', e.target.value)}
              className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Description (FR)</label>
          <textarea
            value={typeof formData.description === 'object' ? formData.description.fr : ''}
            onChange={(e) => handleNestedChange('description', 'fr', e.target.value)}
            className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Description (EN)</label>
          <textarea
            value={typeof formData.description === 'object' ? formData.description.en : ''}
            onChange={(e) => handleNestedChange('description', 'en', e.target.value)}
            className="w-full px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Details (FR) - Add bullet points</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={detailFr}
              onChange={(e) => setDetailFr(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (detailFr.trim()) {
                    handleArrayChange('details', 'fr', detailFr.trim());
                    setDetailFr('');
                  }
                }
              }}
              className="flex-1 px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
              placeholder="Add detail"
            />
            <button
              type="button"
              onClick={() => {
                if (detailFr.trim()) {
                  handleArrayChange('details', 'fr', detailFr.trim());
                  setDetailFr('');
                }
              }}
              className="px-4 py-2 bg-accent text-white rounded hover:opacity-90"
            >
              Add
            </button>
          </div>
          <div className="space-y-1">
            {(formData.details?.fr || []).map((d, i) => (
              <div key={i} className="flex items-center gap-2 px-2 py-1 bg-accent/10 rounded text-sm">
                <span className="flex-1">{d}</span>
                <button
                  type="button"
                  onClick={() => removeFromArray('details', 'fr', i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-dark/70 dark:text-beige/80">Details (EN) - Add bullet points</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={detailEn}
              onChange={(e) => setDetailEn(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (detailEn.trim()) {
                    handleArrayChange('details', 'en', detailEn.trim());
                    setDetailEn('');
                  }
                }
              }}
              className="flex-1 px-3 py-2 border border-light-border dark:border-darkTheme-border rounded bg-light-bg dark:bg-darkTheme-bg text-dark dark:text-cream"
              placeholder="Add detail"
            />
            <button
              type="button"
              onClick={() => {
                if (detailEn.trim()) {
                  handleArrayChange('details', 'en', detailEn.trim());
                  setDetailEn('');
                }
              }}
              className="px-4 py-2 bg-accent text-white rounded hover:opacity-90"
            >
              Add
            </button>
          </div>
          <div className="space-y-1">
            {(formData.details?.en || []).map((d, i) => (
              <div key={i} className="flex items-center gap-2 px-2 py-1 bg-accent/10 rounded text-sm">
                <span className="flex-1">{d}</span>
                <button
                  type="button"
                  onClick={() => removeFromArray('details', 'en', i)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
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

