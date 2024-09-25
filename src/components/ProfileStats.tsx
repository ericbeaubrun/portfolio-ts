import "./ProfileStats.scss"
import {useEffect, useRef, useState} from "react";
import CountUp from "react-countup";

const stats = [
    {
        num: 4,
        text: "Ans d'expériences",
    },
    // {
    //     num: 22,
    //     text: "Compétences",
    // },
    {
        num: 8,
        text: "Projets réalisés",
        // (1) Conquete (2) File System (3) IoT (4) Librairie (5) Fichiers OpenDOC (6) Aerien (7) Appli pedagogique (8) Pointage étudiant
    },
    {
        num: 2,
        text: "Stages effectués",
    },

];

const ProfileStats = () => {
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
        <section>
            <div className="stats-container" ref={statsRef}>
                {stats.map((item, index) => (
                    <div key={index}>
                        {startCount && (
                            <CountUp
                                end={item.num}
                                duration={4}
                                delay={0.5}
                                className="stats-number"
                            />
                        )}
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProfileStats;
