import React, {useLayoutEffect, useRef} from 'react';
import './Footer.scss';
import { useLanguage } from "../Utils/LanguageContext.tsx";
import { FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import ContactForm from "./ContactForm.tsx";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
    const { content } = useLanguage();
    const footerContent = content.footer as any[];

    const details = footerContent[0];
    const modification = footerContent[2];

    const sectionRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // This timeline will handle the horizontal move and parallax
            // Trigger is 'main', and we start when its bottom hits viewport bottom
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "main",
                    start: "bottom bottom",
                    end: "+=200%", // Matches the 200vh margin-bottom in App.tsx
                    scrub: 1,
                }
            });

            // Phase 1: Reveal (Wait for the vertical reveal to complete)
            // The reveal happens over the first 100vh of the 200vh margin
            tl.to({}, { duration: 1 });

            // Phase 2: Horizontal Slide
            tl.to(wrapperRef.current, {
                x: '-50%',
                ease: 'none',
                duration: 1
            });

            // Parallax layers
            const tlBg = gsap.timeline({
                scrollTrigger: {
                    trigger: "main",
                    start: "bottom bottom",
                    end: "+=200%",
                    scrub: 1,
                }
            });

            // Parallax reveal during vertical reveal phase
            tlBg.fromTo('.footer-bg-layer.back', { y: '50%', x: '10%' }, { y: '0%', x: '-10%', duration: 1 });
            tlBg.fromTo('.footer-bg-layer.front', { y: '100%', x: '20%' }, { y: '0%', x: '-30%', duration: 1 });

            // Horizontal parallax during slide phase
            tlBg.to('.footer-bg-layer.back', {
                x: '-20%',
                ease: 'none',
                duration: 1
            });

            tlBg.to('.footer-bg-layer.front', {
                x: '-60%',
                ease: 'none',
                duration: 1
            }, "<");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="footer-pin-section" ref={sectionRef}>
            <div className="footer-viewport">
                {/* Background layers for parallax */}
                <div className="footer-bg-layer back">
                    <img src="/assets/footer_second_plan.png" alt="" />
                </div>
                <div className="footer-bg-layer front">
                    <img src="/assets/footer_premier_plan.png" alt="" />
                </div>

                <div className="footer-horizontal-wrapper" ref={wrapperRef}>
                    <div className="footer-section links-section">
                        <div className="footer-content">
                            <ul className="footer-list">
                                <li>
                                    <a href={`https://${details.github}`} target="_blank" rel="noopener noreferrer">
                                        <FaGithub className="footer-icon" />
                                        <span className="footer-text">Github</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`mailto:${details.email}`}>
                                        <FaEnvelope className="footer-icon" />
                                        <span className="footer-text">Mail</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://${details.linkedin}`} target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin className="footer-icon" />
                                        <span className="footer-text">Linkedin</span>
                                    </a>
                                </li>
                                <li className="footer-date">
                                    {modification.paragraph}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-section contact-section">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
