import {useEffect, useState} from 'react';
import {motion, useScroll, useSpring, useTransform} from 'framer-motion';
import {Link} from "react-scroll";
import './ScrollProgressCircle.scss';
import Lenis from "lenis";

const ScrollProgressCircle = ({lenis}: { lenis: Lenis }) => {
    const {scrollYProgress} = useScroll();
    const [isHovered, setIsHovered] = useState(false);

    const smoothScrollProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        mass: 1,
    });

    const AUTO_DISPLAY_ICON = 6.5;
    const [scrollYValue, setScrollYValue] = useState(0);
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            setScrollYValue(latest);
        });
        return () => {
            unsubscribe();
        };
    }, [scrollYProgress]);

    const strokeDashoffset = useTransform(smoothScrollProgress, [0, 1], [100, 0]);
    const DURATION = 500;

    return (
        <Link to="presentation" smooth={true} duration={700} offset={0} onClick={
            () => {
                lenis.stop();
                setTimeout(() => {
                    lenis.start();
                }, DURATION);
            }
        }>
            <motion.div
                className="scroll-progress-circle"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.svg viewBox="0 0 36 36" className="progress-circle">
                    <path
                        className="progress-bg"
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <motion.path
                        className="progress-indicator"
                        d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        style={{strokeDashoffset}}
                        strokeDasharray="100"
                    />
                </motion.svg>

                <motion.div 
                    className="scroll-arrow"
                    initial="hidden"
                    // animate={isHovered || isMobile || 100 - scrollYValue * 100 <= AUTO_DISPLAY_ICON ? "visible" : "hidden"}
                    animate={isHovered || 100 - scrollYValue * 100 <= AUTO_DISPLAY_ICON ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0, scale: 0.9, y: 10 },
                        visible: {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut"
                            }
                        }
                    }}
                >
                    <img src="/assets/arrow.svg" alt="arrow top"/>
                </motion.div>
            </motion.div>
        </Link>
    );
};

export default ScrollProgressCircle;
