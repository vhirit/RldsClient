# RLDS Frontend

React + Vite + Tailwind CSS implementation of RLDS Pvt Ltd marketing site.

## Structure
```
frontend/
  index.html
  package.json
  vite.config.js
  jsconfig.json
  tailwind.config.cjs
  postcss.config.cjs
  src/
    main.jsx
    App.jsx
    index.css
    components/ui/button.jsx
```

## Getting Started
Install dependencies:
```
npm install
```
Run dev server:
```
npm run dev
```
The site will be available at the printed local URL (usually http://localhost:5173).

## Build
```
npm run build
```
Preview production build:
```
npm run preview
```

## Customization
- Replace `public/Logo_RLDS.png` (add a `public` folder in project root) for logo.
- Update colors by editing Tailwind config `tailwind.config.cjs`.
- Add new UI elements under `src/components`.

## Deployment
The `dist/` output can be served by any static host (Netlify, Vercel, Nginx, S3, etc.).

## Contact Form
Currently static (no backend wiring). Integrate by adding an API endpoint in `backend/` and calling with `fetch` inside the submit handler.
