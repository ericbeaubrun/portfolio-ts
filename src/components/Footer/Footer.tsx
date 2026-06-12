import React, {useLayoutEffect, useRef} from 'react';
import './Footer.scss';
import {useLanguage} from "../Utils/LanguageContext.tsx";
import {FaGithub, FaEnvelope, FaLinkedin, FaPhone} from 'react-icons/fa';
import ContactForm from "./ContactForm.tsx";
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
    const {content} = useLanguage();
    const footerContent = content.footer as any[];

    const details = footerContent[0];
    const modification = footerContent[2];

    const sectionRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Overall timeline linked to the 200vh margin
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "main",
                    start: "bottom bottom",
                    end: "+=200%",
                    scrub: 1,
                }
            });

            // Phase 1: Vertical Reveal (0 to 100vh)
            // We hold the position at 0% to let the links be fully revealed vertically
            tl.to(wrapperRef.current, {x: '0%', duration: 1});

            // Phase 2: Horizontal Slide (100vh to 200vh)
            // We slide to -50% to show the contact form
            tl.to(wrapperRef.current, {
                x: '-50%',
                ease: "power2.inOut", // Pour une transition plus marquée
                duration: 1
            });

            // Parallax layers follow a similar logic but with their own timing
            const tlBg = gsap.timeline({
                scrollTrigger: {
                    trigger: "main",
                    start: "bottom bottom",
                    end: "+=200%",
                    scrub: 1,
                }
            });

            // Parallax pendant la révélation (Vertical)
            tlBg.fromTo('.footer-bg-layer.back', {y: '30%', x: '5%'}, {y: '0%', x: '-5%', duration: 1});
            tlBg.fromTo('.footer-bg-layer.front', {y: '60%', x: '10%'}, {y: '0%', x: '-15%', duration: 1});

            // Parallax pendant le glissement (Horizontal)
            tlBg.to('.footer-bg-layer.back', {x: '-20%', duration: 1});
            tlBg.to('.footer-bg-layer.front', {x: '-50%', duration: 1}, "<");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="footer-pin-section" ref={sectionRef}>
            <div className="footer-viewport">
                {/* Background layers for parallax */}
                {/*<div className="footer-bg-layer back">*/}
                {/*    <img src="/assets/footer_second_plan.png" alt="" />*/}
                {/*</div>*/}
                <div className="footer-bg-layer front">
                    <img src="/assets/footer_premier_plan.png" alt=""/>
                </div>

                <div className="footer-horizontal-wrapper" ref={wrapperRef}>
                    <div className="footer-section links-section">
                        <div className="footer-content">
                            <ul className="footer-list">
                                <li>
                                    <a href={`mailto:${details.email}`} data-hover={details.email}>
                                        <FaEnvelope className="footer-icon"/>
                                        <span className="footer-text">Adresse Mail</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`tel:${details.tel}`} data-hover={details.tel}>
                                        <FaPhone className="footer-icon"/>
                                        <span
                                            className="footer-text">{useLanguage().language === 'fr' ? 'Téléphone' : 'Phone'}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://${details.linkedin}`} target="_blank" rel="noopener noreferrer"
                                       data-hover={`${details.linkedin}`}>
                                        <FaLinkedin className="footer-icon"/>
                                        <span className="footer-text">Linkedin</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://${details.github}`} target="_blank" rel="noopener noreferrer"
                                       data-hover={`${details.github}`}>
                                        <FaGithub className="footer-icon"/>
                                        <span className="footer-text">Github</span>
                                    </a>
                                </li>


                                {/*<li className="footer-date">*/}
                                {/*    {modification.paragraph}*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    </div>

                    <div className="footer-section contact-section">
                        <ContactForm/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
