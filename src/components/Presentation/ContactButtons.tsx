import './ContactButtons.scss';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {useLayoutEffect, useRef} from "react";

gsap.registerPlugin(ScrollTrigger);

const ContactButtons = () => {

    const CV_URL = '/cv.pdf';
    const GH_URL = 'https://github.com/ericbeaubrun';
    const LINKEDIN_URL = 'https://www.linkedin.com/in/eric-adelaide-beaubrun/';

    const refBtnLinkedin = useRef<HTMLButtonElement>(null);
    const refBtnGithub = useRef<HTMLButtonElement>(null);
    const refBtnCV = useRef<HTMLButtonElement>(null);


    const openInTab: boolean = true;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#presentation",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                }
            });

            if (refBtnLinkedin.current) {
                timeline.to(refBtnLinkedin.current, {
                    y: () => -window.innerHeight * 0.2,
                    ease: "none"
                }, 0);
            }

            if (refBtnGithub.current) {
                timeline.to(refBtnGithub.current, {
                    y: () => -window.innerHeight * 0.15,
                    ease: "none"
                }, 0);
            }

            if (refBtnCV.current) {
                timeline.to(refBtnCV.current, {
                    y: () => -window.innerHeight * 0.1,
                    ease: "none"
                }, 0);
            }
        });

        return () => ctx.revert();
    }, []);

    const ROOT = '/assets/';

    return (
        <div className="presentation-button-container">

            <button
                onClick={() => openInTab ? window.open(LINKEDIN_URL) : window.location.href = LINKEDIN_URL}
                ref={refBtnLinkedin}
                className="header-contact-button linkedin-btn">
                <img src={ROOT + "linkedin.png"} alt="Linkedin Icon" className="header-contact-button-icon "/>
                <span className="presentation-button-text">LinkedIn</span>
            </button>

            <button
                onClick={() => openInTab ? window.open(GH_URL, '_blank') : window.location.href = GH_URL}
                ref={refBtnGithub}
                className="header-contact-button github-btn">
                <img src={ROOT + "github.png"} alt="Github Icon" className="header-contact-button-icon "/>
                <span className="presentation-button-text">GitHub</span>
            </button>

            <button onClick={() => openInTab ? window.open(CV_URL) : window.location.href = CV_URL} ref={refBtnCV}
                    className="header-contact-button cv-btn">
                <img src={ROOT + "cv.png"} alt="CV Icon" className="header-contact-button-icon "/>
                <span className="presentation-button-text">CV</span>
            </button>

        </div>
    );
};

export default ContactButtons;
