import React, {useEffect, useRef} from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./ProgressLine.scss";

gsap.registerPlugin(ScrollTrigger);

interface ProgressLineProps {
    rotation?: number;
    direction?: "left" | "right";
    offset?: number;
    startFromCenter?: boolean;
}

const ProgressLine: React.FC<ProgressLineProps> = ({
                                                       rotation = 0,
                                                       direction = "left",
                                                       offset = 0,
                                                       startFromCenter = false,
                                                   }) => {
    const lineRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (lineRef.current && containerRef.current) {
            let transformOrigin: string;
            if (startFromCenter) {
                transformOrigin = "center";
            } else {
                if (direction === "right") {
                    transformOrigin = "right";
                } else {
                    transformOrigin = "left";
                }
            }

            gsap.fromTo(
                lineRef.current,
                {scaleX: 0},
                {
                    scaleX: 0.75,
                    ease: "none",
                    transformOrigin: transformOrigin,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        }
    }, [direction, startFromCenter]);

    return (
        <div
            ref={containerRef}
            className="progress-container"
            style={{
                transform: `rotate(${rotation}deg)`,
                top: `${offset}px`,
            }}
        >
            <div
                ref={lineRef}
                className="progress-line"
                style={{
                    transformOrigin: startFromCenter
                        ? "center"
                        : direction,
                }}
            />
        </div>
    );
};

export default ProgressLine;
