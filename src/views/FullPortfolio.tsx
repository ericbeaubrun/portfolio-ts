import '../App.scss'
import {Element} from 'react-scroll';
import {animateScroll} from 'react-scroll';
import {useEffect, useRef, useState} from "react";
import Navbar from "../components/Navbar/Navbar.tsx";
import Presentation from "../components/Presentation/Presentation.tsx";
import About from "../components/About/About.tsx";
// Section Services débranchée — décommenter l'import et le bloc <Element name="services"> pour la réactiver
// import Services from "../components/Services/Services.tsx";
import ProjectsGrid from "../components/Projects/ProjectsGrid.tsx";
import Lenis from 'lenis';
import {useLanguage} from "../components/Utils/useLanguage.ts";
import Footer from "../components/Footer/Footer.tsx";

/**
 * Portfolio complet : scroll narratif piloté par Lenis, sections plein écran.
 * Chargé en `lazy()` depuis App pour que la vue simple n'embarque ni Lenis,
 * ni GSAP, ni framer-motion.
 */
const FullPortfolio = () => {

    const [lenis, setLenis] = useState<Lenis | null>(null);
    const {content} = useLanguage();
    const [activeSection, setActiveSection] = useState('presentation');
    const activeSectionRef = useRef('presentation');

    useEffect(() => {
        const instance = new Lenis();
        let rafId: number;
        let isPublished = false;
        const raf = (time: number) => {
            if (!isPublished) {
                isPublished = true;
                setLenis(instance);
            }
            instance.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            instance.destroy();
        };
    }, []);


    useEffect(() => {
        const sections = document.querySelectorAll('.section');

        const handleScroll = () => {
            let maxVisibleSectionId = '';
            let maxVisibleArea = 0;
            const mainElement = document.querySelector('main');
            const mainRect = mainElement?.getBoundingClientRect();

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionElement = section.querySelector('section');
                const sectionId = sectionElement?.getAttribute('id') || '';

                let visibleArea: number;
                if (sectionId === 'footer' && mainRect) {
                    // Le footer est révélé quand le contenu du main remonte
                    visibleArea = Math.max(0, window.innerHeight - mainRect.bottom);
                } else {
                    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
                    visibleArea = Math.max(0, visibleHeight);
                }

                if (visibleArea > maxVisibleArea) {
                    maxVisibleArea = visibleArea;
                    maxVisibleSectionId = sectionId;
                }
            });

            if (maxVisibleSectionId && maxVisibleSectionId !== activeSectionRef.current) {
                activeSectionRef.current = maxVisibleSectionId;
                setActiveSection(maxVisibleSectionId);
            }
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        const saveScrollPosition = () => {
            sessionStorage.setItem("scrollPosition", String(window.scrollY));
        };

        window.addEventListener("beforeunload", saveScrollPosition);

        return () => {
            window.removeEventListener("beforeunload", saveScrollPosition);
        };
    }, []);

    useEffect(() => {
        const savedPosition = sessionStorage.getItem("scrollPosition");

        if (savedPosition) {
            animateScroll.scrollTo(parseInt(savedPosition), {
                duration: 1000,
                smooth: "easeInOutQuart",
            });
        }
    }, []);

    return (
        <div>
            <header>
                <Navbar lenis={lenis} activeSection={activeSection}/>
            </header>

            <main style={{position: 'relative', zIndex: 10, backgroundColor: '#0a0a0a', marginBottom: '200vh'}}>
                <Element name="presentation" className="section">
                    <Presentation/>
                </Element>

                <Element name="about" className="section">
                    <About/>
                </Element>

                {/*<Element name="services" className="section">*/}
                {/*    <Services lenis={lenis}/>*/}
                {/*</Element>*/}

                <Element name="projects" className="section">
                    <ProjectsGrid
                        projects={content.projects}
                        title={content["projects-title"]}
                        lenis={lenis}
                    />
                </Element>

            </main>

            <Element name="footer" className="section">
                <footer style={{position: 'fixed', bottom: 0, left: 0, width: '100%', height: '100vh', zIndex: 1}}>
                    <Footer lenis={lenis}/>
                </footer>
            </Element>
        </div>
    );
};

export default FullPortfolio;
