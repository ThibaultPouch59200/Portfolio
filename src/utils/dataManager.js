// Data management utilities for projects and events
// Uses localStorage to persist changes

const PROJECTS_STORAGE_KEY = 'portfolio_projects';
const EVENTS_STORAGE_KEY = 'portfolio_events';

// Projects management
export function getProjects(originalProjects) {
  const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
  if (!stored) return originalProjects;

  try {
    const storedProjects = JSON.parse(stored);
    // Merge: stored projects override original ones, new original ones are added
    const storedMap = new Map(storedProjects.map(p => [p.id, p]));
    const result = originalProjects.map(orig => storedMap.get(orig.id) || orig);

    // Add any stored projects that don't exist in original
    storedProjects.forEach(stored => {
      if (!originalProjects.find(orig => orig.id === stored.id)) {
        result.push(stored);
      }
    });

    return result;
  } catch (e) {
    console.error('Error loading projects from storage:', e);
    return originalProjects;
  }
}

export function saveProject(project) {
  const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
  let projects = stored ? JSON.parse(stored) : [];

  const index = projects.findIndex(p => p.id === project.id);
  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.push(project);
  }

  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

export function deleteProject(projectId) {
  const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
  if (!stored) return;

  const projects = JSON.parse(stored);
  const filtered = projects.filter(p => p.id !== projectId);
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(filtered));
}

export function getAllProjects() {
  const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Events management
export function getEvents(originalEvents) {
  const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!stored) return originalEvents;

  try {
    const storedEvents = JSON.parse(stored);
    const storedMap = new Map(storedEvents.map(e => [e.id, e]));
    const result = originalEvents.map(orig => storedMap.get(orig.id) || orig);

    storedEvents.forEach(stored => {
      if (!originalEvents.find(orig => orig.id === stored.id)) {
        result.push(stored);
      }
    });

    return result;
  } catch (e) {
    console.error('Error loading events from storage:', e);
    return originalEvents;
  }
}

export function saveEvent(event) {
  const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
  let events = stored ? JSON.parse(stored) : [];

  const index = events.findIndex(e => e.id === event.id);
  if (index >= 0) {
    events[index] = event;
  } else {
    events.push(event);
  }

  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
}

export function deleteEvent(eventId) {
  const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!stored) return;

  const events = JSON.parse(stored);
  const filtered = events.filter(e => e.id !== eventId);
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(filtered));
}

export function getAllEvents() {
  const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Export/Import utilities
export async function exportData() {
  const projects = getAllProjects();
  const events = getAllEvents();
  const { getHomeContent } = await import('./homeContentManager.js');
  const homeContent = getHomeContent();
  const data = { projects, events, homeContent, exportedAt: new Date().toISOString() };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function clearAllData() {
  localStorage.removeItem(PROJECTS_STORAGE_KEY);
  localStorage.removeItem(EVENTS_STORAGE_KEY);
  // Home content will be cleared separately if needed
}

