const projects = [
  {
    id: 1,
    slug: 'portfolio',
    title: 'Portfolio Starter',
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
    link: '#'
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
  }
];

export default projects;
