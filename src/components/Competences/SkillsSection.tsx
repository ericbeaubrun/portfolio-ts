import "./Skills.scss";
import Skills from "./Skills";
import Slider from "react-slick";
import {PrevArrow, NextArrow} from '../Utils/CustomArrows.tsx';
import {useLanguage} from "../Utils/LanguageContext.tsx";
import {useIsMobile} from "../Utils/MobileContext.tsx";

export function SkillsSection() {

    const ROOT = "src/assets/skills/";

    const categoryIcons = [
        ROOT + "language.svg",
        ROOT + "frontend.svg",
        ROOT + "backend.svg",
        ROOT + "database.svg",
        ROOT + "design.svg",
        ROOT + "others.svg",
    ];

    const {content} = useLanguage();

    const skills = content.skills;

    const isMobile = useIsMobile();

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
                // Afficher le carousel pour écran mobile
                <Slider {...carouselSettings}>
                    {Object.entries(skills).map(([category, list], index) => (
                        <Skills
                            key={category}
                            title={category}
                            skills={list}
                            icon={categoryIcons[index]}
                        />
                    ))}
                </Slider>
            ) : (
                // Affichage en grille pour les écrans de plus grande taille
                <div className="skills-grid-container">
                    <div className="skills-grid">
                        {Object.entries(skills).map(([category, list], index) => (
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
}

export default SkillsSection;
