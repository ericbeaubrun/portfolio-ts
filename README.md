# Portfolio - Eric ADELAIDE-BEAUBRUN

Welcome to the portfolio repository of **Eric ADELAIDE-BEAUBRUN**, Software Engineering Student & Full-Stack Developer (Java/React).

This modern and dynamic portfolio was designed to showcase my flagship projects, developed both during my studies and in my personal time.

---

## Technologies Used

This project is built on a modern technology stack focused on performance and user experience:

* **Main Framework**: React (v18.3.1) with TypeScript
* **Build Tool**: Vite (v8) for ultra-fast development and production builds
* **Styling**: SASS (SCSS) for a clean and modular CSS architecture
* **Animations & User Experience**:

  * Lenis for smooth scrolling
  * Framer Motion & GSAP for interactive transitions and micro-animations
  * React Scroll for anchor-based navigation
* **Contact Form**: EmailJS for direct email delivery from the website
* **Code Quality**: ESLint for TypeScript and React linting

---

## Key Features

### 1. Multilingual Support (French / English)

* Custom-built translation system using a reusable `LanguageContext`.
* Content and text are separated from the application logic and stored in JSON files (`en_content.json` and `fr_content.json`) for easier maintenance and scalability.

### 2. Smooth Scrolling & Scroll Position Persistence

* Integration of **Lenis Scroll** for a fluid scrolling experience.
* Scroll position is saved in `sessionStorage`, allowing users to keep their exact position even after refreshing the page.

### 3. Parallax Footer Reveal

* Modern visual effect where the footer is progressively revealed in the background as the user reaches the bottom of the main content.

### 4. Scroll Progress Indicator

* A dynamic SVG-based circular progress indicator that tracks the user's reading progress throughout the page.

### 5. Mobile Responsiveness

* Uses a custom `MobileContext` to dynamically adapt scrolling behavior and UI interactions across mobile and touch devices.

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ericbeaubrun/portfolio-ts.git
cd portfolio-ts
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file at the root of the project and add your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Featured Projects

This portfolio highlights several key projects:

### Dj URYA

A complete event management website featuring a custom CMS built with Next.js and MongoDB.

### Conquête

A strategic board game developed in Java, featuring a custom-built AI opponent.

### Air Traffic Simulator

A software engineering project written in Java that models real-time air traffic flows using multithreading.

### Attendance Tracking System

A client-server application (Java/Python) for university attendance management, backed by a PostgreSQL database.

### LearnPy

An interactive educational application built with PyQt6 to teach Python programming concepts.

### Tournament Generator

A React application designed to manage tournaments with real-time bracket generation and progression tracking.

---

## Contact

* **Location**: Le Mée-sur-Seine (77350), France
* **Email**: [e.adelaide.beaubrun@gmail.com](mailto:e.adelaide.beaubrun@gmail.com)
* **LinkedIn**: https://linkedin.com/in/adelaide-beaubrun
