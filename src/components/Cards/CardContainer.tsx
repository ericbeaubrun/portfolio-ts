import React from 'react';
import Card from './Card';
import './CardContainer.scss';

import {FaArrowRight} from 'react-icons/fa';
import {useLanguage} from "../Utils/LanguageContext.tsx";

import {motion} from 'framer-motion';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    title: string;
    desc: string;
    icon: string | string[];
    skills: { [key: string]: string };
    gh?: string;
    demo?: string;
}

interface CardContainerProps {
    projects: Project[];
}

const CardContainer: React.FC<CardContainerProps> = ({projects}) => {
    const {content} = useLanguage();
    const containerRef = React.useRef<HTMLDivElement>(null);
    const bandRef = React.useRef<HTMLDivElement>(null);

    const pairs = [];
    for (let i = 0; i < projects.length; i += 2) {
        pairs.push(projects.slice(i, i + 2));
    }

    React.useLayoutEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const cards = containerRef.current?.querySelectorAll('.card-wrapper');
            if (!cards) return;

            cards.forEach((card, index) => {
                const isMobile = window.innerWidth <= 1024;
                let isLeft;
                if (isMobile) {
                    isLeft = index % 2 === 0;
                } else {
                    isLeft = card.classList.contains('card-left');
                }

                const maxOffset = isMobile ? 250 : 500;
                const initialX = isLeft ? -maxOffset : maxOffset;

                // État de départ hors écran avec opacité 0
                gsap.set(card, {x: initialX, opacity: 0});

                // Animation ScrollTrigger fluide et optimisée
                gsap.to(card, {
                    x: 0,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom", // Commence quand le haut de la carte entre en bas de l'écran
                        end: "top 40%",     // Fini quand la carte atteint 40% du haut de l'écran (soit 60% de défilement)
                        scrub: true,
                    }
                });
            });

            // Scrolling band animation
            if (bandRef.current) {
                gsap.to(bandRef.current.querySelector('.band-content'), {
                    xPercent: -20, // Déplacement vers la gauche
                    ease: "none",
                    scrollTrigger: {
                        trigger: bandRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    }
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [projects]);

    const words = ["EXPRESS.JS", "DESIGN", "FULL-STACK", "REACT", "NODE.JS", "NEXT.JS", "TYPESCRIPT", "DATABASE", "API"];

    return (
        <section id="projects">
            <div className="card-container-section" ref={containerRef}>
                <div className="card-rows-container">
                    {pairs.map((pair, index) => (
                        <div key={index} className="card-row">
                            {pair.map((project, pIndex) => (
                                <div key={pIndex}
                                     className={`card-wrapper ${pIndex === 0 ? 'card-left' : 'card-right'}`}>
                                    <Card
                                        title={project.title}
                                        description={project.desc}
                                        media={project.icon}
                                        stack={project.skills}
                                        githubUrl={project.gh}
                                        demoUrl={project.demo}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="projects-more">
                    <p className="more-text">{(content as any)["projects-more-text"]}</p>
                    <motion.button
                        className="more-button"
                        onClick={() => window.open(`https://github.com/ericbeaubrun?tab=repositories`, '_blank')}
                        // whileHover={{ scale: 1.05 }}
                        // whileTap={{ scale: 0.95 }}
                    >
                    <span className="text">
                        {(content as any)["projects-more-button"]}
                        <FaArrowRight className="button-icon"/>
                    </span>
                        <div className="wave-btn"></div>
                    </motion.button>
                </div>
            </div>

            <div className="scrolling-band-container">
                <div className="scrolling-band" ref={bandRef}>
                    <div className="band-content">
                        {Array(10).fill(words).flat().map((word, i) => (
                            <span key={i} className="band-word">{word}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default CardContainer;
