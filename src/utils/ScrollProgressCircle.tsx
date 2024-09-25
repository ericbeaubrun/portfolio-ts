import {useEffect, useState} from 'react';
import {motion, useScroll} from 'framer-motion';

const ScrollProgressCircle = () => {
    const {scrollYProgress} = useScroll();
    const [scrollYValue, setScrollYValue] = useState(0);

    useEffect(() => {
        return scrollYProgress.onChange(latest => {
            setScrollYValue(latest);
        });
    }, [scrollYProgress]);

    return (
        <motion.svg
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '75px',
                height: '75px',
                zIndex: 100,
            }}
            viewBox="0 0 36 36"
        >
            <path
                d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#c6b6a9"
                strokeWidth="2"
            />
            <motion.path
                d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#be5d0e"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset={100 - scrollYValue * 100}
                initial={{pathLength: 0}}
                animate={{pathLength: scrollYValue}}
            />
        </motion.svg>
    );
};

export default ScrollProgressCircle;
