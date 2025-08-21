import React, {useRef} from "react";
import {motion, useInView} from "framer-motion";
import "./ProjectCardFooter.scss";

interface ProjectCardFooterProps {
    demoLink: string;
    githubLink: string;
}

const buttonVariants = {
    hiddenLeft: {opacity: 0, x: -350},
    hiddenRight: {opacity: 0, x: 350},
    visible: {opacity: 1, x: 0, transition: {type: "spring", stiffness: 150, damping: 17, duration: 0.5}}
};

const ProjectCardFooter: React.FC<ProjectCardFooterProps> = ({demoLink, githubLink}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {once: true, amount: 0.3});

    return (
        <div ref={ref} className="project-card__footer">
            <motion.a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shadowed project-card-demo-btn"
                initial="hiddenLeft"
                animate={isInView ? "visible" : "hiddenLeft"}
                variants={buttonVariants}
                whileHover={{
                    y: -2,
                    boxShadow: "6px 6px 0px black",
                    transition: {duration: 0.15}
                }}
            >
                <svg className="project-card-link__icon" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                {demoLink === "" ? "Demo" : demoLink.replace("http://", "")}
            </motion.a>

            <motion.a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shadowed project-card-gh-btn"
                initial="hiddenRight"
                animate={isInView ? "visible" : "hiddenRight"}
                variants={buttonVariants}
                whileHover={{
                    y: -2,
                    boxShadow: "6px 6px 0px black",
                    transition: {duration: 0.15}
                }}
            >
                {/*<img id="github-icon" src={githubIcon} alt="GitHub icon"/>*/}
                {/*<svg className="project-card-github__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24"*/}
                {/*     viewBox="0 0 24 24">*/}
                {/*    <path*/}
                {/*        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>*/}
                {/*</svg>*/}
                <svg className="project-card-github__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"
                     width="480px" height="480px">
                    <path
                        d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"/>
                </svg>
                GitHub
            </motion.a>
        </div>
    );
};

export default ProjectCardFooter;
