import "./Footer.scss";
import {FaMapMarkerAlt} from 'react-icons/fa';
import {FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaInfoCircle} from 'react-icons/fa';
import {useLanguage} from "../Utils/LanguageContext.tsx";
import {useState} from "react";
import {motion} from "framer-motion";

interface FooterBlock0 {
    title: string;
    email: string;
    tel: string;
    github: string;
    linkedin: string;
}

interface FooterBlock1 {
    address: string;
}

interface FooterBlock2 {
    title: string;
    btn: string;
}

interface FooterBlock3 {
    paragraph: string;
}

type FooterContent = [FooterBlock0, FooterBlock1, FooterBlock2, FooterBlock3];


const Footer = () => {
    const [mapInteractive, setMapInteractive] = useState(false);
    const {content} = useLanguage();

    const footer = (content as { footer: FooterContent }).footer;

    const handleMapClick = () => {
        if (!mapInteractive) {
            setMapInteractive(true);
        }
    };

    return (
        <footer className="footer">
            <div className="footer__parralax">
                <div className="footer__parralax-secondplan"/>
                <div className="footer__parralax-premierplan"/>
            </div>
            <div className="container">
                <div className="footer__content">
                    <div className="footer-links-container">
                        <h3 className="footer-coord">
                            <FaInfoCircle className="title-icon"/>
                            <p className="footer-content">{footer[0].title}</p>
                        </h3>

                        <ul>
                            <motion.li 
                                className="footer-coord"
                                initial={{ x: -30, opacity: 1 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                whileHover={{ 
                                    x: 6,
                                    transition: { duration: 0 }
                                }}
                                transition={{ duration: 0.075, delay: 0}}
                                viewport={{ once: false }}
                            >
                                <FaEnvelope className="coord-icon"/>
                                <a id="footer-email" className="footer-content">{footer[0].email}</a>
                            </motion.li>

                            <motion.li 
                                className="footer-coord"
                                initial={{ x: -30, opacity: 1 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                whileHover={{ 
                                    x: 6,
                                    transition: { duration: 0 }
                                }}
                                transition={{ duration: 0.075, delay: 0.1 }}
                                viewport={{ once: false }}
                            >
                                <FaPhone className="coord-icon"/>
                                <a id="footer-tel" className="footer-content">{footer[0].tel}</a>
                            </motion.li>

                            <motion.li 
                                className="footer-coord"
                                initial={{ x: -30, opacity: 1 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                whileHover={{ 
                                    x: 6,
                                    transition: { duration: 0 }
                                }}
                                transition={{ duration: 0.075, delay: 0.2 }}
                                viewport={{ once: false }}
                            >
                                <FaGithub className="coord-icon"/>
                                <a href="https://github.com/ericbeaubrun"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   id="footer-github"
                                   className="footer-content"
                                >
                                    {footer[0].github}
                                </a>
                            </motion.li>

                            <motion.li 
                                className="footer-coord"
                                initial={{ x: -30, opacity: 1 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                whileHover={{ 
                                    x: 6,
                                    transition: { duration: 0 }
                                }}
                                transition={{ duration: 0.075, delay: 0.3 }}
                                viewport={{ once: false }}
                            >
                                <FaLinkedin className="coord-icon"/>
                                <a href="https://www.linkedin.com/in/eric-adelaide-beaubrun/"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   id="footer-linkedin"
                                   className="footer-content"
                                >
                                    {footer[0].linkedin}
                                </a>
                            </motion.li>
                        </ul>
                    </div>

                    <div className="footer-map-container">
                        <div className="footer-address">
                            <FaMapMarkerAlt className="map-icon"/>
                            <h3 className="footer-adr">{footer[1].address}</h3>
                        </div>

                        <div className="footer-map">
                            <div className="map-container">
                                <iframe
                                    title="Carte de localisation"
                                     src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21133.12500499004!2d2.609537118366446!3d48.54011847686785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5fa9169e4af3d%3A0x7832f51cfa36179b!2s77350%20Le%20M%C3%A9e-sur-Seine!5e0!3m2!1sfr!2sfr!4v1727944082285!5m2!1sfr!2sfr`}
                                    width="100%"
                                    style={{
                                        border: 0,
                                        filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)',
                                        pointerEvents: mapInteractive ? 'auto' : 'none'
                                    }}
                                    allowFullScreen
                                    loading="lazy"
                                />
                                {!mapInteractive && (
                                    <div className="map-overlay" onClick={handleMapClick}>
                                        <div className="map-overlay-content">
                                            <span className="click-to-interact-text">Click to interact</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
