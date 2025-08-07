import './Skills.scss';


interface SkillList {
    [key: string]: string;
}

const Skills = ({title, skills, icon}: { title: string, skills: SkillList, icon: string }) => {

    return (
        <div className='skills-container shadowed'>
            <div className="skill-cardHeader">
                <img className="skill-category-icon" src={icon}/>
                <h2 className="skills-title">{title}</h2>
            </div>

            <div className='skillsList-container'>
                {Object.entries(skills).map(([key, skillName]) => (
                    <ul key={key} className="skillsList">
                        <li className="skillItem">
                            <img
                                src={`/assets/skills/dark/${key}.svg`}
                                alt={`${skillName} icon`}
                                className='skill-icon'
                            />
                            <p className='skill-name'>{skillName}</p>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default Skills;
