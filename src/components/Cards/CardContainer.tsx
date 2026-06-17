import React from 'react';
import Card from './Card';
import './CardContainer.scss';

import {FaArrowRight} from 'react-icons/fa';
import {useLanguage} from "../Utils/LanguageContext.tsx";

import {motion} from 'framer-motion';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import ScrollingBand from "./ScrollingBand.tsx";

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
                    isLeft = (card as HTMLElement).classList.contains('card-left');
                }

                const maxOffset = isMobile ? 250 : 500;
                const initialX = isLeft ? -maxOffset : maxOffset;

                gsap.set(card, {x: initialX, opacity: 0});

                gsap.to(card, {
                    x: 0,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom",
                        end: "top 40%",
                        scrub: true,
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [projects]);

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

            <ScrollingBand/>
        </section>

    );
};


export default CardContainer;
