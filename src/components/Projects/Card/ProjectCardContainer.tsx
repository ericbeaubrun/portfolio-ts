import {useIsMobile} from "../../Utils/MobileContext.tsx";
import {useLanguage} from "../../Utils/LanguageContext.tsx";
import {useEffect, useRef, useState} from "react";
import './ProjectCardContainer.scss';
import BubbleBackground from "../BubbleBackground.tsx";
import ProjectSubMap from "../ProjectSubMap.tsx";
import Banner from "../Banner.tsx";
import pIcon from "../../../assets/letters/p.png";
import rIcon from "../../../assets/letters/r.png";
import oIcon from "../../../assets/letters/o.png";
import jIcon from "../../../assets/letters/j.png";
import eIcon from "../../../assets/letters/e.png";
import cIcon from "../../../assets/letters/c.png";
import tIcon from "../../../assets/letters/t.png";
import sIcon from "../../../assets/letters/s.png";
import {Element} from "react-scroll";
import ProjectCard from "./ProjectCard.tsx";

const ProjectCardContainer = () => {
    const [activeDemo, setActiveDemo] = useState<string | null>(null);
    const isMobile = useIsMobile();
    const bannerLetters = [pIcon, rIcon, oIcon, jIcon, eIcon, cIcon, tIcon, sIcon];
    const {content} = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const [, setContainerHeight] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    let visibilityTimeout: NodeJS.Timeout | null = null;

    useEffect(() => {
        if (containerRef.current) {
            setContainerHeight(containerRef.current.clientHeight);
        }

        const handleScroll = () => {
            const container = containerRef.current;
            if (container) {
                const rect = container.getBoundingClientRect();
                const isElementVisible = rect.top < window.innerHeight && rect.bottom > 0;

                if (isElementVisible) {
                    if (!visibilityTimeout) {
                        visibilityTimeout = setTimeout(() => {
                            setIsVisible(true);
                        }, 550);
                    }
                } else {
                    if (visibilityTimeout) {
                        clearTimeout(visibilityTimeout);
                        visibilityTimeout = null;
                    }
                    setIsVisible(false);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (visibilityTimeout) {
                clearTimeout(visibilityTimeout);
            }
        };
    }, []);

    return (
        <div className="project-cards-container" ref={containerRef}>
            {/*<BubbleBackground/>*/}

            {/*{!isMobile && (*/}
            {/*    <ProjectSubMap projects={content.projects} isVisible={isVisible}/>*/}
            {/*)}*/}

            <div className="projects-banner-container">
                {/*<Banner images={bannerLetters}/>*/}
                <Banner text={content["projects-title"]} />
            </div>

            {content.projects.map((project, index) => (
                <Element
                    key={index}
                    name={project.name}
                    style={{
                        zIndex: activeDemo && activeDemo !== project.name ? 8 : 'auto',
                        position: 'relative'
                    }}
                >
                    <ProjectCard
                        name={project.name}
                        githubLink={project.gh}
                        demoLink={project.demo}
                        icon={project.icon}
                        title={project.title}
                        date={project.date}
                        description={project.desc}
                        skills={project.skills}
                        features={project.features}
                        setActiveDemo={setActiveDemo}
                        offsetDirection={index % 2 === 0 ? "left" : "right"}
                    />
                </Element>
            ))}
        </div>
    );
};

export default ProjectCardContainer;
