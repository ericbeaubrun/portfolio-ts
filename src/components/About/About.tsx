import React, { useLayoutEffect, useRef } from 'react';
import Banner from '../Projects/Banner.tsx';
import './About.scss';
import { useLanguage } from "../Utils/LanguageContext.tsx";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
    const { content } = useLanguage();
    const presentationContent = (content as { introduction: { p1: string, p2: string } });
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const words = containerRef.current?.querySelectorAll('.word');

            if (words && words.length > 0) {
                gsap.to(words,
                    {
                        opacity: 1,
                        stagger: 0.1,
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 95%",
                            end: "bottom 70%",
                            scrub: true,
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const splitText = (text: string) => {
        return text.split(' ').map((word, index) => (
            <span key={index} className="word">
                {word}
            </span>
        )).reduce((acc, curr, i) => i === 0 ? [curr] : [...acc, ' ', curr], [] as any[]);
    };

    return (
        <section id="about">
            <div className="about-container">
                <Banner text={(content as any)["about-title"]} />
                <div className="about-text-content" ref={containerRef}>
                    <p>{splitText(presentationContent.introduction.p1)}</p>
                    <p>{splitText(presentationContent.introduction.p2)}</p>
                </div>
            </div>
        </section>
    );
};

export default About;
