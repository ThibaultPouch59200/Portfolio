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
