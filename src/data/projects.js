const projects = [
  {
    id: 1,
    title: 'Portfolio Starter',
    description: 'Base pour présenter vos projets avec i18n, Tailwind et React Router.',
    tech: ['React', 'Vite', 'Tailwind'],
    link: '#'
  },
  {
    id: 2,
    title: 'API Demo',
    description: 'Exemple d\'intégration d\'une API REST publique.',
    tech: ['Fetch', 'REST'],
    link: '#'
  },
  {
    id: 3,
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
    link: null
  }
];

export default projects;
