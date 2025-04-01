import React, {useEffect, useRef} from "react";
import profilePicture from "../../assets/profile_picture.png";
import arrowIcon from "../../assets/arrow_dark.png"; // <-- ajoutez votre icône ici
import "./Presentation.scss";
import gsap from "gsap";
import ContactButtons from "./ContactButtons.tsx";
import {useLanguage} from "../Utils/LanguageContext.tsx";
import {Link} from "react-scroll";

const Presentation = () => {
    const refH1 = useRef<HTMLHeadingElement>(null);
    const refH2 = useRef<HTMLHeadingElement>(null);
    const refP = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const rectangleRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);

    const {content} = useLanguage();

    useEffect(() => {
        // Animation parallax au scroll
        const handleScroll = () => {
            const scrollY = window.scrollY;

            gsap.to(refH1.current, {
                y: -scrollY * 0.35,
                ease: "power2.out",
                duration: 0.1,
            });

            gsap.to(refH2.current, {
                y: -scrollY * 0.15,
                ease: "power2.out",
                duration: 0.1,
            });

            gsap.to(imageRef.current, {
                x: scrollY * 0.15,
                // x: scrollY * 0.28, TODO
                ease: "power2.out",
                duration: 0.5,
            });

            gsap.to(refP.current, {
                y: -scrollY * 0.1,
                ease: "power2.out",
                duration: 0.5,
            });

            if (rectangleRef.current) {
                gsap.to(rectangleRef.current, {
                    x: scrollY * 0.15,
                    // x: scrollY * 0.2, TODO
                    ease: "power2.out",
                    duration: 0.5,
                });
            }

            if (scrollIndicatorRef.current) {
                gsap.to(scrollIndicatorRef.current, {
                    autoAlpha: scrollY > 50 ? 0 : 1,
                    duration: 0.3,
                });
            }
        };

        window.addEventListener("scroll", handleScroll);

        gsap.to(".scroll-indicator-img", {
            y: 7.5,
            rotation: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 1.2,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section id="presentation">
            <div className="area">
                <ul className="circles">
                    {Array.from({length: 10}).map((_, index) => (
                        <li key={index}></li>
                    ))}
                </ul>

                <div className="left-section">
                    <h1 ref={refH1} id="presentation-title">
                        {content.title}
                    </h1>

                    <h2 ref={refH2} id="presentation-subtitle">
                        {content.subtitle}
                    </h2>

                    <p ref={refP} className="presentation-paragraph">
                        {content.introduction.p1}
                        <br/>
                        {content.introduction.p2}
                    </p>

                    <ContactButtons/>
                </div>

                <div className="right-section">
                    <img
                        ref={imageRef}
                        id="profile-picture"
                        src={profilePicture}
                        alt="Photos de profil"
                    />
                </div>
                <div className="rotating-rectangle" ref={rectangleRef}/>
            </div>

            <div className="wave"/>

            {/* Indicateur de scroll */}
            <Link
                to={"services"}
                smooth={true}
                duration={1000}
                offset={0}
                className=""
            >
                <div className="scroll-indicator" ref={scrollIndicatorRef}>
                    <img className="scroll-indicator-img" src={arrowIcon} alt="Arrow down"/>
                </div>
            </Link>
        </section>
    );
};

export default Presentation;
