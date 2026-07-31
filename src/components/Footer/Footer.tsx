import React, {useLayoutEffect, useRef} from 'react';
import './Footer.scss';
import {useLanguage} from "../Utils/LanguageContext.tsx";
import ContactForm from "./ContactForm.tsx";
import ContactLinksAccordion from "./ContactLinks/ContactLinksAccordion.tsx";
import {buildContactItems} from "./ContactLinks/contactItems.ts";
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
    lenis: Lenis | null;
}

const Footer: React.FC<FooterProps> = ({lenis}) => {
    const {content, language} = useLanguage();
    const footerContent = content.footer as any[];

    const details = footerContent[0];
    const sectionRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const contactItems = buildContactItems(details, language);

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
                    <div className="footer-section contact-section">
                        <ContactForm/>
                    </div>

                    <div className="footer-section links-section">
                        <ContactLinksAccordion items={contactItems} lenis={lenis}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
