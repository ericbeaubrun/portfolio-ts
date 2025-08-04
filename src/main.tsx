import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import {LanguageProvider} from "./components/Utils/LanguageContext.tsx";
import {MobileProvider} from "./components/Utils/MobileContext.tsx";
import { initBarbaTransitions } from './components/Transitions/barbaTransitions';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MobileProvider>
            <LanguageProvider>
                <App/>
            </LanguageProvider>
        </MobileProvider>
    </StrictMode>
)

// Initialiser les transitions Barba.js après le rendu de l'application
document.addEventListener('DOMContentLoaded', () => {
    // Configuration de Barba.js pour fonctionner avec React Router
    initBarbaTransitions();
});
