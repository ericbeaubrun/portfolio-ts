import './Competences.scss';
import CompetenceButtons from "./CompetenceButtons.tsx";
import {motion} from "framer-motion";

const Competences = () => {
    return (
        <>
            <div className="wave"></div>
            <div className="text-presentation-container">
                {/*<h2 id="paragraph-text-header">{content.introduction.title}</h2>*/}
                {/*<div className={"stars-divider-container"}>*/}
                {/*    <img src="/resources/stars.png" alt="Stars divider" className="stars-divider"/>*/}
                {/*</div>*/}
                {/*<ParagraphPresentation text={text_presentation1} direction={"left"}/>*/}
                {/*<ParagraphPresentation text={text_presentation2} direction={"right"}/>*/}
                {/*<h2 className="titre-presentation">Pour plus de détails...</h2>*/}

                <div className="services-container">

                    <motion.div
                        initial={{opacity: 0, y: -40}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        viewport={{once: true}}
                        className="service-card">
                        <div className="icon uiux-icon"/>
                        <h3>UI/UX Design</h3>
                        <p>
                            An effective UI/UX is what captures attention and spreads a clear
                            message. I make sure the design is innovative and neat with all of
                            this.
                        </p>
                    </motion.div>

                    <div className="separator"/>

                    <motion.div
                        initial={{opacity: 0, y: -30}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.4, delay: 0.4}}
                        viewport={{once: true}}
                        className="service-card">
                        <div className="icon webdev-icon"/>
                        <h3>Web Development</h3>
                        <p>
                            If you are looking for a developer who'll take over the research and
                            development of your website, I am a well-established professional to
                            help you with this.
                        </p>
                    </motion.div>

                    <div className="separator"/>
                    <motion.div
                        initial={{opacity: 0, y: -20}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.2, delay: 0.6}}
                        viewport={{once: true}}
                        className="service-card">
                        <div className="icon appdev-icon"/>
                        <h3>App Development</h3>
                        <p>
                            If you are looking for a user-friendly app that will attract more
                            mobile users, I can help you design and build a platform with the
                            latest and trendiest look and feel.
                        </p>
                    </motion.div>
                </div>
            </div>
            <div className={"competences-container"}>
                <CompetenceButtons/>
                <div className="svg-animation-container">
                    <h1> Hello World !</h1>
                </div>
            </div>
            <div className="wave-reverse"></div>
        </>
    );
};

export default Competences;
