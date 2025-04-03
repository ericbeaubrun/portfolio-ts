import {useLanguage} from "../../Utils/LanguageContext.tsx";
import {useEffect, useRef, useState} from "react";
import './ProjectCardContainer.scss';
import BubbleBackground from "../BubbleBackground.tsx";
import Banner from "../Banner.tsx";
import {Element} from "react-scroll";
import ProjectCard from "./ProjectCard.tsx";

export interface Project {
    title: string;
    name: string;
    date: string;
    desc: string;
    gh: string;
    demo: string;
    skills: string[];
    features: string[];
    icon: string;
}


const ProjectCardContainer = () => {

    const ROOT = '/assets/projects/';
    const images = [
        [ROOT + 'conquete1.gif', ROOT + 'conquete2.gif', ROOT + 'conquete3.gif', ROOT + 'conquete4.gif', ROOT + 'conquete5.gif', ROOT + 'conquete6.gif'],
        [ROOT + 'learn_py1.gif', ROOT + 'learn_py2.gif', ROOT + 'learn_py3.gif', ROOT + 'learn_py2.gif'],
        [ROOT + 'aerien1.gif', ROOT + 'aerien2.gif', ROOT + 'aerien3.gif', ROOT + 'aerien4.gif']
    ]

    const [activeDemo, setActiveDemo] = useState<string | null>(null);
    const {content} = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const [, setContainerHeight] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    void isVisible;
    // let visibilityTimeout: NodeJS.Timeout | null = null;
    let visibilityTimeout: ReturnType<typeof setTimeout> | null = null;

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

    const projects = (content as { projects: Project[] }).projects

    return (
        <div className="project-cards-container" ref={containerRef}>
            <BubbleBackground/>

            {/*{!isMobile && (*/}
            {/*    <ProjectSubMap projects={content.projects} isVisible={isVisible}/>*/}
            {/*)}*/}

            <div className="projects-banner-container">
                {/*<Banner images={bannerLetters}/>*/}
                <Banner text={content["projects-title"] as string}/>
            </div>

            {projects.map((project: Project, index: number) => (
                <Element
                    key={index}
                    name={project.name}
                    style={{
                        zIndex: activeDemo && activeDemo !== project.name ? 8 : 'auto',
                        position: 'relative'
                    }}
                >
                    {/*<ProgressLine*/}
                    {/*    rotation={index % 2 === 0 ? 2 : -2}*/}
                    {/*    direction={index % 2 === 0 ? "left" : "right"}*/}
                    {/*/>*/}
                    {/*<ProgressLine*/}
                    {/*    rotation={0}*/}
                    {/*    direction={index % 2 === 0 ? "right" : "left"}*/}
                    {/*    offset={0}*/}
                    {/*/>*/}

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
                        images={images[index]}
                    />

                    {/*<ProgressLine rotation={5}/>*/}
                </Element>
            ))}
        </div>
    );
};

export default ProjectCardContainer;
