import "./Banner.scss";
import {motion, useInView} from "framer-motion";
import React, {useRef} from "react";

interface BannerProps {
    text: string;
}

const bounceEffect = {
    hidden: {opacity: 0, y: -75},
    visible: ([delay, rotation]: [number, number]) => ({
        opacity: 1,
        y: 0,
        rotate: rotation,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 11,
            duration: 0.1,
            delay: delay / 2,
        },
    }),
};

const rotations = [2.3, -3.5, 2.5, -3.7, 2.7, -3.2];

const BannerLetter = ({letter, delay, index}: { letter: string; delay: number; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {once: false});
    // const backgroundColor = colors[index % colors.length];
    const rotation = rotations[index % rotations.length];

    return (
        <motion.div
            ref={ref}
            className={"banner-letter " + (index % 2 === 0 ? "even-letter" : " odd-letter")}
            custom={[delay, rotation]}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={bounceEffect}
            whileHover={{
                rotate: -rotation * 2,
                // translateY: -50,
                translateY: -30,
                // transform: "translateY(-10px)",

                // backgroundColor: "rgba(255, 255, 255, 0.11)"

            }}
            style={{
                // backgroundColor: backgroundColor,
                zIndex: 1 + index,
            }}
        >
            {letter}
        </motion.div>
    );
};

const Banner: React.FC<BannerProps> = ({text}) => {
    const delays = [
        0.2, 0.4, 0.6, 0.8,
        0.3, 0.5, 0.7, 0.9
    ];

    return (
        <div className="banner">
            <div className="letters-row">
                {text.split("").map((letter, index) => (
                    <BannerLetter key={index} letter={letter} delay={delays[index % delays.length]} index={index}/>
                ))}
            </div>
        </div>
    );
};

export default Banner;
