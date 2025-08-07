import './ContactButtons.scss';
import gsap from "gsap";
import {useEffect, useRef} from "react";

const ContactButtons = () => {

    const CV_URL = '/cv.pdf';
    const GH_URL = 'https://github.com/ericbeaubrun';
    const LINKEDIN_URL = 'https://www.linkedin.com/in/eric-adelaide-beaubrun/';

    const refBtnLinkedin = useRef<HTMLButtonElement>(null);
    const refBtnGithub = useRef<HTMLButtonElement>(null);
    const refBtnCV = useRef<HTMLButtonElement>(null);


    const openInTab: boolean = true;

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            gsap.to(refBtnLinkedin.current, {
                y: -scrollY * 0.14,
                ease: 'power2.out',
                duration: 0.5,
            });

            gsap.to(refBtnGithub.current, {
                y: -scrollY * 0.12,
                ease: 'power2.out',
                duration: 0.5,
            });

            gsap.to(refBtnCV.current, {
                y: -scrollY * 0.10,
                ease: 'power2.out',
                duration: 0.5,
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const ROOT = '/assets/';

    return (
        <div className="presentation-button-container">

            <button
                onClick={() => openInTab ? window.open(LINKEDIN_URL) : window.location.href = LINKEDIN_URL}
                ref={refBtnLinkedin}
                className="shadowed header-contact-button linkedin-btn">
                <img src={ROOT + "linkedin.png"} alt="Linkedin Icon" className="header-contact-button-icon "/>
                <span className="presentation-button-text">LinkedIn</span>
            </button>

            <button
                onClick={() => openInTab ? window.open(GH_URL, '_blank') : window.location.href = GH_URL}
                ref={refBtnGithub}
                className="shadowed header-contact-button github-btn">
                <img src={ROOT + "github.png"} alt="Github Icon" className="header-contact-button-icon "/>
                <span className="presentation-button-text">GitHub</span>
            </button>

            <button onClick={() => openInTab ? window.open(CV_URL) : window.location.href = CV_URL} ref={refBtnCV}
                    className="shadowed header-contact-button cv-btn">
                <img src={ROOT + "cv.png"} alt="CV Icon" className="header-contact-button-icon "/>
                <span className="presentation-button-text">CV</span>
            </button>

        </div>
    );
};

export default ContactButtons;
