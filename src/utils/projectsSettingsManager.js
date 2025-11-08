// Projects page settings management
// Uses localStorage to persist settings

const PROJECTS_SETTINGS_KEY = 'portfolio_projects_settings';

const defaultSettings = {
  order: [], // Array of project IDs in desired order
  gridColumns: 2 // 2 or 3 columns
};

export function getProjectsSettings() {
  const stored = localStorage.getItem(PROJECTS_SETTINGS_KEY);
  if (!stored) return defaultSettings;

  try {
    const storedSettings = JSON.parse(stored);
    return {
      ...defaultSettings,
      ...storedSettings
    };
  } catch (e) {
    console.error('Error loading projects settings:', e);
    return defaultSettings;
  }
}

export function saveProjectsSettings(settings) {
  localStorage.setItem(PROJECTS_SETTINGS_KEY, JSON.stringify(settings));
}

export function resetProjectsSettings() {
  localStorage.removeItem(PROJECTS_SETTINGS_KEY);
}

export { defaultSettings };

