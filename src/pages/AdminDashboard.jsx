import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import projects from '../data/projects.js';
import { timelineEvents } from '../data/timeline.js';
import {
  getAllProjects,
  saveProject,
  deleteProject,
  getAllEvents,
  saveEvent,
  deleteEvent,
  exportData,
  clearAllData
} from '../utils/dataManager.js';
import { resetHomeContent } from '../utils/homeContentManager.js';
import ProjectForm from '../components/ProjectForm.jsx';
import EventForm from '../components/EventForm.jsx';
import HomeContentForm from '../components/HomeContentForm.jsx';
import ProjectsSettingsForm from '../components/ProjectsSettingsForm.jsx';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projectsList, setProjectsList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingHomeContent, setEditingHomeContent] = useState(false);
  const [editingProjectsSettings, setEditingProjectsSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load projects: merge stored with original
    const storedProjects = getAllProjects();
    const mergedProjects = [...projects];
    storedProjects.forEach(stored => {
      const index = mergedProjects.findIndex(p => p.id === stored.id);
      if (index >= 0) {
        mergedProjects[index] = stored;
      } else {
        mergedProjects.push(stored);
      }
    });
    setProjectsList(mergedProjects.sort((a, b) => b.id - a.id));

    // Load events: merge stored with original
    const storedEvents = getAllEvents();
    const mergedEvents = [...timelineEvents];
    storedEvents.forEach(stored => {
      const index = mergedEvents.findIndex(e => e.id === stored.id);
      if (index >= 0) {
        mergedEvents[index] = stored;
      } else {
        mergedEvents.push(stored);
      }
    });
    setEventsList(mergedEvents.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  const handleProjectSave = (project) => {
    saveProject(project);
    const updated = [...projectsList];
    const index = updated.findIndex(p => p.id === project.id);
    if (index >= 0) {
      updated[index] = project;
    } else {
      updated.push(project);
      updated.sort((a, b) => b.id - a.id);
    }
    setProjectsList(updated);
    setEditingProject(null);
  };

  const handleProjectDelete = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(projectId);
      setProjectsList(projectsList.filter(p => p.id !== projectId));
    }
  };

  const handleEventSave = (event) => {
    saveEvent(event);
    const updated = [...eventsList];
    const index = updated.findIndex(e => e.id === event.id);
    if (index >= 0) {
      updated[index] = event;
    } else {
      updated.push(event);
      updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    setEventsList(updated);
    setEditingEvent(null);
  };

  const handleEventDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
      setEventsList(eventsList.filter(e => e.id !== eventId));
    }
  };

  const handleExport = async () => {
    await exportData();
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all stored changes? This will reset to original data.')) {
      clearAllData();
      resetHomeContent();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-light-bg text-light-text dark:bg-darkTheme-bg dark:text-darkTheme-text py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-dark dark:text-cream">Admin Dashboard</h1>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
            >
              Export Data
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
            >
              Clear Changes
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-light-border dark:border-darkTheme-border">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'projects'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-dark/60 dark:text-beige/60 hover:text-dark dark:hover:text-beige'
              }`}
            >
              Projects ({projectsList.length})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'events'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-dark/60 dark:text-beige/60 hover:text-dark dark:hover:text-beige'
              }`}
            >
              Events ({eventsList.length})
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'home'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-dark/60 dark:text-beige/60 hover:text-dark dark:hover:text-beige'
              }`}
            >
              Page d'accueil
            </button>
          </div>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-dark dark:text-cream">Projects</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProjectsSettings(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
                >
                  ⚙️ Paramètres
                </button>
                <button
                  onClick={() => setEditingProject({ id: Date.now(), isNew: true })}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
                >
                  + Add Project
                </button>
              </div>
            </div>

            {editingProjectsSettings ? (
              <ProjectsSettingsForm
                availableProjects={projectsList}
                onSave={() => {
                  setEditingProjectsSettings(false);
                  window.location.reload();
                }}
                onCancel={() => setEditingProjectsSettings(false)}
              />
            ) : null}

            {editingProject ? (
              <ProjectForm
                project={editingProject}
                allProjects={projectsList}
                onSave={handleProjectSave}
                onCancel={() => setEditingProject(null)}
              />
            ) : (
              <div className="space-y-4">
                {projectsList.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 border border-light-border dark:border-darkTheme-border rounded-lg bg-light-surface dark:bg-darkTheme-surface"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-dark dark:text-cream mb-2">
                          {typeof project.title === 'object' ? project.title.en || project.title.fr : project.title}
                        </h3>
                        <p className="text-sm text-dark/70 dark:text-beige/80 mb-2">
                          {typeof project.description === 'object'
                            ? project.description.en || project.description.fr
                            : project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(project.tech || []).slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs px-2 py-1 rounded bg-light-subtle dark:bg-ink text-dark/80 dark:text-beige"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:opacity-90 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleProjectDelete(project.id)}
                          className="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:opacity-90 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-dark dark:text-cream">Timeline Events</h2>
              <button
                onClick={() => setEditingEvent({ id: `event-${Date.now()}`, isNew: true })}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
              >
                + Add Event
              </button>
            </div>

            {editingEvent ? (
              <EventForm
                event={editingEvent}
                onSave={handleEventSave}
                onCancel={() => setEditingEvent(null)}
              />
            ) : (
              <div className="space-y-4">
                {eventsList.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border border-light-border dark:border-darkTheme-border rounded-lg bg-light-surface dark:bg-darkTheme-surface"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            event.type === 'work' ? 'bg-indigo-500 text-white' :
                            event.type === 'education' ? 'bg-blue-500 text-white' :
                            event.type === 'internship' ? 'bg-emerald-500 text-white' :
                            event.type === 'project' ? 'bg-orange-500 text-white' :
                            'bg-gray-500 text-white'
                          }`}>
                            {event.type}
                          </span>
                          <span className="text-sm text-dark/60 dark:text-beige/60">
                            {event.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-dark dark:text-cream mb-1">
                          {typeof event.title === 'object' ? event.title.en || event.title.fr : event.title}
                        </h3>
                        <p className="text-sm text-dark/70 dark:text-beige/80">
                          {typeof event.description === 'object'
                            ? event.description.en || event.description.fr
                            : event.description}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => setEditingEvent(event)}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:opacity-90 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleEventDelete(event.id)}
                          className="px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:opacity-90 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Home Content Tab */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-dark dark:text-cream">Contenu de la page d'accueil</h2>
            </div>

            {editingHomeContent ? (
              <HomeContentForm
                availableProjects={projectsList}
                onSave={() => {
                  setEditingHomeContent(false);
                  window.location.reload();
                }}
                onCancel={() => setEditingHomeContent(false)}
              />
            ) : (
              <div className="p-4 border border-light-border dark:border-darkTheme-border rounded-lg bg-light-surface dark:bg-darkTheme-surface">
                <p className="text-dark/70 dark:text-beige/80 mb-4">
                  Gérez le contenu de la page d'accueil : Hero section, projets en avant, chiffres clés et texte du cursus.
                </p>
                <button
                  onClick={() => setEditingHomeContent(true)}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium"
                >
                  Modifier le contenu
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

