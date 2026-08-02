import {useEffect, useState, type ReactNode} from 'react';
import frContent from '../../content/fr_content.json';
import enContent from '../../content/en_content.json';
import type {Language, PortfolioContent} from '../../content/content.types.ts';
import {LanguageContext} from './language-context.ts';

const DEFAULT_LANGUAGE: Language = 'fr';
const CONTENT_BY_LANGUAGE: Record<Language, PortfolioContent> = {
    fr: frContent,
    en: enContent,
};

const isLanguage = (value: string | null): value is Language =>
    value === 'fr' || value === 'en';

export const LanguageProvider = ({children}: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem('language');
        return isLanguage(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((previousLanguage) => previousLanguage === 'fr' ? 'en' : 'fr');
    };

    const content = CONTENT_BY_LANGUAGE[language];

    return (
        <LanguageContext.Provider value={{language, content, toggleLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};
