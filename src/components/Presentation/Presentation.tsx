import {useLayoutEffect, useRef} from "react";
const profilePicture = "/assets/profile_picture0.png";
const arrowIcon = "/assets/arrow_dark.png";
import "./Presentation.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactButtons from "./ContactButtons.tsx";
import {useLanguage} from "../Utils/LanguageContext.tsx";
import {Link} from "react-scroll";

gsap.registerPlugin(ScrollTrigger);

const Presentation = () => {
    const refH1 = useRef<HTMLHeadingElement>(null);
    const refH2 = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const contactBtnRef = useRef<HTMLButtonElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const {content} = useLanguage();

    const presentationContent = (content as {
        title: string,
        subtitle: string,
        introduction: { p1: string, p2: string }
    });


    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (scrollIndicatorRef.current) {
                gsap.to(scrollIndicatorRef.current, {
                    scrollTrigger: {
                        trigger: "#presentation",
                        start: "top top",
                        end: "100px top",
                        scrub: true,
                    },
                    autoAlpha: 0,
                    ease: "none",
                });
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#presentation",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });

            if (imageRef.current?.parentElement) {
                timeline.to(imageRef.current.parentElement, {
                    y: () => -window.innerHeight * 0.4,
                    ease: "none"
                }, 0);
            }

            if (refH1.current) {
                timeline.to(refH1.current, {
                    y: () => -window.innerHeight * 0.27,
                    ease: "none"
                }, 0);
            }

            if (refH2.current) {
                timeline.to(refH2.current, {
                    y: () => -window.innerHeight * 0.22,
                    ease: "none"
                }, 0);
            }

            if (contactBtnRef.current) {
                timeline.to(contactBtnRef.current, {
                    y: () => -window.innerHeight * 0.2,
                    ease: "none"
                }, 0);
            }

            if (overlayRef.current) {
                timeline.to(overlayRef.current, {
                    opacity: 1,
                    ease: "none"
                }, 0);
            }
        });

        gsap.to(".scroll-indicator-img", {
            y: 7.5,
            rotation: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            duration: 1.2,
        });

        return () => ctx.revert();
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
            <div className="background-overlay" ref={overlayRef}></div>
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
                    <button ref={contactBtnRef} className="contact-me-button">
                        <span>{(content as any).contact_button || "Contacter"}</span>
                    </button>
                </Link>

                <ContactButtons/>
            </div>

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
