// import "./Banner.scss";
// import {motion, useInView} from "framer-motion";
// import React, {useRef} from "react";
//
// interface BannerProps {
//     images: string[];
// }
//
// const bounceEffect = {
//     hidden: {opacity: 0, y: -75},
//     visible: (delay: number) => ({
//         opacity: 1,
//         y: 0,
//         transition: {
//             type: "spring",
//             stiffness: 200,
//             damping: 11,
//             duration: 0.8,
//             delay: delay,
//         },
//     }),
// };
//
// const BannerImage = ({image, delay}: { image: string; delay: number }) => {
//     const ref = useRef<HTMLImageElement>(null);
//     const isInView = useInView(ref, {once: true});
//
//     // const rotation = (Math.random() * 10 - 5).toFixed(2) + "deg";
//
//     return (
//         <motion.img
//             ref={ref}
//             src={image}
//             alt="Banner"
//             className="banner-image"
//             custom={delay}
//             initial="hidden"
//             animate={isInView ? "visible" : "hidden"}
//             variants={bounceEffect}
//             // style={{"--hover-rotation": rotation} as React.CSSProperties}
//             whileHover={{ rotate: delay * 12 }}
//         />
//     );
// };
//
// const Banner: React.FC<BannerProps> = ({images}) => {
//     const delays = [
//         0.2, 0.4, 0.6, 0.8,
//         0.3, 0.5, 0.7, 0.9
//     ];
//
//     return (
//         <div className="banner">
//             <div className="images-row left">
//                 {images.slice(0, 8).map((image, index) => (
//                     <BannerImage key={index} image={image} delay={delays[index]}/>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default Banner;
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
        rotate:rotation,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 11,
            duration: 0.8,
            delay: delay,
        },
    }),
};

const colors = ["#796d61", "#8c7763", "#59524b", "#806954", "#796f67", "#645547"];

const rotations = [2.3, -3.5, 2.5, -3.7, 2.7, -3.2];

const BannerLetter = ({letter, delay, index}: { letter: string; delay: number; index: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: false });
    // const isInView = useInView(ref, {once: false});
    // const rotation = (Math.random() * 10 - 5).toFixed(2) + "deg";
    const backgroundColor = colors[index % colors.length];
    const rotation = rotations[index % rotations.length];

    return (
        <motion.div
            ref={ref}
            className="banner-letter shadowed"
            custom={[delay, rotation]}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={bounceEffect}
            // whileHover={{rotate: parseFloat(rotation) * 2}}
            whileHover={{rotate: -rotation}}
            style={{
                backgroundColor: backgroundColor,
                // transform: `rotate(${rotation})`,
                zIndex: 1+index,
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
