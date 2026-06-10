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
    const targetVelocity = useRef(0);
    const currentVelocity = useRef(0);

    const updateScroll = () => {
        const lerpFactor = 0.05;
        currentVelocity.current += (targetVelocity.current - currentVelocity.current) * lerpFactor;

        if (Math.abs(currentVelocity.current) < 0.01 && targetVelocity.current === 0) {
            currentVelocity.current = 0;
            animationFrameId.current = undefined;
            return;
        }

        const containerHeight = containerRef.current?.clientHeight || 0;
        const imageHeight = imageRef.current?.clientHeight || 0;
        const maxScroll = Math.max(0, imageHeight - containerHeight);

        currentTranslateY.current += currentVelocity.current;

        if (currentTranslateY.current < 0) {
            currentTranslateY.current = 0;
            currentVelocity.current = 0;
        } else if (currentTranslateY.current > maxScroll) {
            currentTranslateY.current = maxScroll;
            currentVelocity.current = 0;
        }

        if (imageRef.current) {
            imageRef.current.style.transform = `translateY(-${currentTranslateY.current}px)`;
        }

        animationFrameId.current = requestAnimationFrame(updateScroll);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const h = rect.height;
        const triggerZone = 0.3;

        const maxSpeed = 1.75;

        if (y < h * triggerZone) {
            // Velocity negative for up
            const intensity = 1 - (y / (h * triggerZone));
            targetVelocity.current = -intensity * maxSpeed;
        } else if (y > h * (1 - triggerZone)) {
            // Velocity positive for down
            const intensity = (y - h * (1 - triggerZone)) / (h * triggerZone);
            targetVelocity.current = intensity * maxSpeed;
        } else {
            targetVelocity.current = 0;
        }

        if (!animationFrameId.current) {
            animationFrameId.current = requestAnimationFrame(updateScroll);
        }
    };

    const handleMouseLeave = () => {
        targetVelocity.current = 0;
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
                <p className="card-description">{description}</p>
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
            </div>
        </div>
    );
};

export default Card;
