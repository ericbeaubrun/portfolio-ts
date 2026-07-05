import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../Utils/LanguageContext.tsx";
import "./Skills.scss";

interface Skill {
    icon: string;
    name: string;
    years: number;
}

interface SkillCategory {
    name: string;
    skills: Skill[];
}

interface SkillsContent {
    title: string;
    year: string;
    years: string;
    categories: SkillCategory[];
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

const Skills: React.FC = () => {
    const { content } = useLanguage();
    const skillsContent = (content as { skills: SkillsContent }).skills;

    return (
        <div className="skills">
            {/*<h3 className="skills-title">{skillsContent.title}</h3>*/}

            <div className="skills-categories">
                {skillsContent.categories.map((category) => (
                    <div key={category.name} className="skills-category">
                        <h4 className="skills-category-title">{category.name}</h4>

                        <motion.div
                            className="skills-grid"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {category.skills.map((skill) => (
                                <motion.div
                                    key={skill.icon}
                                    className="skill-item"
                                    variants={itemVariants}
                                    whileHover={{ y: -6 }}
                                >
                                    <img
                                        className="skill-icon"
                                        src={`https://skillicons.dev/icons?i=${skill.icon}`}
                                        alt={skill.name}
                                        loading="lazy"
                                    />
                                    <span className="skill-name">{skill.name}</span>
                                    <span className="skill-years">
                                        {skill.years} {skill.years > 1 ? skillsContent.years : skillsContent.year}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
