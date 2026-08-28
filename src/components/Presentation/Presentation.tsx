import {useLayoutEffect, useRef} from "react";
import "./Presentation.scss";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import ContactButtons from "./ContactButtons.tsx";
import {useLanguage} from "../Utils/useLanguage.ts";
import {useIsMobile} from "../Utils/useIsMobile.ts";
import {Link} from "react-scroll";

import {motion} from "framer-motion";
import {publicAssetUrl} from "../Utils/publicAssetUrl.ts";
import {navigateTo} from "../Utils/useHashRoute.ts";
import StarCursor from "./StarCursor.tsx";

const profilePicture = publicAssetUrl("assets/eric-adelaide-beaubrun.webp");
const profilePictureSrcSet = [
    `${publicAssetUrl("assets/eric-adelaide-beaubrun-160.webp")} 160w`,
    `${publicAssetUrl("assets/eric-adelaide-beaubrun-320.webp")} 320w`,
    `${profilePicture} 500w`,
].join(', ');
const arrowIcon = publicAssetUrl("assets/fleche-vers-le-bas.svg");

gsap.registerPlugin(ScrollTrigger);

const
    Presentation = () => {
        const refH1 = useRef<HTMLHeadingElement>(null);
        const refH2 = useRef<HTMLHeadingElement>(null);
        const imageRef = useRef<HTMLImageElement>(null);
        const scrollIndicatorRef = useRef<HTMLDivElement>(null);
        const contactBtnRef = useRef<HTMLButtonElement>(null);
        const overlayRef = useRef<HTMLDivElement>(null);
        const videoRef = useRef<HTMLVideoElement>(null);

        const {content} = useLanguage();
        const isMobile = useIsMobile();

        const presentationContent = content;

        const containerVariants = {
            hidden: {opacity: 0},
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.3,
                    delayChildren: 0.5,
                },
            },
        };

        const itemVariants = {
            hidden: {opacity: 0, y: 20},
            visible: {
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.8,
                    ease: "easeOut",
                },
            },
        };

        const profilePictureVariants = {
            hidden: {opacity: 0, y: 20, rotate: 2},
            visible: {
                opacity: 1,
                y: 0,
                rotate: 2,
                transition: {
                    duration: 0.8,
                    ease: "easeOut",
                },
            },
        };

        const contactButtonWrapperVariants = {
            hidden: {opacity: 0, y: 20, rotate: -2},
            visible: {
                opacity: 1,
                y: 0,
                rotate: -2,
                transition: {
                    duration: 0.8,
                    ease: "easeOut",
                },
            },
        };


        useLayoutEffect(() => {
            if (videoRef.current) {
                videoRef.current.defaultMuted = true;
                videoRef.current.muted = true;
                videoRef.current.play().catch(error => {
                    console.log("Autoplay bloqué par le navigateur :", error);
                });
            }

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
                        invalidateOnRefresh: true,
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

            gsap.to(".scroll-indicator", {
                y: 20,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                duration: 1,
            });

            return () => ctx.revert();
        }, []);

        return (
            <section id="presentation">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="background-video"
                    src={publicAssetUrl(isMobile ? "assets/videoLQ.webm" : "assets/videoHQ.mp4")}
                    poster={publicAssetUrl("assets/background.webp")}
                />
                <div className="background-overlay" ref={overlayRef}></div>
                <StarCursor/>
                <motion.div
                    className="area"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="profile-picture-container" variants={profilePictureVariants}>
                        <img
                            ref={imageRef}
                            id="profile-picture"
                            src={profilePicture}
                            srcSet={profilePictureSrcSet}
                            sizes="(max-width: 480px) 120px, (max-width: 768px) 150px, 200px"
                            width="500"
                            height="500"
                            decoding="async"
                            alt={presentationContent.profile_picture_alt || "Photo de profil de Eric Adelaide Beaubrun"}
                        />
                    </motion.div>

                    <motion.h1 ref={refH1} id="presentation-title" variants={itemVariants}>
                        {presentationContent.title}
                    </motion.h1>

                    <motion.h2 ref={refH2} id="presentation-subtitle" variants={itemVariants}>
                        {presentationContent.subtitle}
                    </motion.h2>

                    <motion.div variants={contactButtonWrapperVariants}>
                        <button
                            ref={contactBtnRef}
                            className="contact-me-button"
                            onClick={() => navigateTo('simple')}
                            style={{"--hover-text": `"${content.simple.button_hover}"`} as React.CSSProperties}
                        >
                            <span>{content.simple.button}</span>
                        </button>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <ContactButtons/>
                    </motion.div>
                </motion.div>

                <Link
                    to={"about"}
                    smooth={true}
                    duration={1000}
                    offset={300}
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
