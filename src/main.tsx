import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
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
