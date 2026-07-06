import React, {useLayoutEffect, useRef, useState} from 'react';
import './Footer.scss';
import {useLanguage} from "../Utils/LanguageContext.tsx";
import ContactForm from "./ContactForm.tsx";
import ContactOverlay from "./ContactOverlay.tsx";
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
    const {content, language} = useLanguage();
    const footerContent = content.footer as any[];

    const details = footerContent[0];
    const sectionRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [overlayConfig, setOverlayConfig] = useState({
        isOpen: false,k
        title: '',
        value: '',
        themeColor: '#000'
    });

    const openOverlay = (e: React.MouseEvent, title: string, value: string, themeColor: string) => {
        e.preventDefault();
        setOverlayConfig({
            isOpen: true,
            title,
            value,
            themeColor
        });
    };

    const closeOverlay = () => {
        setOverlayConfig(prev => ({...prev, isOpen: false}));
    };

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "main",
                    start: "bottom bottom",
                    end: "+=200%",
                    scrub: 1,
                }
            });

            tl.to(wrapperRef.current, {x: '0%', duration: 1});

            tl.to(wrapperRef.current, {
                x: '-50%',
                ease: "power2.inOut",
                duration: 1
            });

            const tlBg = gsap.timeline({
                scrollTrigger: {
                    trigger: "main",
                    start: "bottom bottom",
                    end: "+=200%",
                    scrub: 1,
                }
            });

            tlBg.fromTo('.footer-bg-layer.back', {y: '30%', x: '5%'}, {y: '0%', x: '-5%', duration: 1});
            tlBg.fromTo('.footer-bg-layer.front', {y: '60%', x: '10%'}, {y: '0%', x: '-15%', duration: 1});
            tlBg.to('.footer-bg-layer.back', {x: '-20%', duration: 1});
            tlBg.to('.footer-bg-layer.front', {x: '-50%', duration: 1}, "<");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="footer" className="footer-pin-section" ref={sectionRef}>
            <div className="footer-viewport">
                <div className="footer-horizontal-wrapper" ref={wrapperRef}>
                    <div className="footer-section links-section">
                        <div className="footer-content">
                            <ul className="footer-list">
                                <li>
                                    <a href={`tel:${details.tel}`}
                                       onClick={(e) => openOverlay(e, language === 'fr' ? 'Téléphone' : 'Phone', details.tel, '#3dce6e')}
                                    >
                                        <img src="/assets/fleche-droite.svg" className="footer-arrow" alt=""/>
                                        <span
                                            className="footer-text">{language === 'fr' ? 'WhatsApp' : 'Phone'}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://${details.linkedin}`}
                                       target="_blank"
                                       rel="noopener noreferrer"
                                       onClick={(e) => openOverlay(e, 'Linkedin', details.linkedin, '#0077b5')}
                                    >
                                        <img src="/assets/fleche-droite.svg" className="footer-arrow" alt=""/>
                                        <span className="footer-text">Linkedin</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`mailto:${details.email}`}
                                       onClick={(e) => openOverlay(e, 'Email', details.email, '#e63946')}
                                    >
                                        <img src="/assets/fleche-droite.svg" className="footer-arrow" alt=""/>
                                        <span className="footer-text">Mail</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-section contact-section">
                        <ContactForm/>
                    </div>
                </div>
            </div>

            <ContactOverlay
                isOpen={overlayConfig.isOpen}
                onClose={closeOverlay}
                title={overlayConfig.title}
                value={overlayConfig.value}
                themeColor={overlayConfig.themeColor}
            />
        </section>
    );
};

export default Footer;
