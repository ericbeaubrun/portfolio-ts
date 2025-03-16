import React, {useEffect, useState} from 'react';
import {Element} from "react-scroll";
import './ProjectCardDemo.scss';
import {Link} from 'react-scroll';

interface ProjectCardDemoProps {
    name: string;
    demoLink: string;
    isMobile: boolean;
    setActiveDemo: (name: string | null) => void;
}

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

    // const DESKTOP_WIDTH = '50%';
    // const DESKTOP_HEIGHT = '60%';
    const DESKTOP_WIDTH = '60%';
    const DESKTOP_HEIGHT = '60%';

    const handleOverlayClick = () => {
        // scroller.scrollTo(name, {smooth: 'easeInOutQuart', delay: DELAY, duration: DURATION, offset: OFFSET});
        // setTimeout(() => {
        setIsOverlayVisible(false);
        setActiveDemo(name);
        setViewMode('desktop');
        // }, 0);
        // }, 250);
    }

    const leaveDemo = () => {
        setIsOverlayVisible(true);
        setActiveDemo(null);
        setViewMode('default');
    }

    useEffect(() => {
        if (!isOverlayVisible && !isMobile) {
            const scrollPosition = window.scrollY;
            document.body.style.position = 'fixed';

            document.body.style.top = `-${scrollPosition}px`;

            return () => {
                // setTimeout(() => {
                document.body.style.position = '';
                document.body.style.top = '';
                window.scrollTo(0, scrollPosition);
                // }, 200);
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
                // w = `60%`;
                // h = `50%`;
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

    return (
        <>
            {!isOverlayVisible && !isMobile && (
                <>
                    <div className="full-page-overlay" onClick={leaveDemo}></div>
                    <button className="close-preview-button"
                            onClick={leaveDemo}>
                        <img className="close-preview-icon" src="src/assets/close_preview.png" alt="close demo icon"/>
                    </button>
                </>
            )}


            <Element
                name={name}
                className={isOverlayVisible ? 'demo-iframe-container demo-active' : 'demo-iframe-container'}
            >
                {isOverlayVisible && !isMobile && (
                    <Link
                        // to={name}
                        smooth={true}
                        duration={DURATION}
                        offset={OFFSET}
                        className="project-link"
                    >
                        <div className='click-to-interact-btn' onClick={handleOverlayClick}>
                            <span id='click-to-interact-text'>Click to interact</span>
                        </div>
                    </Link>
                )}

                {!isOverlayVisible && (
                    <div className="view-mode-buttons">
                        <button onClick={() => setViewMode('mobile')}>
                            <img src="src/assets/mobile.png" alt="mobile icon"/>
                        </button>
                        <button onClick={() => setViewMode('desktop')}>
                            <img src="src/assets/desktop.png" alt="desktop icon"/>
                        </button>
                        <button onClick={() => setIframeKey(prevKey => prevKey + 1)}>
                            <img src="src/assets/refresh.png" alt="refresh icon"/>
                        </button>
                        <button onClick={() => window.open(demoLink)}>
                            <img src="src/assets/link.png" alt="full demo icon"/>
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
        </>
    );
};

export default ProjectCardDemo;
