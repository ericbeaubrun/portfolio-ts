import './Services.scss';
import {motion} from "framer-motion";
import Slider from "react-slick";
import React, {useRef} from "react";
import {PrevArrow, NextArrow} from '../Utils/CustomArrows';
import {useLanguage} from "../Utils/LanguageContext";
import {useIsMobile} from "../Utils/MobileContext.tsx";

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
    // const services: Service[] = content.services.map((service :Service, index: number) => ({
    //     iconClass: ["uiux-icon", "webdev-icon", "appdev-icon"][index],
    //     title: service.title,
    //     description: service.p,
    // }));

    const renderServiceCard = (service: Service, animationDelay: number) => (
        <motion.div
            initial={{opacity: 1, y: -60}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: animationDelay/3}}
            viewport={{once: false, amount: 0.5}}
            className="service-card"
            key={service.title}
        >
            {/*<div className="service-card">*/}
                <div className={`icon ${service.icon}`}/>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-paragraph">{service.p}</p>
            {/*</div>*/}
        </motion.div>
    );

    const renderSeparator = (animationDelay: number) => (
        <motion.div
            initial={{opacity: 0, y: -60}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: animationDelay/3}}
            viewport={{once: false, amount: 0.5}}
            className="separator"
            key={`separator-${animationDelay}`}
        />
    );

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
                                {renderServiceCard(service, 0.2 + index * 0.1)}
                                {index < services.length - 1 && (
                                    renderSeparator(0.3 + index * 0.1)
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
