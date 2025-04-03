import {useIsMobile} from "../../Utils/MobileContext.tsx";
import {useLanguage} from "../../Utils/LanguageContext.tsx";
import {useEffect, useRef, useState} from "react";
import './ProjectCardContainer.scss';
import BubbleBackground from "../BubbleBackground.tsx";
import Banner from "../Banner.tsx";
import {Element} from "react-scroll";
import ProjectCard from "./ProjectCard.tsx";

const ProjectCardContainer = () => {

    const ROOT = './src/assets/projects/';
    const images = [
        [ROOT + 'conquete1.gif', ROOT + 'conquete2.gif', ROOT + 'conquete3.gif', ROOT + 'conquete4.gif', ROOT + 'conquete5.gif', ROOT + 'conquete6.gif'],
        [ROOT + 'learn_py1.gif', ROOT + 'learn_py2.gif', ROOT + 'learn_py3.gif', ROOT + 'learn_py2.gif'],
        [ROOT + 'aerien1.gif', ROOT + 'aerien2.gif', ROOT + 'aerien3.gif', ROOT + 'aerien4.gif']
    ]

    const [activeDemo, setActiveDemo] = useState<string | null>(null);
    const isMobile = useIsMobile();
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
            <BubbleBackground/>

            {/*{!isMobile && (*/}
            {/*    <ProjectSubMap projects={content.projects} isVisible={isVisible}/>*/}
            {/*)}*/}

            <div className="projects-banner-container">
                {/*<Banner images={bannerLetters}/>*/}
                <Banner text={content["projects-title"]}/>
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
