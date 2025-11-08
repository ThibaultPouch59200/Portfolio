# Portfolio React (FR/EN)

Un starter de portfolio moderne avec React + Vite + Tailwind + React Router + i18n (react-i18next).

## 🚀 Installation

```bash
npm install
npm run dev
```

Ouvre ensuite: http://localhost:5173

## 🗂 Structure
```
src/
  main.jsx           # Entrée app
  App.jsx            # Layout + routes
  index.css          # Tailwind + styles globaux
  components/        # Composants UI (Navbar, Footer, ProjectCard)
  pages/             # Pages (Home, About, Projects, Contact)
  data/              # Données (projects.js)
  i18n/              # Config internationalisation
    index.js
    locales/
      en/common.json
      fr/common.json
```

## 🌐 Internationalisation
- Langue par défaut: FR
- Fallback: EN
- Changement via les boutons FR / EN dans la navbar
- Pour ajouter une clé: ajouter dans `common.json` (fr & en) puis `t('chemin.clef')`

## 🎨 Personnalisation
- Couleurs: modifier `tailwind.config.cjs`
- Police: changer `body { font-family: ... }` dans `index.css`
- Nom / rôle: modifier dans `Home.jsx` et `Footer.jsx`
- Projets: éditer `src/data/projects.js`

## 🕒 Timeline (Parcours)
La page `About` affiche une timeline verticale (événements les plus récents en haut).

### Ajouter / modifier un événement
Éditer le fichier `src/data/timeline.js` et ajouter un objet au tableau `timelineEvents`.

Structure d'un événement:
```js
{
  id: 'unique-id',           // unique, utilisé comme key React
  date: '2025-09-01',        // ISO (YYYY-MM-DD) pour tri
  type: 'education' | 'work' | 'internship' | 'project' | 'autre',
  title: { fr: 'Titre FR', en: 'EN Title' },
  description: { fr: 'Description FR', en: 'EN Description' },
  details: {                 // (optionnel) listes supplémentaires
    fr: ['Point 1', 'Point 2'],
    en: ['Item 1', 'Item 2']
  }
}
```

Les événements sont automatiquement triés (plus récent d'abord). Le format de date affiché suit `Jour / Mois / Année` (FR) ou `Day / Mon / Year` (EN). Pour forcer un ordre entre deux événements le même jour, ajuster l'heure (`2025-09-01T08:00:00`).

### Types & couleurs
- `education` (bleu)
- `internship` (vert)
- `work` (indigo)
- `project` (orange)
- autre: gris par défaut

### Limiter le nombre d'éléments
Dans un autre composant: `<Timeline limit={5} />`.

### i18n
Le composant choisit `fr` ou `en` selon la langue active (fallback FR).


## 🧪 Qualité Code
- Lint: `npm run lint`
- ESLint + Prettier configurés

## 📦 Build
```bash
npm run build
npm run preview
```

## 🚢 Déploiement (options)
- Netlify: connecter repo > build command `npm run build` > publish dir `dist`
- Vercel: import repo > framework détecté
- GitHub Pages: `npm install -D gh-pages` puis script deploy (à ajouter)

## 🔐 Admin Panel

The portfolio includes an admin panel for managing projects and timeline events without editing code files.

### Setup

1. Create a `.env` file in the root directory:
```bash
VITE_ADMIN_PASSWORD=your-secure-password-here
```

2. Access the admin panel at `/admin/login` (e.g., `http://localhost:5173/admin/login`)

3. Enter the password set in your `.env` file

### Features

- **Projects Management**: Create, edit, or delete projects
- **Events Management**: Create, edit, or delete timeline events
- **Data Persistence**: Changes are stored in browser localStorage
- **Export Data**: Download all changes as JSON
- **Clear Changes**: Reset to original data from source files

### Important Notes

- The admin panel is protected by password authentication
- Changes are stored in localStorage (client-side only)
- To make changes permanent, you can:
  - Export the data and manually update the source files (`projects.js` and `timeline.js`)
  - Or keep using localStorage (changes persist across sessions)
- The `.env` file should **never** be committed to version control (already in `.gitignore`)

### Admin Routes

- `/admin/login` - Login page
- `/admin` - Dashboard (protected, requires authentication)

## ✅ À faire ensuite (suggestions)
- Formulaire de contact fonctionnel (EmailJS / backend)
- SEO (title dynamique, meta tags, Open Graph)
- Dark/Light mode toggle
- Animations (Framer Motion)
- Tests unitaires (Vitest + Testing Library)
- Accessibilité (vérifier contrastes, aria-labels)

Bon dev ! 🔧
