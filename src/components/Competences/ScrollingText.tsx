import React from 'react';
import './ScrollingText.scss';

interface ScrollingTextProps {
    text: string;
    speed?: number;
    direction?: 'left' | 'right';
}

const ScrollingText: React.FC<ScrollingTextProps> = ({ text, speed = 50 , direction='right'}) => {

    const animationName = direction === 'left' ? 'scroll-left' : 'scroll-right';

    return (
        <div className={`scrolling-wrapper ${animationName}`} >
            <div
                className={`scrolling-content ${animationName}`}
                style={{animationDuration: `${100 / speed}s`}}
            >
                <span className="first-scolling-span">{text}</span>
                <span className="second-scolling-span">{text}</span>
            </div>
        </div>
    );
};

export default ScrollingText;
