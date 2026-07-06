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

const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.09,
            type: "spring",
            stiffness: 260,
            damping: 22,
        },
    }),
};

const Skills: React.FC = () => {
    const { content } = useLanguage();
    const skillsContent = (content as { skills: SkillsContent }).skills;

    // Running index shared across every category so the icons cascade in one
    // continuous sequence instead of each category appearing all at once.
    let order = 0;

    return (
        <div className="skills">
            {/*<h3 className="skills-title">{skillsContent.title}</h3>*/}

            <motion.div
                className="skills-categories"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
            >
                {skillsContent.categories.map((category) => (
                    <div key={category.name} className="skills-category">
                        <motion.h4
                            className="skills-category-title"
                            variants={itemVariants}
                            custom={order++}
                        >
                            {category.name}
                        </motion.h4>

                        <div className="skills-grid">
                            {category.skills.map((skill) => (
                                <motion.div
                                    key={skill.icon}
                                    className="skill-item"
                                    variants={itemVariants}
                                    custom={order++}
                                    whileHover={{ y: -6, scale: 1.03 }}
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
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Skills;
