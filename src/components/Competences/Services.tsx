import './Services.scss';
import Slider from "react-slick";
import React, {useRef} from "react";
import {PrevArrow, NextArrow} from '../Utils/CustomArrows';
import {useLanguage} from "../Utils/LanguageContext";
import {useIsMobile} from "../Utils/MobileContext.tsx";
import Separator from "../Utils/Separator";
import ServiceCard from "./ServiceCard";

interface Service {
    title: string;
    p: string;
    icon: string;
}

const Services: React.FC = () => {
    const {content} = useLanguage();

    const isMobile = useIsMobile();

    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
    };

    const ref1 = useRef<HTMLDivElement>(null);

    const services = (content as { services: Service[] }).services;

    return (
        <>
            <div className="services-container">
                {isMobile ? (
                    <Slider {...carouselSettings}>
                        {services.map((service, index) => (
                            <div key={index} className="service-card">
                                <div className={`icon ${service.icon}`}/>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-paragraph">{service.p}</p>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div ref={ref1} className="services-container">
                        {services.map((service, index) => (
                            <React.Fragment key={`service-${index}`}>
                                <ServiceCard 
                                    service={service} 
                                    animationDelay={0.125 + index * 0.2} 
                                    key={service.title}
                                />
                                {index < services.length - 1 && (
                                    <Separator 
                                        animationDelay={2.75 + index * 0.5} 
                                        key={`separator-${index}`} 
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </div>
            <div className="wave-reverse"/>
        </>
    );
};

export default Services;
