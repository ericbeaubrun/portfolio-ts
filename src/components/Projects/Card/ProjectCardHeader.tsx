import React from 'react';
import './ProjectCardHeader.scss';
import ProgressLine from "./ProgressLine.tsx";

interface ProjectCardHeaderProps {
    icon: string;
    title: string;
    date: string;
    description: string;
}

const ProjectCardHeader: React.FC<ProjectCardHeaderProps> = ({icon, title, date, description}) => {
    return (
        <div className="project-card__header">
            <div className="project-title-container">
                <img src={icon} alt={`${title} icon`} className="project-card__icon" />
                <h2 className="project-card__title">{title}</h2>
            </div>

            <p className="project-card__date">{date}</p>
            <p className="project-card__description">{description}</p>
        </div>
    );
};

export default ProjectCardHeader;
