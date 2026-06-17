import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'

// Import Poppins font weights (Latin subset) used in the project
import '@fontsource/poppins/latin-300.css';
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-500.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';
import '@fontsource/poppins/latin-800.css';
import '@fontsource/poppins/latin-900.css';

import './index.scss'
import {LanguageProvider} from "./components/Utils/LanguageContext.tsx";
import {MobileProvider} from "./components/Utils/MobileContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MobileProvider>
            <LanguageProvider>
                <App/>
            </LanguageProvider>
        </MobileProvider>
    </StrictMode>
)
