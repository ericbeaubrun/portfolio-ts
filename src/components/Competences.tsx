import './Competences.scss';
import CompetenceButtons from "./CompetenceButtons.tsx";
import {motion} from "framer-motion";
import content from "../content/competences.json";

const Competences = () => {

    const url = 'https://skillicons.dev/icons?theme=light&i=';

    const skillsBackEnd = [
        {
            icon: url + "java",
            startYear: content.backend.competence1.startYear,
            name: content.backend.competence1.name,
            description: content.backend.competence1.description
        },
        {
            icon: url + "py",
            startYear: content.backend.competence2.startYear,
            name: content.backend.competence2.name,
            description: content.backend.competence2.description
        },
        {
            icon: url + "spring",
            startYear: content.backend.competence3.startYear,
            name: content.backend.competence3.name,
            description: content.backend.competence3.description
        },
        {
            icon: url + "php",
            startYear: content.backend.competence4.startYear,
            name: content.backend.competence4.name,
            description: content.backend.competence4.description
        },
        {
            icon: url + "c",
            startYear: content.backend.competence5.startYear,
            name: content.backend.competence5.name,
            description: content.backend.competence5.description
        },
        {
            icon: url + "mysql",
            startYear: content.backend.competence6.startYear,
            name: content.backend.competence6.name,
            description: content.backend.competence6.description
        },
        // {
        //     icon: url + "postgres",
        //     startYear: content.backend.competence7.startYear,
        //     name: content.backend.competence7.name,
        //     description: content.backend.competence7.description
        // },
        // {
        //     icon: url + "nodejs",
        //     startYear: content.backend.competence8.startYear,
        //     name: content.backend.competence8.name,
        //     description: content.backend.competence8.description
        // },
    ];

    const skillsFrontEnd = [
        {
            icon: url + "html",
            startYear: content.frontend.competence1.startYear,
            name: content.frontend.competence1.name,
            description: content.frontend.competence1.description
        },
        {
            icon: url + "css",
            startYear: content.frontend.competence2.startYear,
            name: content.frontend.competence2.name,
            description: content.frontend.competence2.description
        },
        {
            icon: url + "js",
            startYear: content.frontend.competence3.startYear,
            name: content.frontend.competence3.name,
            description: content.frontend.competence3.description
        },
        {
            icon: url + "ts",
            startYear: content.frontend.competence7.startYear,
            name: content.frontend.competence7.name,
            description: content.frontend.competence7.description
        },
        {
            icon: url + "sass",
            startYear: content.frontend.competence6.startYear,
            name: content.frontend.competence6.name,
            description: content.frontend.competence6.description
        },
        {
            icon: url + "react",
            startYear: content.frontend.competence4.startYear,
            name: content.frontend.competence4.name,
            description: content.frontend.competence4.description
        },
        // {
        //     icon: url + "next",
        //     startYear: content.frontend.competence5.startYear,
        //     name: content.frontend.competence5.name,
        //     description: content.frontend.competence5.description
        // }, {
        //     icon: url + "vue",
        //     startYear: content.frontend.competence5.startYear,
        //     name: content.frontend.competence5.name,
        //     description: content.frontend.competence5.description
        // },


    ];

    const skillsSoftwares = [
        {
            icon: url + 'git',
            startYear: content.softwares.competence1.startYear,
            name: content.softwares.competence1.name,
            description: content.softwares.competence1.description
        },
        {
            icon: url + 'figma',
            startYear: content.softwares.competence2.startYear,
            name: content.softwares.competence2.name,
            description: content.softwares.competence2.description
        },
        {
            icon: url + 'idea',
            startYear: content.softwares.competence3.startYear,
            name: content.softwares.competence3.name,
            description: content.softwares.competence3.description
        },
        {
            icon: url + 'webstorm',
            startYear: content.softwares.competence4.startYear,
            name: content.softwares.competence4.name,
            description: content.softwares.competence4.description
        },
        {
            icon: url + 'notion',
            startYear: content.softwares.competence5.startYear,
            name: content.softwares.competence5.name,
            description: content.softwares.competence5.description
        },
        {
            icon: url + 'ps',
            startYear: content.softwares.competence6.startYear,
            name: content.softwares.competence6.name,
            description: content.softwares.competence6.description
        },
        // {
        //     icon: url + 'pr',
        //     startYear: content.softwares.competence7.startYear,
        //     name: content.softwares.competence7.name,
        //     description: content.softwares.competence7.description
        // },
    ];

    return (
        <>
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

                    <motion.div
                        initial={{opacity: 0, y: -60}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.7, delay: 0.3}}
                        viewport={{once: true}} className="separator">
                    </motion.div>

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

                    <motion.div
                        initial={{opacity: 0, y: -60}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.5}}
                        viewport={{once: true}}
                        className="separator">
                    </motion.div>

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
            <h2>Compétences Techniques</h2>

            <div className={"competences-container"}>
                <CompetenceButtons title1="Back-End"
                                   skills1={skillsBackEnd}
                                   title2="Front-End"
                                   skills2={skillsFrontEnd}
                                   isReverse={true}/>

                <CompetenceButtons title1="Back-End"
                                   skills1={skillsSoftwares}
                                   title2="Front-End"
                                   skills2={skillsBackEnd}
                                   isReverse={false}/>
                {/*<div className="svg-animation-container">*/}
                {/*    <h1> Hello World !</h1>*/}
                {/*</div>*/}
            </div>
            <div className="wave-reverse"></div>
        </>
    );
};

export default Competences;
