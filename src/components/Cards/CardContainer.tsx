import React from 'react';
import Card from './Card';
import './CardContainer.scss';

import {FaArrowRight} from 'react-icons/fa';
import {useLanguage} from "../Utils/LanguageContext.tsx";

import {motion} from 'framer-motion';

interface Project {
    title: string;
    desc: string;
    icon: string;
    skills: { [key: string]: string };
}

interface CardContainerProps {
    projects: Project[];
}

const CardContainer: React.FC<CardContainerProps> = ({projects}) => {
    const {content} = useLanguage();
    const containerRef = React.useRef<HTMLDivElement>(null);

    const pairs = [];
    for (let i = 0; i < projects.length; i += 2) {
        pairs.push(projects.slice(i, i + 2));
    }

    React.useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const cards = containerRef.current.querySelectorAll('.card-wrapper');
            const windowHeight = window.innerHeight;
            const isMobile = window.innerWidth <= 1024;

            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();

                const windowHeight = window.innerHeight;
                const isMobile = window.innerWidth <= 1024;

                // Progression plus rapide : la carte est centrée quand elle a parcouru 60% de l'écran
                const travelDistance = windowHeight * 0.6;
                const progress = (windowHeight - rect.top) / travelDistance;
                const clampedProgress = Math.max(0, Math.min(1, progress));

                if (progress > -0.2 && progress < 1.5) {
                    let isLeft;
                    if (isMobile) {
                        isLeft = index % 2 === 0;
                    } else {
                        isLeft = card.classList.contains('card-left');
                    }

                    // Translation plus grande pour partir de plus loin
                    const maxOffset = isMobile ? 250 : 500; 
                    const offset = (1 - clampedProgress) * maxOffset;

                    const xTranslation = isLeft ? -offset : offset;

                    (card as HTMLElement).style.transform = `translateX(${xTranslation}px)`;
                    (card as HTMLElement).style.opacity = '1';
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="projects">

        <div className="card-container-section" ref={containerRef}>
            <div className="card-rows-container">
                {pairs.map((pair, index) => (
                    <div key={index} className="card-row">
                        {pair.map((project, pIndex) => (
                            <div key={pIndex} className={`card-wrapper ${pIndex === 0 ? 'card-left' : 'card-right'}`}>
                                <Card
                                    title={project.title}
                                    description={project.desc}
                                    image={project.icon}
                                    stack={project.skills}
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
                        onClick={() => window.open(`https://${(content as any).footer[0].github}`, '_blank')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                >
                    <span className="text">
                        {(content as any)["projects-more-button"]}
                        <FaArrowRight className="button-icon"/>
                    </span>
                    <div className="wave-btn"></div>
                </motion.button>
            </div>
        </div>
            </section>

    );
};

export default CardContainer;
