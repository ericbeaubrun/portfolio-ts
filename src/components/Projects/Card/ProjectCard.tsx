import React from "react";
import ProjectCardHeader from './ProjectCardHeader';
import ProjectCardDemo from './ProjectCardDemo';
import ProjectCardSkills from './ProjectCardSkills';
import ProjectCardFooter from './ProjectCardFooter';
import {useIsMobile} from "../../Utils/MobileContext.tsx";
import './ProjectCard.scss';

interface ProjectCardProps {
    name: string;
    githubLink: string;
    demoLink: string;
    icon: string;
    title: string;
    date: string;
    description: string;
    skills: string[];
    images: string[];
    features: string[];
    setActiveDemo: (name: string | null) => void;
    offsetDirection?: "left" | "right";
}

const ProjectCard: React.FC<ProjectCardProps> = ({
                                                     name,
                                                     githubLink,
                                                     demoLink,
                                                     icon,
                                                     title,
                                                     date,
                                                     description,
                                                     skills,
                                                     features,
                                                     setActiveDemo,
                                                     offsetDirection = "right"
                                                 }) => {

    const isMobile = useIsMobile();

    const offsetStyle = {
        transform: offsetDirection === "right" ? "translateX(100px)" : "translateX(-100px)"
    };

    // const formatDemoLink = (link: string) => link.replace(/^https?:\/\//, '');

    return (
        <div className="project-card shadowed" style={offsetStyle}>

            <ProjectCardHeader icon={icon} title={title} date={date} description={description}/>

            <div className="project-card__content">

                {/*<hr className="line"/>*/}

                {/*<ProjectCardFeatures features={features}/>*/}

                {/*<hr className="line"/>*/}
                <ProjectCardSkills skills={skills}/>

                {demoLink && !isMobile && (
                    <>
                        {/*<div className={"demo-link-container"}>*/}
                        {/*    <a className={"demo-link"} href={demoLink}>{formatDemoLink(demoLink)}</a>*/}
                        {/*</div>*/}
                        <ProjectCardDemo
                            name={name}
                            demoLink={demoLink}
                            isMobile={isMobile}
                            setActiveDemo={setActiveDemo}/>
                    </>
                )}

                {
                    isMobile && (
                        <>
                        </>
                    )

                }
                {/*<hr className="line"/>*/}
            </div>

            <ProjectCardFooter demoLink={demoLink} githubLink={githubLink}/>
        </div>
    );
};

export default ProjectCard;
