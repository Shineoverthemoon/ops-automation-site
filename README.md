# Ops Automation Lab

Front-end-only marketing/demo site for the Fixed-Scope Ops Automation Sprint.
React + Vite + Tailwind. No backend. No persistence. No external API calls.

## Run locally

```powershell
npm install
npm run dev
```

Visit http://localhost:5173

## Build

```powershell
npm run build
npm run preview
```

## Deploy

### Vercel (easiest)

1. Push the project to a GitHub repo.
2. Go to vercel.com → New Project → Import the repo.
3. Framework: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Done.

### GitHub Pages

1. In `vite.config.js`, change `base: './'` to `base: '/<your-repo-name>/'`.
2. Install gh-pages: `npm install -D gh-pages`
3. Push to GitHub, then run: `npm run deploy:gh`
4. In repo settings → Pages, set source to the `gh-pages` branch.

## Structure

```
.
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src
    ├── App.jsx       ← all sections + 5 demos
    ├── index.css     ← Tailwind layers + base styles
    └── main.jsx
```

## Boundaries baked into the site

- Every demo uses fake/sample data.
- Every demo shows a visible "demo only — no private/regulated data" notice.
- The intake form does not submit anywhere — it generates a copyable text block.
