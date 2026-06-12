import './App.scss'
import {Element} from 'react-scroll';
import {animateScroll} from 'react-scroll';
import {MutableRefObject, useEffect, useRef, useState} from "react";
import Navbar from "./components/Navbar/Navbar.tsx";
import Presentation from "./components/Presentation/Presentation.tsx";
import About from "./components/About/About.tsx";
import CardContainer from "./components/Cards/CardContainer.tsx";
import Lenis from 'lenis';
import {useLanguage} from "./components/Utils/LanguageContext.tsx";
import Footer from "./components/Footer/Footer.tsx";

const App = () => {

    const [lenis, setLenis] = useState<Lenis | null>(null);
    const {content} = useLanguage();

    useEffect(() => {
        const instance = new Lenis();
        setLenis(instance);

        let rafId: number;
        const raf = (time: number) => {
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
                {/*{!isMobile && (<ScrollProgressCircle lenis={lenis}/>)}*/}
                <Navbar lenis={lenis}/>
            </header>

            <main style={{position: 'relative', zIndex: 10, backgroundColor: '#0a0a0a', marginBottom: '200vh'}}>
                <Element name="presentation" className="section">
                    <Presentation/>
                </Element>

                <Element name="about" className="section">
                    <About/>
                </Element>

                <Element name="projects" className="section">
                    <CardContainer projects={(content as any).projects || []}/>
                </Element>

                {/*<Element name="contact" className="section">*/}
                {/*    <ContactForm/>*/}
                {/*</Element>*/}

            </main>

            <footer style={{position: 'fixed', bottom: 0, left: 0, width: '100%', height: '100vh', zIndex: 1}}>
                <Footer/>
            </footer>
        </div>
    );
};

export default App;
