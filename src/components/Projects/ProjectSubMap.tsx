import React from 'react';
import {Link} from 'react-scroll';
import './ProjectSubMap.scss';

interface ProjectSubMapProps {
    projects: { name: string; icon: string; title: string }[];
    isVisible: boolean;
}

const ProjectSubMap: React.FC<ProjectSubMapProps> = ({projects, isVisible}) => {
    const OFFSET = -130;
    const DURATION = 500;

    return (
        <div className={`project-sub-map ${isVisible ? 'expand' : 'collapse'}`}>
            <ul>
                {projects.map((project) => (
                    <li key={project.name}>
                        <Link
                            to={project.name}
                            smooth={true}
                            duration={DURATION}
                            offset={OFFSET}
                            className="project-link"
                        >
                            <div className="project-content">
                                <img src={project.icon} alt={project.title} className="project-icon"/>
                                <p className="project-title">{project.name}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectSubMap;
