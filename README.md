# Portfolio - Eric ADELAIDE-BEAUBRUN

Bienvenue sur le dépôt du portfolio d'**Eric ADELAIDE-BEAUBRUN**, Étudiant Ingénieur Logiciel & Développeur Full-Stack (Java/React). 

Ce portfolio moderne et dynamique a été conçu pour présenter mes projets phares développés sur mon temps libre ou dans le cadre de mes études.

---

## Technologies Utilisées

Ce projet repose sur une stack moderne axée sur la performance et l'expérience utilisateur :

- **Framework principal** : [React](https://react.dev/) (v18.3.1) avec [TypeScript](https://www.typescriptlang.org/)
- **Build Tool** : [Vite](https://vite.dev/) (v8) pour un développement et un build ultra-rapides
- **Stylisation** : [SASS (SCSS)](https://sass-lang.com/) pour une architecture CSS propre et modulaire
- **Animations & Expérience utilisateur** :
  - [Lenis](https://lenis.darkroom.engineering/) pour un défilement fluide (*smooth scrolling*)
  - [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/) pour des transitions et des micro-animations interactives
  - [React Scroll](https://github.com/fessonia/react-scroll) pour la navigation ancrée
- **Formulaire de contact** : [EmailJS](https://www.emailjs.com/) pour la réception directe d'emails depuis le site
- **Qualité de code** : [ESLint](https://eslint.org/) pour le linting TypeScript/React

---

## Fonctionnalités Clés

1. **Multilingue (Bilingue FR/EN)** : 
   - Système de traduction fait maison via un `LanguageContext` réutilisable.
   - Les textes et données sont séparés du code dans des fichiers JSON (`en_content.json` & `fr_content.json`) pour faciliter la maintenance.
2. **Défilement Fluide & Mémoire de Scroll** :
   - Intégration de **Lenis Scroll** pour une sensation de glissement fluide.
   - Sauvegarde de la position de défilement dans le `sessionStorage` pour conserver la position exacte de l'utilisateur même après un rafraîchissement de la page.
3. **Parallax Footer Reveal** :
   - Effet moderne où le pied de page (Footer) est révélé en arrière-plan lorsque l'utilisateur atteint le bas du contenu principal.
4. **Indicateur de Progression de Défilement** :
   - Un cercle de progression dessiné en SVG dynamique suit la lecture de l'utilisateur.
5. **Adaptabilité Mobile** :
   - Utilisation d'un `MobileContext` personnalisé pour adapter les comportements de défilement et l'UI en temps réel sur les écrans tactiles et mobiles.

---

## Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/ericbeaubrun/portfolio-ts.git
cd portfolio-ts
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
Créez un fichier `.env` à la racine du projet et ajoutez-y vos clés EmailJS :
```env
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TEMPLATE_ID=votre_template_id
VITE_EMAILJS_PUBLIC_KEY=votre_cle_publique
```

---

## Aperçu des Projets Présentés

Le portfolio met en valeur plusieurs réalisations clés :
- **Dj URYA** : Un site web événementiel complet avec CMS sur mesure sous Next.js et MongoDB.
- **Conquête** : Un jeu de plateau stratégique écrit en Java incluant une IA personnalisée.
- **Simulateur de Trafic Aérien** : Un outil de génie logiciel en Java modélisant des flux de vol en temps réel (Multithreading).
- **Suivi de Présence** : Système client-serveur (Java/Python) d'assiduité universitaire avec base PostgreSQL.
- **LearnPy** : Une application pédagogique interactive PyQt6 pour enseigner la programmation Python.
- **Générateur de Tournois** : Une application React pour orchestrer des tournois avec arbres de qualification en temps réel.

---

## Contact

- **Nom** : Eric ADELAIDE-BEAUBRUN
- **Localisation** : Le Mée-sur-Seine (77350), France
- **Email** : [e.adelaide.beaubrun@gmail.com](mailto:e.adelaide.beaubrun@gmail.com)
- **LinkedIn** : [linkedin.com/in/adelaide-beaubrun](https://linkedin.com/in/adelaide-beaubrun)
- **GitHub** : [github.com/ericbeaubrun](https://github.com/ericbeaubrun)
