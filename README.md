# Portfolio

This modern and dynamic portfolio was designed to showcase my projects, developed both during my studies and in my personal time.

* **Email**: [e.adelaide.beaubrun@gmail.com](mailto:e.adelaide.beaubrun@gmail.com)
* **LinkedIn**: https://linkedin.com/in/eric-adelaide-beaubrun

## Développement

```bash
npm ci
npm run dev
```

Copier `.env.example` vers `.env` et renseigner les trois identifiants publics
EmailJS avant de tester le formulaire de contact.

La commande `npm run check` exécute le lint, les tests, le build et la
vérification des chemins et métadonnées destinés à Vercel.

## Déploiement

Vercel détecte automatiquement le projet Vite. La commande de build recommandée
est `npm run check` et le dossier de sortie est `dist`.

Configurer dans Vercel les variables `VITE_EMAILJS_SERVICE_ID`,
`VITE_EMAILJS_TEMPLATE_ID` et `VITE_EMAILJS_PUBLIC_KEY`.

Les URL SEO utilisent automatiquement `VERCEL_PROJECT_PRODUCTION_URL`. Pour un
domaine personnalisé, définir également `VITE_SITE_URL` avec son URL complète,
par exemple `https://portfolio.example.com`.
