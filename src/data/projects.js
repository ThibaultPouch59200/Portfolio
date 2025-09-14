const projects = [
  {
    id: 8,
    slug: 'jeb-incubator',
    title: 'JEB Startup Platform',
    description: 'Plateforme Next.js + React pour visibilité startups, acteurs & opportunités (incubateur JEB).',
    descriptionLong: {
      fr: 'Plateforme moderne pour l\'incubateur JEB : backend API Next.js (auth JWT, intégrations, données incubateur) et frontend Vite/React mettant en avant les startups, actualités, événements, opportunités et interactions investisseurs/partenaires. Objectifs clés : centraliser visibilité, connexions (investisseurs, partenaires, institutions), diffusion d\'actualités dynamiques (levées, annonces, événements) et gestion de contenu administrable (news, startups, rôles). Architecture modulable, séparation claire frontend / backend, intégration Supabase (stockage / potentiel persistance) et pipeline future CI/CD.',
      en: 'Modern platform for the JEB incubator: Next.js API backend (JWT auth, integrations, incubator data) and Vite/React frontend highlighting startups, news, events, opportunities and investor/partner interactions. Core goals: centralize visibility, enable connections (investors, partners, institutions), surface dynamic updates (funding rounds, announcements, events) and provide admin-managed content (news, startups, roles). Modular architecture with clear frontend/backend split, Supabase integration (storage / potential persistence) and future CI/CD pipeline.'
    },
    goals: {
      fr: [
        'Visibilité unifiée des startups',
        'Connexions investisseurs & partenaires',
        'Actualités dynamiques (levées, événements)',
        'Gestion de contenu administrable',
        'Architecture modulable & évolutive'
      ],
      en: [
        'Unified startup visibility',
        'Investor & partner connections',
        'Dynamic news & events feed',
        'Admin managed content',
        'Modular & scalable architecture'
      ]
    },
    tech: ['Next.js', 'React', 'Vite', 'JWT', 'Supabase'],
    languages: ['JavaScript', 'TypeScript'],
    technologies: ['Next.js API Routes', 'Supabase', 'JWT Auth', 'PostgreSQL (planned)', 'Docker (planned)'],
    values: ['Visibilité', 'Collaboration', 'Scalabilité', 'Produit'],
    link: 'https://github.com/Aincrad-Flux/NextRise'
  },
  {
    id: 1,
    slug: 'portfolio',
    title: 'Portfolio',
    description: 'Base pour présenter vos projets avec i18n, Tailwind et React Router.',
    descriptionLong: {
      fr: 'Application portfolio moderne construite avec React + Vite, Tailwind pour le design utilitaire, internationalisation (i18n) et routage côté client. Structure pensée pour être facilement extensible (ajout de pages, de projets, de langues). Intégration d\'un thème clair/sombre et composants modulaires accessibles.',
      en: 'Modern portfolio app built with React + Vite, Tailwind utility styling, internationalization (i18n) and client-side routing. Architecture designed to be easily extensible (adding pages, projects, languages). Includes light/dark theme and accessible modular components.'
    },
    goals: {
      fr: [
        'Mettre en place une base réutilisable',
        'Gestion multilingue (i18n)',
        'Thème clair / sombre',
        'Composants modulaires accessibles'
      ],
      en: [
        'Provide a reusable starter',
        'Internationalization support',
        'Light / dark theme',
        'Accessible modular components'
      ]
    },
    tech: ['React', 'Vite', 'Tailwind'],
    languages: ['JavaScript'],
    technologies: ['React Router', 'i18next', 'TailwindCSS'],
    values: ['Structure', 'Accessibilité', 'Internationalisation'],
    link: 'https://github.com/BoxOfPandor/Portfolio'
  },
  {
    id: 2,
    slug: 'zappy',
    title: 'Zappy',
    description: 'Jeu "zéro joueur" multi-composants : serveur, interface, IA coopérative.',
    descriptionLong: {
      fr: 'Projet de fin de Tek2 en équipe de 6 : conception d\'un jeu à zéro joueur où des IA évoluent sur une carte, collectent des ressources, gèrent leur nourriture et se synchronisent pour atteindre le niveau 8. Architecture comprenant un serveur réseau, une interface d\'observation et une IA distribuée (plusieurs processus/clients) avec protocoles de communication et stratégies de coopération.',
      en: 'End of Tek2 team project (6 members): design of a zero-player style game where AIs roam a map, gather resources, manage food and coordinate to reach level 8. Architecture included a network server, an observer UI and a distributed AI (multiple client processes) with custom communication protocol and cooperative strategies.'
    },
    goals: {
      fr: [
        'Atteindre niveau 8 via rituels coopératifs',
        'Gestion des ressources et de la nourriture',
        'Protocoles de communication entre IA',
        'Scalabilité multi-processus'
      ],
      en: [
        'Reach level 8 via cooperative rituals',
        'Resource and food management',
        'AI-to-AI communication protocols',
        'Multi-process scalability'
      ]
    },
    tech: ['C', 'Sockets', 'Concurrency', 'Algorithms'],
    languages: ['C', 'C++', 'Python'],
    technologies: ['Sockets', 'Raylib', 'Distributed AI'],
    values: ['Gestion serveur', 'UI/UX', 'Conception IA'],
    link: "https://github.com/Aincrad-Flux/Zappy"
  },
  {
    id: 3,
    slug: 'raytracer',
    title: 'RayTracer',
    description: 'Moteur de ray tracing C++ multithread avec primitives, matériaux, éclairage et sortie PPM / aperçu SFML.',
    descriptionLong: {
      fr: 'Moteur de ray tracing écrit en C++17 permettant de rendre des scènes 3D via un système de caméra configurable, plusieurs primitives (sphères, cylindres), matériaux avec composantes ambiante/diffuse/spéculaire, éclairage directionnel, ombres et shading. Rendu multithread (division en tuiles) avec export PPM ou aperçu temps réel + capture PNG via SFML. Construction de scène via fichiers de configuration libconfig (camera, primitives, lights) et architecture modulaire utilisant les patrons Builder, Factory, Strategy et Composite pour extensibilité et maintenance.',
      en: 'C++17 ray tracing engine rendering 3D scenes with a configurable camera system, multiple primitives (spheres, cylinders), materials (ambient/diffuse/specular components), directional lights, shadows and shading. Multithreaded tile-based rendering with PPM output or real-time SFML preview + PNG capture. Scenes are described with libconfig files (camera, primitives, lights). Architecture leverages Builder, Factory, Strategy and Composite patterns for modularity and extensibility.'
    },
    goals: {
      fr: [
        'Support de primitives (sphères, cylindres)',
        'Matériaux et éclairage directionnel',
        'Rendu multithread (tuiles)',
        'Configuration via fichiers libconfig',
        'Aperçu temps réel SFML'
      ],
      en: [
        'Primitive support (spheres, cylinders)',
        'Materials & directional lighting',
        'Multithreaded tile rendering',
        'Scene config via libconfig files',
        'Real-time SFML preview'
      ]
    },
    tech: ['C++', 'Ray Tracing', 'Multithreading'],
    languages: ['C++'],
    technologies: ['SFML', 'libconfig++', 'Design Patterns'],
    values: ['Performance', 'Architecture', 'Rendu 3D'],
    link: 'https://github.com/BoxOfPandor/RayTracer'
  },
  {
    id: 4,
    slug: 'arthemis',
    title: 'ARthemis',
    description: 'Plateforme Jenkins automatisée (JCasC) pour revue et tests de projets étudiants.',
    descriptionLong: {
      fr: 'ARthemis (Automated Review & Testing Engine for Modular Integration on Software) est une plateforme basée sur Jenkins permettant d\'automatiser la revue, l\'exécution de tests et l\'intégration continue de projets étudiants. Elle fournit une configuration Jenkins-as-Code (JCasC), des pipelines Groovy prêts à l\'emploi, une gestion de rôles (Sentinel, Architect, Voyager) et une intégration facilitée de dépôts GitHub (y compris privés via clés SSH). L\'objectif est d\'accélérer le déploiement, standardiser les tests et améliorer la qualité logicielle.',
      en: 'ARthemis (Automated Review & Testing Engine for Modular Integration on Software) is a Jenkins-based platform automating review, testing and continuous integration for student projects. It delivers Jenkins Configuration as Code (JCasC), ready-to-use Groovy pipelines, role-based access (Sentinel, Architect, Voyager) and streamlined onboarding of GitHub repositories (including private via SSH keys). The goal is to accelerate provisioning, standardize testing and improve software quality.'
    },
    goals: {
      fr: [
        'Déploiement rapide d\'une instance Jenkins prête',
        'Standardiser tests et revues automatiques',
        'Gestion centralisée des rôles et permissions',
        'Intégration simple de dépôts GitHub privés',
        'Améliorer la qualité et la traçabilité'
      ],
      en: [
        'Rapid provisioning of a ready Jenkins instance',
        'Standardize automated tests & reviews',
        'Central role & permission management',
        'Easy onboarding of private GitHub repos',
        'Improve quality and traceability'
      ]
    },
    tech: ['Jenkins', 'CI/CD', 'Automation'],
    languages: ['Groovy', 'YAML', 'Shell'],
    technologies: ['JCasC', 'Pipelines', 'SSH Integration'],
    values: ['Automatisation', 'Qualité', 'Intégration Continue'],
    link: 'https://github.com/BoxOfPandor/Arthemis'
  },
  {
    id: 5,
    slug: 'jiraswapautomate',
    title: 'JiraSwapAutomate',
    description: 'Outil de synchronisation multi‑Jira : tickets, commentaires, temps & automatisations.',
    descriptionLong: {
      fr: 'JiraSwapAutomate est un outil destiné à synchroniser automatiquement des tickets entre plusieurs instances Jira (interne ↔ client). Il gère le transfert conditionnel (avec validation) des modifications, la synchronisation des commentaires, des pièces jointes et l\'automatisation des mises à jour. Il inclut aussi la gestion des entrées de temps (imports Excel) et un système de logs/reporting détaillé. Déployable via Docker et extensible pour divers workflows de gestion de projet.',
      en: 'JiraSwapAutomate is a tool to automatically synchronize tickets across multiple Jira instances (internal ↔ client). It performs conditional (validated) propagation of changes, comment synchronization, attachment handling and bulk updates. It also manages time entries (Excel import) and provides detailed logging/reporting. Deployable with Docker and extensible for various project management workflows.'
    },
    goals: {
      fr: [
        'Synchroniser tickets & commentaires entre instances',
        'Garder modifications internes isolées jusqu\'à validation',
        'Automatiser transferts & mises à jour',
        'Gérer entrées de temps mensuelles',
        'Centraliser logs et traçabilité'
      ],
      en: [
        'Sync tickets & comments across instances',
        'Isolate internal edits until validation',
        'Automate transfers & bulk updates',
        'Manage monthly time entries',
        'Centralize logs & traceability'
      ]
    },
    tech: ['Docker', 'Automation', 'API'],
    languages: ['Python', 'Shell', 'Docker'],
    technologies: ['Jira API', 'Webhooks', 'Excel Import'],
    values: ['Automatisation', 'Productivité', 'Qualité'],
    link: 'https://github.com/BoxOfPandor/Jira-Interface-Relais-Automate'
  },
  {
    id: 6,
    slug: 'mytop',
    title: 'MyTop',
    description: 'Outil de monitoring système modulaire (terminal ncurses & interface graphique SFML).',
    descriptionLong: {
      fr: 'MyTop est un outil de supervision système en temps réel offrant une architecture modulaire permettant d\'activer ou désactiver des modules (CPU, RAM, Batterie, Réseau, Système, Temps). Il fournit deux interfaces : terminal (ncurses) et graphique (SFML). Actualisation configurable, navigation clavier, et design extensible via ajout de nouveaux modules implémentant une interface commune. Idéal pour explorer les APIs système et la conception modulaire.',
      en: 'MyTop is a real-time system monitoring tool with a modular architecture where each subsystem (CPU, RAM, Battery, Network, System Info, Time) is its own module. It offers both a terminal (ncurses) and a graphical (SFML) interface. Refresh rate is adjustable, modules can be toggled live, and new modules can be added by implementing a shared interface. Useful for exploring system APIs and modular design.'
    },
    goals: {
      fr: [
        'Architecture modulaire extensible',
        'Double interface (ncurses / SFML)',
        'Stats système temps réel',
        'Activation / désactivation de modules',
        'Taux de rafraîchissement ajustable'
      ],
      en: [
        'Extensible modular architecture',
        'Dual interface (ncurses / SFML)',
        'Real-time system stats',
        'Enable / disable modules',
        'Adjustable refresh rate'
      ]
    },
    tech: ['C++', 'Monitoring', 'Systems'],
    languages: ['C++'],
    technologies: ['ncurses', 'SFML', 'Modules'],
    values: ['Modularité', 'Performance', 'Ergonomie'],
    link: 'https://github.com/BoxOfPandor/MyTop'
  },
  {
    id: 7,
    slug: 'invasori-infinito',
    title: 'Invasori Infinito',
    description: 'Jeu arcade type Space Invaders infini avec power-ups, boss et boucle temporelle.',
    descriptionLong: {
      fr: 'Invasori Infinito est un jeu arcade inspiré de Space Invaders, créé lors d\'un hackathon. Le joueur incarne le Commandant Lupo Bruni piégé dans une boucle temporelle en 3147, tentant de sauver une Terre mourante. Vagues infinies d\'ennemis, boss périodiques, power-ups stratégiques (effacement écran, cadence de tir, vitesse, vie) et narration environnementale (séquence secrète, apparition Fenice). Objectif : survivre le plus longtemps et repousser l\'inévitable tout en cherchant à briser le cycle.',
      en: 'Invasori Infinito is a Space-Invaders inspired arcade game built during a hackathon. You play Commander Lupo Bruni, trapped in a time loop in the year 3147 trying to save a dying Earth. Endless alien waves, periodic bosses, strategic power-ups (screen wipe, fire rate, movement speed, extra life) and environmental storytelling (secret input sequence, the Phoenix apparition). Goal: survive as long as possible and push for a way to break the loop.'
    },
    goals: {
      fr: [
        'Boucle de jeu arcade infinie',
        'Gestion de power-ups variés',
        'Boss récurrents toutes les X points',
        'Narration légère intégrée',
        'Score & progression de difficulté'
      ],
      en: [
        'Endless arcade gameplay loop',
        'Varied power-up system',
        'Recurring boss every score threshold',
        'Light embedded storytelling',
        'Score & dynamic difficulty scaling'
      ]
    },
    tech: ['Game Jam', 'Arcade', 'Gameplay'],
    languages: ['Python'],
    technologies: ['Pygame'],
    values: ['Créativité', 'Rapidité', 'Gameplay'],
    link: 'https://github.com/BoxOfPandor/invasori_infinito'
  }
];

export default projects;
