import './App.scss'
import {Element} from 'react-scroll';
import {animateScroll} from 'react-scroll';
import React, {MutableRefObject, useEffect, useRef} from "react";
import Navbar from "./components/Navbar/Navbar.tsx";
import Presentation from "./components/Presentation/Presentation.tsx";
import Services from "./components/Competences/Services.tsx";
import Lenis from 'lenis';
import ScrollProgressCircle from "./components/ScrollProgressCircle.tsx";
import Footer from "./components/Footer/Footer.tsx";
import ProfileStats from "./components/ProfileStats.tsx";
import SkillsSection from "./components/Competences/SkillsSection.tsx";
import ScrollingText from "./components/Competences/ScrollingText.tsx";
import "./Carousel.scss";
import ProjectCardContainer from "./components/Projects/Card/ProjectCardContainer.tsx";
import ContactFormModal from "./components/Footer/ContactFormModal.tsx";
import {useIsMobile} from "./components/Utils/MobileContext.tsx";


const App = () => {


    const lenis = new Lenis()
    const isMobile = useIsMobile();

    useEffect(() => {

        const raf = (time: number) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        };

        requestAnimationFrame(raf)
    }, [])


    useEffect(() => {
        const sections = document.querySelectorAll('.section');

        const handleScroll = () => {
            let maxVisibleSectionId = '';
            let maxVisibleArea = 0;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();

                const sectionElement = section.querySelector('section');

                const sectionId = sectionElement?.getAttribute('id') || '';

                const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

                const visibleArea = Math.max(0, visibleHeight);

                if (visibleArea > maxVisibleArea) {
                    maxVisibleArea = visibleArea;
                    maxVisibleSectionId = sectionId;
                }
            });

            const navItems = document.querySelectorAll('[data-target]');
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });

            if (maxVisibleSectionId) {
                const navItem = document.querySelector(`[data-target="${maxVisibleSectionId}"]`);
                if (navItem) {
                    navItem.classList.add('active');
                }
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

    const containerRef: MutableRefObject<null> = useRef(null);

    return (
        <div ref={containerRef}>
            <header>
                {!isMobile && (<ScrollProgressCircle lenis={lenis}/>)}
                <Navbar lenis={lenis}/>
            </header>

            <main>
                <Element name="presentation" className="section">
                    <section id="presentation">
                        <Presentation/>
                    </section>
                </Element>


                <Element name="services" className="section">
                    <section id="services">
                        <Services/>
                    </section>
                </Element>

                <Element name="projets" className="section">
                    <section id="projets">
                        <ProjectCardContainer/>
                        {/*<ShowMoreButton/>*/}
                        <ProfileStats/>
                    </section>
                </Element>

                <Element name="competences" className="section">
                    <section id="competences">
                        <ScrollingText
                            text={"ux | Technologies | Frameworks | Libraries | Langages | Environnements | Outils | " +
                                "Débogage | Tests | Déploiement | Optimisation | Gestion de contenu | Modélisation | ui/"}
                            speed={2.5} direction={'right'}/>
                        <SkillsSection/>
                        <ContactFormModal/>
                    </section>
                </Element>
            </main>

            <footer>
                <Element name="contact" className="section">
                    <section id="contact">
                        <Footer/>
                    </section>
                </Element>
            </footer>
        </div>
    );
};

export default App;

