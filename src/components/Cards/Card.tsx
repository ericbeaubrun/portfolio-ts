import React, {useRef, useEffect} from 'react';
import './Card.scss';

interface CardProps {
    title: string;
    description: string;
    image: string;
    stack: { [key: string]: string };
}

const Card: React.FC<CardProps> = ({title, description, image, stack}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const animationFrameId = useRef<number>();

    const currentTranslateY = useRef(0);
    const targetTranslateY = useRef(0);

    const updateScroll = () => {
        const lerpFactor = 0.025;

        currentTranslateY.current += (targetTranslateY.current - currentTranslateY.current) * lerpFactor;

        if (Math.abs(targetTranslateY.current - currentTranslateY.current) < 0.1) {
            currentTranslateY.current = targetTranslateY.current;
            if (imageRef.current) {
                imageRef.current.style.transform = `translateY(-${currentTranslateY.current}px)`;
            }
            animationFrameId.current = undefined;
            return;
        }

        if (imageRef.current) {
            imageRef.current.style.transform = `translateY(-${currentTranslateY.current}px)`;
        }

        animationFrameId.current = requestAnimationFrame(updateScroll);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current || !imageRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const containerHeight = rect.height;
        const imageHeight = imageRef.current.clientHeight;

        const maxScroll = Math.max(0, imageHeight - containerHeight);

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
                <img
                    src={image}
                    alt={title}
                    className="card-image"
                    ref={imageRef}
                />
            </div>

            <div className="card-content">
                <h3 className="card-title">{title}</h3>

                <div className="card-stack">
                    {Object.entries(stack).map(([key, skillName]) => (
                        <div key={key} className="stack-item">
                            <img
                                src={`/assets/skills/light/${key}.svg`}
                                alt={`${skillName} icon`}
                                className="stack-icon"
                                onError={(e) => (e.currentTarget.style.display = 'none')}
                            />
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
