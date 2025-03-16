import "./ProfileStats.scss";
import {useEffect, useRef, useState} from "react";
import CountUp from "react-countup";
import {useLanguage} from "./Utils/LanguageContext.tsx";


const ProfileStats = () => {

    const {content} = useLanguage();
    const [startCount, setStartCount] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setStartCount(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.5,
            }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className="stats-container" ref={statsRef}>
            {content.stats.map((item, index) => (
                <div className={"stat-square shadowed"} key={index}>
                    {startCount && (<CountUp end={item.num} duration={4} delay={0.5} className="stats-number"/>)}
                    <p>{item.text}</p>
                </div>
            ))}
        </div>
    );
};

export default ProfileStats;
