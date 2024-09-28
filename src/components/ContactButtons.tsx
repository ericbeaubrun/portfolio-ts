import './ContactButtons.scss';
import gsap from "gsap";
import {useEffect, useRef} from "react"; // Importation du fichier CSS


const ContactButtons = () => {



    const refBtnLinkedin = useRef<HTMLHeadingElement>(null);
    const refBtnGithub = useRef<HTMLHeadingElement>(null);
    const refBtnCV = useRef<HTMLHeadingElement>(null);

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

    return (
        <div className="presentation-button-container">
            <button ref={refBtnLinkedin} className="cta">
                <img src={"src/assets/linkedin.png"} alt="Plus icon"
                     className="presentation-button-icon"/>
                <span className="presentation-button-text">{"LinkedIn"}</span>
            </button>
            <button ref={refBtnGithub} className="cta">
                <img src={"src/assets/github.png"} alt="Plus icon"
                     className="presentation-button-icon"/>
                <span className="presentation-button-text">{"GitHub"}</span>
            </button>
            <button ref={refBtnCV} className="cta">
                <img src={"src/assets/cv.png"} alt="Plus icon" className="presentation-button-icon"/>
                <span className="presentation-button-text">{"CV.pdf"}</span>
            </button>
        </div>
    );
};

export default ContactButtons;
