import React from 'react';
import './ProjectCardFeatures.scss';

interface ProjectCardFeaturesProps {
    features: string[];
}

const ProjectCardFeatures: React.FC<ProjectCardFeaturesProps> = ({features}) => {
    return (
        <div className="project-card__section">
            <ul className="project-card__feature-list">
                {features.map((feature, index) => (
                    <li key={index} className="project-card__feature-item">{feature}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectCardFeatures;
