import './Skills.scss';
import {motion, useInView} from 'framer-motion';
import {useRef} from "react";


interface SkillList {
    [key: string]: string;
}

const Skills = ({title, skills, icon}: { title: string, skills: SkillList, icon: string }) => {


    return (
        <div className='skills-container shadowed'>
            <div className="skill-cardHeader">
                {/*<motion.div*/}
                {/*    initial={{opacity: 0, scale: 0.8}}*/}
                {/*    whileInView={{opacity: 1, scale: 1}}*/}
                {/*    viewport={{once: true, amount: 0.5}} // L'animation se déclenche une seule fois lorsque 50% de l'élément est visible*/}
                {/*    transition={{delay: 0.14, duration: 0.45, ease: 'easeOut'}}*/}
                {/*    className={"skill-cardHeader"}*/}
                {/*>*/}
                <img className="skill-category-icon" src={icon}/>
                <h2 className="skills-title">{title}</h2>
                {/*</motion.div>*/}
            </div>

            <div className='skillsList-container'>
                {Object.entries(skills).map(([key, skillName]) => (
                    <ul key={key} className="skillsList">
                        {/*<motion.li*/}
                        {/*    initial={{opacity: 0, scale: 0.8}}*/}
                        {/*    whileInView={{opacity: 1, scale: 1}}*/}
                        {/*    viewport={{once: true, amount: 0.5}} // L'animation se déclenche une seule fois lorsque 50% de l'élément est visible*/}
                        {/*    transition={{delay: 0.14, duration: 0.35, ease: 'easeOut'}}*/}
                        {/*    className="skillItem"*/}
                        {/*>*/}
                        <li className="skillItem">
                            <img
                                // src={`https://skillicons.dev/icons?theme=light&i=${key}`}
                                // src={`https://skillicons.dev/icons?theme=dark&i=${key}`}
                                src={`src/assets/skills/dark/${key}.svg`}
                                // src={`src/assets/skills/light/${key}.svg`}
                                alt={`${skillName} icon`}
                                className='skill-icon'
                            />
                            <p className='skill-name'>{skillName}</p>
                            {/*</motion.li>*/}
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default Skills;
