import React, { useState, useRef } from 'react';
import './ScrollingText.scss';

interface ScrollingTextProps {
    text: string;
    speed?: number;
    direction?: 'left' | 'right';
}

const ScrollingText: React.FC<ScrollingTextProps> = ({ text, speed = 50 , direction='right'}) => {
    const [cursorPosition,] = useState({ x: 0, y: 0 });
    const [isHovering,] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const animationName = direction === 'left' ? 'scroll-left' : 'scroll-right';

    // useEffect(() => {
    //     const handleMouseMove = (e: MouseEvent) => {
    //         if (wrapperRef.current && isHovering) {
    //             const rect = wrapperRef.current.getBoundingClientRect();
    //             setCursorPosition({
    //                 x: e.clientX - rect.left,
    //                 y: e.clientY - rect.top
    //             });
    //         }
    //     };
    //
    //     if (isHovering) {
    //         document.addEventListener('mousemove', handleMouseMove);
    //     }
    //
    //     return () => {
    //         document.removeEventListener('mousemove', handleMouseMove);
    //     };
    // }, [isHovering]);
    //
    // const handleMouseEnter = () => {
    //     setIsHovering(true);
    //     document.body.style.cursor = 'none';
    // };
    //
    // const handleMouseLeave = () => {
    //     setIsHovering(false);
    //     document.body.style.cursor = 'auto';
    // };

    return (
        <div
            className={`scrolling-wrapper ${animationName}`}
            ref={wrapperRef}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
        >
            <div
                className={`scrolling-content ${animationName}`}
                style={{animationDuration: `${100 / speed}s`}}
            >
                <span className="first-scolling-span">{text}</span>
                <span className="second-scolling-span">{text}</span>
            </div>

            {isHovering && (
                <div
                    className="custom-cursor"
                    style={{
                        left: `${cursorPosition.x}px`,
                        top: `${cursorPosition.y}px`
                    }}
                />
            )}
        </div>
    );
};

export default ScrollingText;
