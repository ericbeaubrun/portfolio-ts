import {createContext} from 'react';
import type {Language, PortfolioContent} from '../../content/content.types.ts';

export interface LanguageContextValue {
    language: Language;
    content: PortfolioContent;
    toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
