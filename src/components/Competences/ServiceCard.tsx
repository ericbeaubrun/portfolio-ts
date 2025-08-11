import React from 'react';
import { motion } from 'framer-motion';

interface Service {
    title: string;
    p: string;
    icon: string;
}

interface ServiceCardProps {
    service: Service;
    animationDelay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, animationDelay }) => {
    const bounceEffect = {
        hidden: { opacity: 0, y: -85 },
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

    return (
        <div className="service-card">
            <motion.div
                className={`icon ${service.icon}`}
                custom={animationDelay + 0.3}
                initial="hidden"
                whileInView="visible"
                variants={bounceEffect}
                viewport={{ once: false, amount: 0.5 }}
            />
            <motion.h3
                className="service-title"
                custom={animationDelay + 0.075}
                initial="hidden"
                whileInView="visible"
                variants={bounceEffect}
                viewport={{ once: false, amount: 0.5 }}
            >
                {service.title}
            </motion.h3>
            <motion.p
                className="service-paragraph"
                custom={animationDelay}
                initial="hidden"
                whileInView="visible"
                variants={bounceEffect}
                viewport={{ once: false, amount: 0.5 }}
            >
                {service.p}
            </motion.p>
        </div>
    );
};

export default ServiceCard;
