import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import './ProjectImagesCarousel.scss';
import { NextArrow, PrevArrow } from "../../Utils/CustomArrows.tsx";

interface ProjectImageCarouselProps {
    images: string[];
}

const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({ images }) => {
    const sliderRef = useRef<Slider>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState<string | null>(null);

    const handleImageClick = (index: number) => {
        if (index === currentSlide) {
            setModalImage(images[index]);
            setIsModalOpen(true);
        } else {
            sliderRef.current?.slickGoTo(index);
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        cssEase: 'ease-in-out',
        slidesToScroll: 1,
        centerMode: true,
        adaptiveHeight: true,
        centerPadding: '0px',
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        slidesToShow: 3,
        afterChange: (index: number) => setCurrentSlide(index),
        // responsive: [
        //     { breakpoint: 1200, settings: { slidesToShow: 3 } },
        //     { breakpoint: 1024, settings: { slidesToShow: 2 } },
        //     { breakpoint: 768, settings: { slidesToShow: 1 } }
        // ]
    };

    return (
        <div className="project-carousel-wrapper">
            <Slider ref={sliderRef} {...settings}>
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="carousel-item"
                        onClick={() => handleImageClick(index)}
                    >
                        <img src={img} alt={`Project image ${index}`} />
                    </div>
                ))}
            </Slider>

            {isModalOpen && modalImage && (
                <div className="image-modal" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content">
                        <img src={modalImage} alt="Full size" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectImageCarousel;
