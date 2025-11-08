import { useState, useEffect } from 'react';
import { getProjectsSettings, saveProjectsSettings, defaultSettings } from '../utils/projectsSettingsManager';

export default function ProjectsSettingsForm({ availableProjects = [], onSave, onCancel }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    const currentSettings = getProjectsSettings();
    setSettings(currentSettings);

    // Initialize order if empty or if projects have changed
    if (currentSettings.order.length === 0 ||
        currentSettings.order.length !== availableProjects.length) {
      const defaultOrder = availableProjects.map(p => p.id);
      setSettings(prev => ({ ...prev, order: defaultOrder }));
    }
  }, [availableProjects]);

  const orderedProjects = [...availableProjects].sort((a, b) => {
    const indexA = settings.order.indexOf(a.id);
    const indexB = settings.order.indexOf(b.id);

    // If not in order array, put at the end
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newOrder = [...settings.order];
    const draggedId = orderedProjects[draggedIndex].id;
    const targetId = orderedProjects[index].id;

    // Remove dragged item
    newOrder.splice(newOrder.indexOf(draggedId), 1);
    // Insert at new position
    newOrder.splice(newOrder.indexOf(targetId), 0, draggedId);

    setSettings(prev => ({ ...prev, order: newOrder }));
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleGridColumnsChange = (columns) => {
    setSettings(prev => ({ ...prev, gridColumns: columns }));
  };

  const handleResetOrder = () => {
    const defaultOrder = availableProjects.map(p => p.id);
    setSettings(prev => ({ ...prev, order: defaultOrder }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProjectsSettings(settings);
    onSave(settings);
  };

  return (
    <div className="p-6 border border-light-border dark:border-darkTheme-border rounded-lg bg-light-surface dark:bg-darkTheme-surface">
      <h3 className="text-xl font-semibold mb-4 text-dark dark:text-cream">
        Paramètres de la page Projets
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid Columns Selection */}
        <div>
          <label className="block text-sm font-medium mb-3 text-dark/70 dark:text-beige/80">
            Format de la grille
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleGridColumnsChange(2)}
              className={`px-6 py-3 border-2 rounded-lg transition-colors ${
                settings.gridColumns === 2
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-light-border dark:border-darkTheme-border text-dark dark:text-cream hover:border-accent/50'
              }`}
            >
              <div className="text-lg font-semibold mb-1">2 colonnes</div>
              <div className="text-xs opacity-70">Format compact</div>
            </button>
            <button
              type="button"
              onClick={() => handleGridColumnsChange(3)}
              className={`px-6 py-3 border-2 rounded-lg transition-colors ${
                settings.gridColumns === 3
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-light-border dark:border-darkTheme-border text-dark dark:text-cream hover:border-accent/50'
              }`}
            >
              <div className="text-lg font-semibold mb-1">3 colonnes</div>
              <div className="text-xs opacity-70">Format large</div>
            </button>
          </div>
        </div>

        {/* Projects Order */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-dark/70 dark:text-beige/80">
              Ordre d'affichage des projets
            </label>
            <button
              type="button"
              onClick={handleResetOrder}
              className="text-xs text-accent hover:underline"
            >
              Réinitialiser l'ordre
            </button>
          </div>
          <p className="text-xs text-dark/60 dark:text-beige/60 mb-4">
            Glissez-déposez les projets pour réorganiser leur ordre d'affichage.
          </p>

          <div className="space-y-2 max-h-96 overflow-y-auto border border-light-border dark:border-darkTheme-border rounded-lg p-4">
            {orderedProjects.map((project, index) => {
              const projectTitle = typeof project.title === 'object'
                ? (project.title.fr || project.title.en)
                : project.title;

              return (
                <div
                  key={project.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`p-3 border rounded-lg cursor-move transition-colors ${
                    draggedIndex === index
                      ? 'border-accent bg-accent/20 opacity-50'
                      : 'border-light-border dark:border-darkTheme-border bg-light-surface dark:bg-darkTheme-surface hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-accent text-lg">☰</div>
                    <div className="flex-1">
                      <div className="font-semibold text-dark dark:text-cream">{projectTitle}</div>
                      <div className="text-xs text-dark/60 dark:text-beige/60 mt-1">
                        ID: {project.id} • Slug: {project.slug}
                      </div>
                    </div>
                    <div className="text-sm text-dark/50 dark:text-beige/50">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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

