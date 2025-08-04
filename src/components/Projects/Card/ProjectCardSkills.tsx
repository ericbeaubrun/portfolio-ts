import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./ProjectCardSkills.scss";

interface ProjectCardSkillsProps {
    skills: string[];
}

const bounceEffect = {
    hidden: { opacity: 0, y: -20 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 12,
            duration: 0.5,
            delay: delay,
        },
    }),
};

const ProjectCardSkills: React.FC<ProjectCardSkillsProps> = ({ skills }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });

    return (
        <div ref={ref} className="project-card__section">
            <div className="project-card__badge-container">
                {skills.map((skill, index) => (
                    <motion.span
                        key={index}
                        className="project-card__badge"
                        custom={index * 0.1}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={bounceEffect}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

export default ProjectCardSkills;
