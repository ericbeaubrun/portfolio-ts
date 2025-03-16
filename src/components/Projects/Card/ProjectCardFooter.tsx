import React from 'react';
import githubIcon from '../../../assets/github2.png';
import './ProjectCardFooter.scss';

interface ProjectCardFooterProps {
    demoLink: string;
    githubLink: string;
}

const ProjectCardFooter: React.FC<ProjectCardFooterProps> = ({demoLink, githubLink}) => {
    return (
        <div className="project-card__footer">
            <a href={demoLink} target="_blank" rel="noopener noreferrer" className="project-card__button">
                <svg className="project-card-link__icon" viewBox="0 0 24 24">
                    <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Live Demo
            </a>
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="project-card__button">
                <img id='github-icon' src={githubIcon} alt='GitHub icon'/>
                Repository
            </a>
        </div>
    );
};

export default ProjectCardFooter;
