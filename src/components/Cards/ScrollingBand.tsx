import React, {useLayoutEffect, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './ScrollingBand.scss';

gsap.registerPlugin(ScrollTrigger);

interface ScrollingBandProps {
    words?: string[];
}

const ScrollingBand: React.FC<ScrollingBandProps> = ({
                                                         words = ["EXPRESS.JS", "DESIGN", "FULL-STACK", "REACT", "NODE.JS", "NEXT.JS", "TYPESCRIPT", "DATABASE", "API"]
                                                     }) => {
    const bandRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!bandRef.current) return;

        const ctx = gsap.context(() => {
            const target = bandRef.current?.querySelector('.band-content');
            if (target) {
                gsap.to(target, {
                    xPercent: -4, ease: "none",
                    scrollTrigger: {
                        trigger: bandRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    }
                });
            }
        }, bandRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="scrolling-band-container">
            <div className="scrolling-band" ref={bandRef}>
                <div className="band-content">
                    {Array(10).fill(words).flat().map((word, i) => (
                        <span key={i} className="band-word">{word}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollingBand;
