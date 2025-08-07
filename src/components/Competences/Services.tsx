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

    const bounceEffect = {
        hidden: {opacity: 0, y: -85},
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 0.175,
                delay: delay,
            },
        }),
    };

    const services = (content as { services: Service[] }).services;
    // const services: Service[] = content.services.map((service :Service, index: number) => ({
    //     iconClass: ["uiux-icon", "webdev-icon", "appdev-icon"][index],
    //     title: service.title,
    //     description: service.p,
    // }));

    const renderServiceCard = (service: Service, animationDelay: number) => (
        <div className="service-card" key={service.title}>
            <motion.div
                className={`icon ${service.icon}`}
                custom={animationDelay + 0.3}
                initial="hidden"
                whileInView="visible"
                variants={bounceEffect}
                viewport={{once: false, amount: 0.5}}
            />
            <motion.h3
                className="service-title"
                custom={animationDelay + 0.075}
                initial="hidden"
                whileInView="visible"
                variants={bounceEffect}
                viewport={{once: false, amount: 0.5}}
            >
                {service.title}
            </motion.h3>
            <motion.p
                className="service-paragraph"
                custom={animationDelay}
                initial="hidden"
                whileInView="visible"
                variants={bounceEffect}
                viewport={{once: false, amount: 0.5}}
            >
                {service.p}
            </motion.p>
        </div>
    );

    const renderSeparator = (animationDelay: number) => (
        <motion.div
            initial={{opacity: 0, y: -80}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.2, delay: animationDelay/3}}
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
                                {renderServiceCard(service, 0.125 + index * 0.2)}
                                {index < services.length - 1 && (
                                    renderSeparator(2.75 + index * 0.5)
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
