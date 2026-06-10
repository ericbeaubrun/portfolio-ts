import React, { useLayoutEffect, useRef } from 'react';
import Banner from '../Projects/Banner.tsx';
import './About.scss';
import { useLanguage } from "../Utils/LanguageContext.tsx";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
    const { content } = useLanguage();
    const presentationContent = (content as { introduction: { p1: string, p2: string } });
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Sélectionne tous les mots (spans) à l'intérieur du conteneur
            const words = containerRef.current?.querySelectorAll('.word');
            
            if (words && words.length > 0) {
                gsap.fromTo(words, 
                    { color: 'rgba(255, 255, 255, 0.2)' }, // Couleur de départ (estompée)
                    {
                        color: '#FFFFFF', // Couleur finale (claire)
                        stagger: 0.1,     // Délai entre chaque mot
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",   // Début de l'animation quand le haut du texte touche 80% de l'écran
                            end: "bottom 60%",  // Fin de l'animation
                            scrub: true,        // L'animation suit la progression du scroll
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert(); // Nettoyage lors du démontage du composant
    }, []);

    // Fonction utilitaire pour séparer le texte en mots
    const splitText = (text: string) => {
        return text.split(' ').map((word, index) => (
            <span key={index} className="word">
                {word}{' '}
            </span>
        ));
    };

    return (
        <section id="about">
            <div className="about-container">
                <Banner text="A propos" />
                <div className="about-text-content" ref={containerRef}>
                    <p>{splitText(presentationContent.introduction.p1)}</p>
                    <p>{splitText(presentationContent.introduction.p2)}</p>
                </div>
            </div>
        </section>
    );
};

export default About;
