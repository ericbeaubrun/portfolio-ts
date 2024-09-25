import './App.scss'
import {Element} from 'react-scroll';
import Navbar from "./components/Navbar.tsx";
import Presentation from "./components/Presentation.tsx";
import {LocomotiveScrollProvider} from "react-locomotive-scroll";
import {useEffect, useRef} from "react";
import Competences from "./components/Competences.tsx";
import Timeline from "./components/Timeline.tsx";
import Lenis from 'lenis';
import ScrollProgressCircle from "./utils/ScrollProgressCircle.tsx";
import CardContainer from "./components/ProjectCarousel.tsx";
import DashedLine from "./components/DashedLine.tsx";

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
        <LocomotiveScrollProvider
            // options={{
            // smooth: true,
            // ... all available Locomotive Scroll instance options
            // smartphone: {
            //     smooth: true,
            // },
            // tablet: {
            //     smooth: true,
            // },
            // el: containerRef.current,
            // }}
            // watch={
            //     [
            //..all the dependencies you want to watch to update the scroll.
            //  Basicaly, you would want to watch page/location changes
            //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
            // ]
            // }
            containerRef={containerRef}
        >


            <main ref={containerRef}>
                <header>
                    <ScrollProgressCircle/>
                    <Navbar/>
                </header>

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
                    <DashedLine direction={"right"}/>
                    <section id="projets">
                        {/*<h1 className="projects-title">Mes Projets</h1>*/}
                        <CardContainer/>

                        {/*<CircleCarousel/>*/}
                    </section>
                    <DashedLine direction={"left"}/>
                </Element>

                <Element name="experiences" className="section">
                    <section id="experiences">
                        <Timeline/>
                    </section>
                </Element>

                <footer>
                    <Element name="contact" className="section">
                        <section id="contact">
                        </section>
                    </Element>
                </footer>
            </main>
        </LocomotiveScrollProvider>
    )
}

export default App


