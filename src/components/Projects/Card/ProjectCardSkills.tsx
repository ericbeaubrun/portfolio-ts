import React from 'react';
import './ProjectCardSkills.scss';

interface ProjectCardSkillsProps {
    skills: string[];
}

const ProjectCardSkills: React.FC<ProjectCardSkillsProps> = ({skills}) => {
    return (
        <div className="project-card__section">
            <div className="project-card__badge-container">
                {skills.map((skill, index) => (
                    <span key={index} className="project-card__badge">{skill}</span>
                ))}
            </div>
        </div>
    );
};

export default ProjectCardSkills;
