import React from "react";
import { useLanguage } from "./LanguageContext.tsx";
import "./LanguageSwitcher.scss";

const LanguageSwitcher: React.FC = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <div className="language-toggle" onClick={toggleLanguage}>
            <div className={`toggle-option ${language === "fr" ? "active" : ""}`}>FR</div>
            <div className={`toggle-option ${language === "en" ? "active" : ""}`}>EN</div>
            <div className={`toggle-slider ${language === "fr" ? "left" : "right"}`}></div>
        </div>
    );
};

export default LanguageSwitcher;
