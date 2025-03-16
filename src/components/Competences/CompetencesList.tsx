import { motion } from 'framer-motion';
import "./CompetencesList.scss"

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            duration: 1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ResumeProjectsBlock = ({ skills }: { skills: string[] }) => (
    <motion.div
        className="ResumeProjectsBlock-technologies"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        {skills.map((skill, index) => (
            <motion.div
                key={index}
                role="button"
                className="timeline-competence-container"
                variants={itemVariants}
            >
                <span className="project-skill">{skill}</span>
            </motion.div>
        ))}
    </motion.div>
);

export default ResumeProjectsBlock;
