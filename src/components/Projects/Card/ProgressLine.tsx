import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./ProgressLine.css";

gsap.registerPlugin(ScrollTrigger);

interface ProgressLineProps {
    rotation?: number; // Angle de rotation en degrés
    direction?: "left" | "right"; // Direction du dessin de la ligne
}

const ProgressLine: React.FC<ProgressLineProps> = ({ rotation = 0, direction = "left" }) => {
    const lineRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lineRef.current && containerRef.current) {
            gsap.fromTo(
                lineRef.current,
                { scaleX: 0 }, // Départ compressé (0%)
                {
                    scaleX: 1,
                    ease: "none",
                    transformOrigin: direction === "right" ? "right" : "left", // Origine du dessin
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        }
    }, [direction]);

    return (
        <div
            ref={containerRef}
            className="progress-container"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <div ref={lineRef} className="progress-line" style={{ transformOrigin: direction }} />
        </div>
    );
};

export default ProgressLine;
