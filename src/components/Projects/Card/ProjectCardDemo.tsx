import React, {useEffect, useState, useRef} from 'react';
import {Element} from "react-scroll";
import {motion, useInView} from "framer-motion";
import './ProjectCardDemo.scss';
import {Link} from 'react-scroll';

interface ProjectCardDemoProps {
    name: string;
    demoLink: string;
    isMobile: boolean;
    setActiveDemo: (name: string | null) => void;
}

const demoVariants = {
    hidden: {opacity: 0, scale: 0.9, y: -20},
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {type: "spring", stiffness: 300, damping: 15, duration: 0.7}
    },
};


const ProjectCardDemo: React.FC<ProjectCardDemoProps> = ({name, demoLink, isMobile, setActiveDemo}) => {

    const [isOverlayVisible, setIsOverlayVisible] = useState(true);
    const [viewMode, setViewMode] = useState<'mobile' | 'desktop' | 'default'>('default');
    const [iframeKey, setIframeKey] = useState(0);
    const OFFSET = 200;
    const DURATION = 275;

    const DEFAULT_WIDTH = '100%';
    const DEFAULT_HEIGHT = '30vh';

    const MOBILE_WIDTH = '20%';
    const MOBILE_HEIGHT = '70%';

    const DESKTOP_WIDTH = '60%';
    const DESKTOP_HEIGHT = '60%';

    const handleOverlayClick = () => {
        setIsOverlayVisible(false);
        setActiveDemo(name);
        setViewMode('desktop');
    };

    const leaveDemo = () => {
        setIsOverlayVisible(true);
        setActiveDemo(null);
        setViewMode('default');
    };

    useEffect(() => {
        if (!isOverlayVisible && !isMobile) {
            const scrollPosition = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;

            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                window.scrollTo(0, scrollPosition);
            };
        }
    }, [isOverlayVisible, isMobile]);

    const getIframeStyle = () => {
        let w, h;
        switch (viewMode) {
            case 'mobile':
                w = MOBILE_WIDTH;
                h = MOBILE_HEIGHT;
                break;
            case 'desktop':
                w = DESKTOP_WIDTH;
                h = DESKTOP_HEIGHT;
                break;
            case 'default':
                w = DEFAULT_WIDTH;
                h = DEFAULT_HEIGHT;
                break;
        }

        return {
            pointerEvents: isOverlayVisible ? 'none' : 'auto',
            width: w,
            height: h,
            transition: 'width 0.2s ease-in-out'
        } as React.CSSProperties;
    };

    // Référence pour détecter la visibilité de la démo
    const demoRef = useRef(null);
    const isDemoInView = useInView(demoRef, {once: false, amount: 0.3});

    return (
        <>
            {!isOverlayVisible && !isMobile && (
                <>
                    <div className="full-page-overlay" onClick={leaveDemo}></div>
                    <button className="close-preview-button" onClick={leaveDemo}>
                        <img className="close-preview-icon" src="../../../../public/assets/close_preview.png" alt="close demo icon"/>
                    </button>
                </>
            )}

            {/* Wrapper avec animation rebondissante */}
            <motion.div
                ref={demoRef}
                variants={demoVariants}
                initial="hidden"
                animate={isDemoInView ? "visible" : "hidden"}
            >
                <Element
                    name={name}
                    className={isOverlayVisible ? 'demo-iframe-container demo-active' : 'demo-iframe-container'}
                >
                    {isOverlayVisible && !isMobile && (
                        // Test overlay to=""
                        <Link to="" smooth={true} duration={DURATION} offset={OFFSET} className="project-link">
                            <div className='click-to-interact-btn' onClick={handleOverlayClick}>
                                <span id='click-to-interact-text'>Click to interact</span>
                            </div>
                        </Link>
                    )}

                    {!isOverlayVisible && (
                        <div className="view-mode-buttons">
                            <button onClick={() => setViewMode('mobile')}>
                                <img src="../../../../public/assets/mobile.png" alt="mobile icon"/>
                            </button>
                            <button onClick={() => setViewMode('desktop')}>
                                <img src="../../../../public/assets/desktop.png" alt="desktop icon"/>
                            </button>
                            <button onClick={() => setIframeKey(prevKey => prevKey + 1)}>
                                <img src="../../../../public/assets/refresh.png" alt="refresh icon"/>
                            </button>
                            <button onClick={() => window.open(demoLink)}>
                                <img src="../../../../public/assets/link.png" alt="full demo icon"/>
                            </button>
                        </div>
                    )}

                    <iframe
                        key={iframeKey}
                        className={`demo-iframe ${!isOverlayVisible ? 'demo-iframe-expanded' : ''}`}
                        title={name}
                        src={demoLink}
                        style={getIframeStyle()}
                    />
                </Element>
            </motion.div>
        </>
    );
};

export default ProjectCardDemo;
