import "./Skills.scss";
import Skills from "./Skills";
import Slider from "react-slick";
import {PrevArrow, NextArrow} from '../Utils/CustomArrows.tsx';
import {useLanguage} from "../Utils/LanguageContext.tsx";
import {useIsMobile} from "../Utils/MobileContext.tsx";

interface SkillList {
    [key: string]: string;
}

type SkillsMap = {
    [category: string]: SkillList;
};

export const SkillsSection = () => {
    const ROOT = "/assets/skills/";

    const categoryIcons = [
        ROOT + "language.svg",
        ROOT + "frontend.svg",
        ROOT + "backend.svg",
        ROOT + "database.svg",
        ROOT + "design.svg",
        ROOT + "others.svg",
    ];

    const { content } = useLanguage();
    const isMobile = useIsMobile();

    // On cast `content` en un objet qui a { skills: SkillsMap }
    const skillsMap = (content as { skills: SkillsMap }).skills;

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
    };

    return (
        <section className="skills-section">
            {isMobile ? (
                <Slider {...carouselSettings}>
                    {Object.entries(skillsMap).map(([category, list], index) => (
                        <Skills
                            key={category}
                            title={category}
                            skills={list}
                            icon={categoryIcons[index]}
                        />
                    ))}
                </Slider>
            ) : (
                <div className="skills-grid-container">
                    <div className="skills-grid">
                        {Object.entries(skillsMap).map(([category, list], index) => (
                            <Skills
                                key={category}
                                title={category}
                                skills={list}
                                icon={categoryIcons[index]}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default SkillsSection;
