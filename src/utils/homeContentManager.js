// Home content management utilities
// Uses localStorage to persist changes

const HOME_CONTENT_STORAGE_KEY = 'portfolio_home_content';

// Default home content structure
const defaultHomeContent = {
  hero: {
    name: 'Thibault Pouch',
    aliases: ['ThePandorBox', 'heathcliff'],
    currentStatus: {
      fr: 'Actuellement : 3e année Epitech • Orientation DevOps / Software',
      en: 'Currently: 3rd year Epitech • DevOps / Software oriented'
    },
    subtitleShort: {
      fr: 'Étudiant en 3e année à Epitech — focalisé Software & DevOps',
      en: '3rd year Epitech student — Software & DevOps focus'
    },
    subtitleTech: {
      fr: 'Pipelines CI/CD, automatisation, architectures modulaires & outils internes.',
      en: 'CI/CD pipelines, automation, modular architectures & internal tooling.'
    }
  },
  featuredProjects: {
    slugs: ['jeb-incubator', 'zappy', 'raytracer']
  },
  stats: {
    projects: { value: '7+', label: { fr: 'Projets majeurs', en: 'Major Projects' } },
    years: { value: '2+', label: { fr: 'Années intensives', en: 'Intensive Years' } },
    languages: { value: '6', label: { fr: 'Langages utilisés', en: 'Languages Used' } },
    automation: { value: '10+', label: { fr: 'Automatisations / pipelines', en: 'Automations / Pipelines' } }
  },
  curriculum: {
    paragraphs: {
      fr: [
        "Epitech est une école d'informatique orientée projet : apprentissage par l'action, très peu de cours magistraux, énormément de conception, de collaboration et de révision entre pairs.",
        "Chaque année repose sur des projets progressifs : algorithmique système, réseau, développement bas niveau (C/C++), puis architecture logicielle, outils internes, pipelines d'automatisation et projets de plus grande échelle.",
        "Ce format forge une forte autonomie, une capacité à apprendre de nouvelles technos rapidement et une rigueur dans la maintenance. Je capitalise dessus pour structurer des environnements DevOps (intégration, tests, industrialisation).",
        "Aujourd'hui je combine : développement applicatif (C++, Python, JS/TS), création d'outils internes (monitoring, synchronisation Jira), mise en place de pipelines (Jenkins, scripts) et structuration de bases projets modulaires."
      ],
      en: [
        "Epitech is a project‑centric engineering school: learn by doing, minimal lectures, heavy emphasis on design, collaboration and peer review.",
        "Each year builds through progressive projects: systems & low‑level in C/C++, networking, then software architecture, internal tooling, automation pipelines and larger scale initiatives.",
        "This format builds autonomy, rapid technology ramp‑up ability and disciplined maintainability. I leverage it to structure DevOps environments (integration, testing, industrialization).",
        "Today I combine: application development (C++, Python, JS/TS), internal tooling (monitoring, Jira sync), pipeline setup (Jenkins, scripts) and modular project foundations."
      ]
    }
  }
};

export function getHomeContent() {
  const stored = localStorage.getItem(HOME_CONTENT_STORAGE_KEY);
  if (!stored) return defaultHomeContent;

  try {
    const storedContent = JSON.parse(stored);
    // Deep merge with defaults
    return {
      hero: { ...defaultHomeContent.hero, ...storedContent.hero },
      featuredProjects: { ...defaultHomeContent.featuredProjects, ...storedContent.featuredProjects },
      stats: { ...defaultHomeContent.stats, ...storedContent.stats },
      curriculum: { ...defaultHomeContent.curriculum, ...storedContent.curriculum }
    };
  } catch (e) {
    console.error('Error loading home content from storage:', e);
    return defaultHomeContent;
  }
}

export function saveHomeContent(content) {
  localStorage.setItem(HOME_CONTENT_STORAGE_KEY, JSON.stringify(content));
}

export function resetHomeContent() {
  localStorage.removeItem(HOME_CONTENT_STORAGE_KEY);
}

export { defaultHomeContent };

