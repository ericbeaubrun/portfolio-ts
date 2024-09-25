import profilePicture from "../assets/profile_picture.png";
import content from '../content/presentation.json';
import "./Presentation.scss";
import  {useEffect, useRef} from "react";
import gsap from "gsap";
import {motion} from "framer-motion";

const Presentation = () => {

    const refH1 = useRef<HTMLHeadingElement>(null);
    const refH2 = useRef<HTMLHeadingElement>(null);
    const refP = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLHeadingElement>(null);

    const textBtn1 = "test";
    const textBtn2 = "test";
    const linkBtn1 = "test";
    const linkBtn2 = "test";

    const handleClick1 = () => {
        window.location.href = linkBtn1;
        window.scrollTo(0, 0);
    };

    const handleClick2 = () => {
        window.location.href = linkBtn2;
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            gsap.to(refH1.current, {
                y: -scrollY * 0.35,
                ease: 'power2.out',
                duration: 0.1,
            });

            gsap.to(refH2.current, {
                y: -scrollY * 0.15,
                ease: 'power2.out',
                duration: 0.1,
            });

            gsap.to(imageRef.current, {
                x: scrollY * 0.3, // Translation horizontale
                ease: 'power2.out',
                duration: 0.5,
            });

            gsap.to(refP.current, {
                y: -scrollY * 0.1, // Translation horizontale
                ease: 'power2.out',
                duration: 0.5,
            });
        };

        // Ajouter un écouteur sur le scroll
        window.addEventListener('scroll', handleScroll);

        // Nettoyer l'écouteur lorsque le composant est démonté
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section id="presentation" data-scroll-section>
            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>

                <div className="left-section">
                    <h1 ref={refH1} data-scroll data-scroll-speed="4.5" className="presentation-title">
                        {content.title}
                    </h1>

                    <h2 ref={refH2} data-scroll data-scroll-speed="6" className="presentation-subtitle">
                        {content.subtitle}
                    </h2>

                    <p ref={refP} data-scroll data-scroll-speed="1.5" className="presentation-paragraph">
                        {content.introduction.paragraph1}
                        <br/>
                        {content.introduction.paragraph2}
                    </p>

                    <p data-scroll data-scroll-speed="1.5"
                       className="presentation-paragraph">

                    </p>

                    <motion.div
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, delay: 0.2}}
                    >
                        <div className="buttonWrapper">
                            <button className="btn btn-dark" onClick={handleClick1}>{textBtn1}</button>
                            <button className="btn btn-light" onClick={handleClick2}>{textBtn2}</button>
                        </div>
                    </motion.div>
                </div>

                <div className="right-section">
                    <img ref={imageRef} data-scroll data-scroll-speed="-1.5" data-scroll-direction="horizontal"
                         id="profile-picture" src={profilePicture} alt="Photos de profil"/>
                </div>
            </div>
        </section>
    );
}

export default Presentation;
