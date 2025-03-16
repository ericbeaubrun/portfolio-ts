import "./Footer.scss";
import {FaMapMarkerAlt} from 'react-icons/fa';
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaInfoCircle } from 'react-icons/fa';
import ContactFormModal from "./ContactFormModal.tsx";
import {useLanguage} from "../Utils/LanguageContext.tsx";

const Footer = () => {

    const { content } = useLanguage();

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
                            <FaInfoCircle size={28} style={{color: '#fff', marginRight: '10px'}}/>
                            {content.footer[0].title}
                        </h3>
                        <ul>
                            <li className="footer-coord">
                                <FaEnvelope style={{marginRight: '8px'}}/>
                                {content.footer[0].email}
                            </li>

                            <li className="footer-coord">
                                <FaPhone style={{marginRight: '8px'}}/>
                                {content.footer[0].tel}
                            </li>

                            <li className="footer-coord">
                                <FaGithub style={{marginRight: '8px'}}/>
                                <a href="https://github.com/ericbeaubrun" target="_blank" rel="noopener noreferrer">
                                    {content.footer[0].github}
                                </a>
                            </li>

                            <li className="footer-coord">
                                <FaLinkedin style={{marginRight: '8px'}}/>
                                <a href="https://www.linkedin.com/in/eric-adelaide-beaubrun/" target="_blank"
                                   rel="noopener noreferrer">
                                    {content.footer[0].linkedin}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-map-container">
                        <div className="footer-address">
                            <FaMapMarkerAlt size={28} style={{color: '#fff', marginRight: '10px'}}/>
                            <h3 className="footer-adr">{content.footer[1].address}</h3>
                        </div>

                        <div className="footer-map">
                            <iframe
                                title="Carte de localisation"
                                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21133.12500499004!2d2.609537118366446!3d48.54011847686785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5fa9169e4af3d%3A0x7832f51cfa36179b!2s77350%20Le%20M%C3%A9e-sur-Seine!5e0!3m2!1sfr!2sfr!4v1727944082285!5m2!1sfr!2sfr`}
                                width="100%"
                                height="200"
                                style={{
                                    border: 0,
                                    filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)'
                                }}
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="footer-form-btn-container">
                        {/*<h3 className="footer-contact-btn">{content.footer[2].title}</h3>*/}
                        {/*<button className="footer-button" type="button">*/}
                        {/*    {content.footer[2].btn}*/}
                        {/*</button>*/}
                        <ContactFormModal/>
                    </div>
                </div>

                <div className="footer__copyrights">
                    <p>
                        {content.footer[3].paragraph}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
