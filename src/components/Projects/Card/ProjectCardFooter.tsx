import React, {useRef} from "react";
import {motion, useInView} from "framer-motion";
import githubIcon from "/assets/github2.png";
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
                className="shadowed project-card__button"
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
                {demoLink.replace("http://", "")}
            </motion.a>

            <motion.a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shadowed project-card__button"
                initial="hiddenRight"
                animate={isInView ? "visible" : "hiddenRight"}
                variants={buttonVariants}
                whileHover={{
                    y: -2,
                    boxShadow: "6px 6px 0px black",
                    transition: {duration: 0.15}
                }}
            >
                <img id="github-icon" src={githubIcon} alt="GitHub icon"/>
                GitHub
            </motion.a>
        </div>
    );
};

export default ProjectCardFooter;
