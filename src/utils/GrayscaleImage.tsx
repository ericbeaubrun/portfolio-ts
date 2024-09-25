import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import "./GrayscaleImage.css";  // Importez un fichier CSS pour les styles

gsap.registerPlugin(ScrollTrigger);

interface GrayscaleImageProps {
    imagePath: string;
}

const GrayscaleImage: React.FC<GrayscaleImageProps> = ({imagePath}) => {
    console.log(imagePath);
    const imageRef = useRef(null);

    useEffect(() => {
        const imageElement = imageRef.current;

        gsap.to(imageElement, {
            filter: "grayscale(0%)",
            ease: "none",
            scrollTrigger: {
                trigger: imageElement,
                // start: "top center",
                //  end: "bottom center",
                start: "top 75% ",
                end: "bottom 27%",
                scrub: true,
                onEnter: () => gsap.to(imageElement, {filter: "grayscale(0%)"}),
                onEnterBack: () => gsap.to(imageElement, {filter: "grayscale(0%)"}),
                onLeaveBack: () => gsap.to(imageElement, {filter: "grayscale(100%)"}),
                onLeave: () => gsap.to(imageElement, {filter: "grayscale(100%)"}),
            },
        });
    }, []);

    return (
        <div className="container">
            <img
                ref={imageRef}
                src={imagePath}
                alt="Grayscale on Scroll"
                className="image"
            />
        </div>
    );
};

export default GrayscaleImage;
