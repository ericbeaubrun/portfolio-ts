import React from "react";
import ProjectCardHeader from './ProjectCardHeader';
import ProjectCardSkills from './ProjectCardSkills';
import ProjectCardFooter from './ProjectCardFooter';
import {useIsMobile} from "../../Utils/MobileContext.tsx";
import './ProjectCard.scss';
import ProgressLine from "./ProgressLine.tsx";
import ProjectCardDemo from "./ProjectCardDemo.tsx";
import ProjectImageCarousel from "./ProjectImageCarousel.tsx";

interface ProjectCardProps {
    name: string;
    githubLink: string;
    demoLink: string;
    icon: string;
    title: string;
    date: string;
    description: string;
    skills: string[];
    images?: string[];
    features: string[];
    setActiveDemo: (name: string | null) => void;
    offsetDirection?: "left" | "right";
    hideMediaContent?: boolean;
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
                                                     offsetDirection = "right",
                                                     images = [],
                                                     hideMediaContent = false,
                                                 }) => {


    void features;
    void name;
    void setActiveDemo;
    void offsetDirection;

    const isMobile = useIsMobile();

    const offsetStyle = {
        // à retirer
        // transform: offsetDirection === "right" ? "translateX(10%)" : "translateX(-10%)"
    };

    const formatDemoLink = (link: string) => link.replace(/^https?:\/\//, '');

    return (
        <div className="project-card" style={offsetStyle}>
            <ProgressLine offset={-4} startFromCenter={true}/>

            <ProjectCardHeader icon={icon} title={title} date={date} description={description}/>

            <div className="project-card__content">

                <ProjectCardSkills skills={skills}/>

                {demoLink && !isMobile && !hideMediaContent && (
                    <>
                        {images && images.length > 0 ? (
                            <ProjectImageCarousel images={images}/>
                        ) : (
                            <ProjectCardDemo
                                name={name}
                                demoLink={demoLink}
                                isMobile={isMobile}
                                setActiveDemo={setActiveDemo}
                            />
                        )}
                    </>
                )}

                {/*{*/}
                {/*    isMobile && (*/}
                {/*        <>*/}
                {/*        </>*/}
                {/*    )*/}
                {/*}*/}
                {/*<hr className="line"/>*/}
            </div>

            <ProjectCardFooter demoLink={demoLink} githubLink={githubLink}/>
        </div>
    );
};

export default ProjectCard;
