import React, {createContext, useContext, useState, useEffect, ReactNode} from "react";
import frContent from "../../content/fr_content.json";
import enContent from "../../content/en_content.json";

type Language = "fr" | "en";

interface LanguageContextProps {
    language: Language;
    content: Record<string, unknown>;
    toggleLanguage: () => void;
}


const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLanguage = localStorage.getItem("language");
        return (savedLanguage as Language) || "fr";
    });

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === "fr" ? "en" : "fr"));
    };

    const content = language === "fr" ? frContent : enContent;

    return (
        <LanguageContext.Provider
            value={{language, content, toggleLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
