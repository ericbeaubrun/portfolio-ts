import React, {useEffect, useRef} from "react";
import gsap from "gsap";
import "./BubbleBackground.scss";

const CONFIG = [
    {size: 30 * 1.5, left: "40%", top: "55vh", parallaxSpeed: 0.16, rotationSpeed: 0.02},
    {size: 40, left: "5%", top: "75vh", parallaxSpeed: 0.15, rotationSpeed: 0.04},
    {size: 45 * 1.5, left: "15%", top: "40vh", parallaxSpeed: 0.14, rotationSpeed: 0.06},
    {size: 20 * 1.5, left: "90%", top: "30vh", parallaxSpeed: 0.12, rotationSpeed: 0.05},
    {size: 30 * 1.5, left: "10%", top: "10vh", parallaxSpeed: 0.10, rotationSpeed: 0.06},
    {size: 40 * 1.5, left: "30%", top: "20vh", parallaxSpeed: 0.08, rotationSpeed: 0.03},
    {size: 35 * 1.5, left: "70%", top: "25vh", parallaxSpeed: 0.04, rotationSpeed: 0.07},
    {size: 15 * 1.5, left: "55%", top: "95vh", parallaxSpeed: 0.02, rotationSpeed: 0.04},
    {size: 30 * 1.5, left: "70%", top: "140vh", parallaxSpeed: 0.18, rotationSpeed: 0.02},
    {size: 35 * 1.5, left: "20%", top: "220vh", parallaxSpeed: 0.13, rotationSpeed: 0.08},
    {size: 30 * 1.5, left: "55%", top: "150vh", parallaxSpeed: 0.14, rotationSpeed: 0.02},
    {size: 20 * 1.5, left: "80%", top: "140vh", parallaxSpeed: 0.12, rotationSpeed: 0.06},
    {size: 35 * 1.5, left: "30%", top: "168vh", parallaxSpeed: 0.10, rotationSpeed: 0.05},
    {size: 25 * 1.5, left: "85%", top: "85vh", parallaxSpeed: 0.08, rotationSpeed: 0.07},
    {size: 45 * 1.5, left: "80%", top: "200vh", parallaxSpeed: 0.06, rotationSpeed: 0.07},
    {size: 20 * 1.5, left: "10%", top: "220vh", parallaxSpeed: 0.05, rotationSpeed: 0.09},
    {size: 25 * 1.5, left: "15%", top: "175vh", parallaxSpeed: 0.04, rotationSpeed: 0.09},
    {size: 15 * 1.5, left: "50%", top: "210vh", parallaxSpeed: 0.03, rotationSpeed: 0.07},
    {size: 20 * 1.5, left: "90%", top: "150vh", parallaxSpeed: 0.02, rotationSpeed: 0.02},
];

const BubbleBackground: React.FC = () => {
    const bubbleContainerRef = useRef<HTMLDivElement>(null);
    const bubblesCreatedRef = useRef(false);

    useEffect(() => {
        const container = bubbleContainerRef.current;

        if (container && !bubblesCreatedRef.current) {

            CONFIG.forEach((config) => {
                const bubble = document.createElement("div");
                bubble.classList.add("bubble");
                bubble.style.width = `${config.size}px`;
                bubble.style.height = `${config.size}px`;
                bubble.style.left = config.left;
                bubble.style.top = config.top;
                container.appendChild(bubble);
            });

            bubblesCreatedRef.current = true;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const containerTop = container?.getBoundingClientRect().top || 0;

            CONFIG.forEach((config, index) => {
                const bubble = container?.children[index] as HTMLDivElement;
                if (bubble) {
                    const {parallaxSpeed, rotationSpeed} = config;
                    const offset = (scrollY - containerTop) * parallaxSpeed;
                    const rotationAngle = scrollY * rotationSpeed;

                    gsap.to(bubble, {
                        y: offset,
                        rotation: rotationAngle,
                        duration: 0.3,
                        ease: "power1.out",
                    });
                }
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return <div ref={bubbleContainerRef} className="bubble-container"/>;
};

export default BubbleBackground;
