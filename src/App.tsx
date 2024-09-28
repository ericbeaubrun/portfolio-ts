import './App.scss'
import {Element} from 'react-scroll';
import Navbar from "./components/Navbar.tsx";
import Presentation from "./components/Presentation.tsx";
import {useEffect, useRef} from "react";
import Competences from "./components/Competences.tsx";
import Timeline from "./components/Timeline.tsx";
import Lenis from 'lenis';
import ScrollProgressCircle from "./utils/ScrollProgressCircle.tsx";
import CardContainer from "./components/ProjectCarousel.tsx";
import AnimatedText from "./components/AnimatedText.tsx";

function App() {

    const containerRef = useRef(null);
    useEffect(() => {
        const lenis = new Lenis()

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    }, [])

    return (
        <div ref={containerRef}>
            <header>
                <ScrollProgressCircle/>
                <Navbar/>
            </header>

            <main>
                <Element name="presentation" className="section">
                    <Presentation/>

                </Element>

                <Element name="competences" className="section">
                    <section id="competences">
                        <Competences/>
                        {/*<div className="colored-background">*/}
                        {/*    <CompetenceButtons/>*/}
                        {/*</div>*/}
                    </section>
                </Element>

                <Element name="projets" className="section">
                    {/*<DashedLine direction={"right"}/>*/}
                    <section id="projets">
                        {/*<h1 className="projects-title">Mes Projets</h1>*/}
                        {/*<CardContainer/>*/}
                        {/*<CircleCarousel/>*/}
                    </section>
                    {/*<DashedLine direction={"left"}/>*/}
                </Element>

                <Element name="experiences" className="section">
                    <section id="experiences">
                        {/*<Timeline/>*/}
                    </section>
                </Element>
            </main>

            <footer>
                <Element name="contact" className="section">
                    <section id="contact">
                    </section>
                </Element>
            </footer>
        </div>


    )
}


export default App


