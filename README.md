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

## ✅ À faire ensuite (suggestions)
- Formulaire de contact fonctionnel (EmailJS / backend)
- SEO (title dynamique, meta tags, Open Graph)
- Dark/Light mode toggle
- Animations (Framer Motion)
- Tests unitaires (Vitest + Testing Library)
- Accessibilité (vérifier contrastes, aria-labels)

Bon dev ! 🔧
