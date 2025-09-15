// Timeline data: newest first
// Each event: id, date (ISO), type, titles (fr/en), description (fr/en), optional details array
// To add: push a new object (or unshift if you keep manual ordering) and ensure unique id.

export const timelineEvents = [
  {
    id: 'work-norsys-parttime-2025-09',
    date: '2025-09-01',
    type: 'work',
    title: { fr: 'Temps partiel chez Norsys', en: 'Part-time at Norsys' },
    description: { fr: 'Début du travail à temps partiel en parallèle des études.', en: 'Started part-time work alongside studies.' }
  },
  {
    id: 'project-nextrise-2025-09',
    date: '2025-09-01',
    type: 'project',
    title: { fr: 'Projet de piscine Tek3 : Nextrise', en: 'Tek3 Swimming Pool Project: Nextrise' },
    description: { fr: 'Projet de piscine pour le client JEB Incubator.', en: 'Swimming pool project for client JEB Incubator.' },
    projectSlug: 'jeb-incubator'
  },
  {
    id: 'epitech-tek3-start-2025-09',
    date: '2025-09-01',
    type: 'education',
    title: { fr: 'Début de 3e année à Epitech', en: 'Start of 3rd year at Epitech' },
    description: { fr: 'Transition vers Tek3.', en: 'Transition into Tek3.' }
  },
  {
    id: 'project-zappy-2025-06',
    date: '2025-06-15',
    type: 'project',
    title: { fr: 'Projet final Tek2 : Zappy', en: 'Tek2 Final Project: Zappy' },
    description: { fr: 'Projet majeur de fin d\'année.', en: 'Major end-of-year project.' },
    projectSlug: 'zappy'
  },
  {
    id: 'internship-talan-2025-01',
    date: '2025-01-15',
    type: 'internship',
    title: { fr: 'Stage chez Talan', en: 'Internship at Talan' },
    description: {
      fr: 'Outil de synchronisation multi‑Jira (client ↔ interne) : tickets, commentaires et pièces jointes importés côté interne. Les modifications restent internes jusqu\'à l\'ajout d\'un tag déclenchant la publication vers le Jira client.',
      en: 'Multi-Jira synchronization tool (client ↔ internal): tickets, comments and attachments ingested internally. Changes stay internal until a specific tag triggers publishing back to the client Jira.'
    },
    details: {
      fr: [
        'Synchronisation tickets, commentaires, pièces jointes',
        'Isolation des modifications internes',
        'Publication conditionnelle via tag',
        'Réduction du bruit côté client',
        'Automatisation via webhooks & API Jira'
      ],
      en: [
        'Sync of tickets, comments, attachments',
        'Internal changes isolated',
        'Conditional publish via tag',
        'Reduced noise on client side',
        'Automation via webhooks & Jira API'
      ]
    }
  },
  {
    id: 'epitech-tek2-start-2024-09',
    date: '2024-09-01',
    type: 'education',
    title: { fr: 'Début de 2e année à Epitech', en: 'Start of 2nd year at Epitech' },
    description: { fr: 'Entrée en Tek2.', en: 'Entering second year.' }
  },
  {
    id: 'epitech-tek1-start-2023-10',
    date: '2023-10-01',
    type: 'education',
    title: { fr: 'Début de 1re année à Epitech', en: 'Start of 1st year at Epitech' },
    description: { fr: 'Entrée en Tek1.', en: 'Entering first year.' }
  }
];

// Utility to get events sorted descending by date (newest first)
export function getTimeline(locale = 'fr') {
  return [...timelineEvents]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(evt => ({
      ...evt,
      title: evt.title[locale] || evt.title.fr,
      description: evt.description[locale] || evt.description.fr,
      details: evt.details ? (evt.details[locale] || evt.details.fr) : undefined
    }));
}

// Date formatter (FR default): Mois Année
const monthNames = {
  fr: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

export function formatTimelineDate(isoDate, locale = 'fr') {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  const month = monthNames[locale]?.[d.getMonth()] || monthNames.fr[d.getMonth()];
  const year = d.getFullYear();
  return `${month} ${year}`;
}
