import {useEffect, useRef} from "react";
import profilePicture from "/assets/profile_picture0.png";
import arrowIcon from "/assets/arrow_dark.png";
import "./Presentation.scss";
import gsap from "gsap";
import ContactButtons from "./ContactButtons.tsx";
import {useLanguage} from "../Utils/LanguageContext.tsx";
import {Link} from "react-scroll";

const Presentation = () => {
    const refH1 = useRef<HTMLHeadingElement>(null);
    const refH2 = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const contactBtnRef = useRef<HTMLButtonElement>(null);

    const {content} = useLanguage();

    const presentationContent = (content as {
        title: string,
        subtitle: string,
        introduction: { p1: string, p2: string }
    });


    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (imageRef.current) {
                gsap.to(imageRef.current?.parentElement, {
                    y: -scrollY * 0.4,
                    ease: "power2.out",
                    duration: 0.5,
                });
            }

            gsap.to(refH1.current, {
                y: -scrollY * 0.27,
                ease: "power2.out",
                duration: 0.1,
            });

            gsap.to(refH2.current, {
                y: -scrollY * 0.22,
                ease: "power2.out",
                duration: 0.1,
            });

            gsap.to(contactBtnRef.current, {
                y: -scrollY * 0.2,
                ease: "power2.out",
                duration: 0.1,
            });


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
            <video
                autoPlay
                loop
                muted
                playsInline
                className="background-video"
            >
                <source src="/assets/video.mp4" type="video/mp4"/>
                Votre navigateur ne supporte pas la vidéo.
            </video>
            <div className="area">
                <div className="profile-picture-container">
                    <img
                        ref={imageRef}
                        id="profile-picture"
                        src={profilePicture}
                        alt="Photos de profil"
                    />
                </div>

                <h1 ref={refH1} id="presentation-title">
                    {presentationContent.title}
                </h1>

                <h2 ref={refH2} id="presentation-subtitle">
                    {presentationContent.subtitle}
                </h2>

                <Link
                    to="contact"
                    smooth={true}
                    duration={1000}
                    offset={0}
                    className="contact-link"
                >
                    <button ref={contactBtnRef} className="shadowed contact-me-button">
                        {(content as any).contact_button || "Contacter"}
                    </button>
                </Link>

                <ContactButtons/>
            </div>

            {/*<Link*/}
            {/*    to={"services"}*/}
            {/*    smooth={true}*/}
            {/*    duration={1000}*/}
            {/*    offset={0}*/}
            {/*    className=""*/}
            {/*>*/}
            {/*    <div className="scroll-indicator" ref={scrollIndicatorRef}>*/}
            {/*        <img className="scroll-indicator-img" src={arrowIcon} alt="Arrow down"/>*/}
            {/*    </div>*/}
            {/*</Link>*/}
        </section>
    );
};

export default Presentation;
