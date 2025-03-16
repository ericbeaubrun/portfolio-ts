import './Button.scss';
import {useLanguage} from "./Utils/LanguageContext.tsx";

const GithubButton = () => {

    const {content} = useLanguage();

    return (
        <div className="button-container">
            <button onClick={() => window.open('https://github.com/ericbeaubrun', '_blank')} className="contact-button">
                <div className="text">
                    {content["see-more-gh"]}
                    {/*<svg className="project-card-link__icon" viewBox="0 0 24 24">*/}
                    {/*    <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>*/}
                    {/*    <polyline points="15 3 21 3 21 9"></polyline>*/}
                    {/*    <line x1="10" y1="14" x2="21" y2="3"></line>*/}
                    {/*</svg>*/}
                </div>
                <div className="wave-btn"></div>
            </button>
        </div>
    );
};

export default GithubButton;
