import React, {useRef, useEffect} from 'react';
import {FaGithub} from 'react-icons/fa';
import './Card.scss';

interface CardProps {
    title: string;
    description: string;
    media: string | string[];
    stack: { [key: string]: string };
    githubUrl?: string;
    demoUrl?: string;
}

const Card: React.FC<CardProps> = ({title, description, media, stack, githubUrl, demoUrl}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mediaWrapperRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number>();

    const currentTranslateY = useRef(0);
    const targetTranslateY = useRef(0);

    const mediaArray = Array.isArray(media) ? media : [media];

    const getMediaType = (src: string) => {
        const ext = src.split('.').pop()?.toLowerCase();
        if (ext === 'mp4' || ext === 'webm' || ext === 'ogg') return 'video';
        return 'image';
    };

    const updateScroll = () => {
        const lerpFactor = 0.025;

        currentTranslateY.current += (targetTranslateY.current - currentTranslateY.current) * lerpFactor;

        if (Math.abs(targetTranslateY.current - currentTranslateY.current) < 0.1) {
            currentTranslateY.current = targetTranslateY.current;
            if (mediaWrapperRef.current) {
                mediaWrapperRef.current.style.transform = `translateY(-${currentTranslateY.current}px)`;
            }
            animationFrameId.current = undefined;
            return;
        }

        if (mediaWrapperRef.current) {
            mediaWrapperRef.current.style.transform = `translateY(-${currentTranslateY.current}px)`;
        }

        animationFrameId.current = requestAnimationFrame(updateScroll);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || !mediaWrapperRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const containerHeight = rect.height;
        const mediaHeight = mediaWrapperRef.current.clientHeight;

        const maxScroll = Math.max(0, mediaHeight - containerHeight);

        const mouseRatio = Math.min(Math.max(mouseY / containerHeight, 0), 1);

        targetTranslateY.current = mouseRatio * maxScroll;

        if (!animationFrameId.current) {
            animationFrameId.current = requestAnimationFrame(updateScroll);
        }
    };

    const handleMouseLeave = () => {
        targetTranslateY.current = 0;

        if (!animationFrameId.current) {
            animationFrameId.current = requestAnimationFrame(updateScroll);
        }
    };

    useEffect(() => {
        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <div className="card">
            <div
                className="card-image-container"
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div className="media-wrapper" ref={mediaWrapperRef}>
                    {mediaArray.map((src, index) => {
                        const type = getMediaType(src);
                        if (type === 'video') {
                            return (
                                <video
                                    key={index}
                                    src={src}
                                    className="card-media"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                />
                            );
                        }
                        return (
                            <img
                                key={index}
                                src={src}
                                alt={`${title} - ${index}`}
                                className="card-media"
                            />
                        );
                    })}
                </div>

                {demoUrl && (
                    <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="demo-button"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src="/assets/external-link.svg" alt="External Link" className="button-icon" />
                        <span className="cta-text">Demo</span>
                    </a>
                )}

                {githubUrl && (
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-button"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FaGithub />
                        <span className="cta-text">GitHub</span>
                    </a>
                )}
            </div>

            <div className="card-content">
                <h3 className="card-title">{title}</h3>

                <div className="card-stack">
                    {Object.entries(stack).map(([key, skillName]) => (
                        <div key={key} className="stack-item">
                            <span className="stack-name">{skillName}</span>
                        </div>
                    ))}
                </div>

                <p className="card-description">{description}</p>
            </div>
        </div>
    );
};

export default Card;
