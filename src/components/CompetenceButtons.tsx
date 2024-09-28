// import { useState } from "react";
// import "./CompetenceButtons.scss";
//
// const CompetenceButtons = () => {
//     const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
//
//     const handleClick = (index: number) => {
//         setExpandedIndex(expandedIndex === index ? null : index);
//     };
//
//     return (
//         <div id="button-container">
//             {[0, 1, 2].map((index) => (
//                 <div
//                     key={index}
//                     className={`button ${expandedIndex === index ? "bigWidth" : ""}`}
//                     onClick={() => handleClick(index)}
//                 >
//                     {expandedIndex === index ? (
//                         <div>
//                             {/*<Skills title={`Back-End ${index + 1}`} skills={skillsBackEnd} />*/}
//                         </div>
//                     ) : (
//                         "Expand me!"
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default CompetenceButtons;


import React, {useState} from "react";
import "./CompetenceButtons.scss";
import {Skills} from "./Skills.tsx";


interface Skill {
    icon: string;
    startYear: number;
    name: string;
    description: string;
}

interface CompetenceButtonsProps {
    title1: string;
    skills1: Skill[];
    title2: string;
    skills2: Skill[];
    isReverse: boolean;
}

const CompetenceButtons: React.FC<CompetenceButtonsProps> = ({title1, skills1, title2, skills2, isReverse}) => {

// Ancien code :
//     const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
//
//     const handleClick = (index: number) => {
//         setExpandedIndex(expandedIndex === index ? null : index);
//     };
//
//     return (
//         <div id="button-container">
//             <div
//                 key={0}
//                 className={`button ${expandedIndex === 0 ? "bigWidth" : ""}`}
//                 onClick={() => handleClick(0)}
//             >
//                 {expandedIndex === 0 ? (
//                     <div>
//                         <Skills title={"Back-End"} skills={skillsBackEnd}/>
//                     </div>
//                 ) : (
//                     "Back-End"
//                 )}
//             </div>
//
//             <div
//                 key={1}
//                 className={`button ${expandedIndex === 1 ? "bigWidth" : ""}`}
//                 onClick={() => handleClick(1)}
//             >
//                 {expandedIndex === 1 ? (
//                     <div>
//                         <Skills title={"Front-End"} skills={skillsFrontEnd}/>
//                     </div>
//                 ) : (
//                     "Front-End"
//                 )}
//             </div>
//
//             {/*<div*/}
//             {/*    key={0}*/}
//             {/*    className={`button ${expandedIndex === 2 ? "bigWidth" : ""}`}*/}
//             {/*    onClick={() => handleClick(2)}*/}
//             {/*>*/}
//             {/*    {expandedIndex === 2 ? (*/}
//             {/*        <div>*/}
//             {/*            <Skills title={"Autres outils et logiciels"} skills={skillsSoftwares}/>*/}
//             {/*        </div>*/}
//             {/*    ) : (*/}
//             {/*        "Autres..."*/}
//             {/*    )}*/}
//             {/*</div>*/}
//
//         </div>
//     );
// };
    // Initialisation de l'index étendu à 0 pour garantir qu'il y a toujours un bouton d'étendu

    const [expandedIndex, setExpandedIndex] = useState<number>(0);

    const handleClick = (index: number) => {
        if (expandedIndex !== index) {
            setExpandedIndex(index);
        }
    };

    return (
        <div className={isReverse ? "button-container" : "reverse-button-container"}>
            <div
                key={0}
                className={`button ${expandedIndex === 0 ? "bigWidth" : ""}`}
                onClick={() => handleClick(0)}
            >
                {
                    expandedIndex === 0 ? (
                            <div>
                                <Skills title={title1} skills={skills1}/>
                            </div>)
                        : (title1)
                }
            </div>

            <div
                key={1}
                className={`button ${expandedIndex === 1 ? "bigWidth" : ""}`}
                onClick={() => handleClick(1)}
            >
                {
                    expandedIndex === 1 ? (
                            <div>
                                <Skills title={title2} skills={skills2}/>
                            </div>
                        )
                        : (title2)
                }
            </div>
            {/*<div*/}
            {/*    key={0}*/}
            {/*    className={`button ${expandedIndex === 2 ? "bigWidth" : ""}`}*/}
            {/*    onClick={() => handleClick(2)}*/}
            {/*>*/}
            {/*    {expandedIndex === 2 ? (*/}
            {/*        <div>*/}
            {/*            <Skills title={"Autres outils et logiciels"} skills={skillsSoftwares}/>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        "Autres..."*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default CompetenceButtons;


// import {useState} from "react";
// import "./CompetenceButtons.scss";
// import content from "../content/competences.json";
// import {Skills} from "./Skills.tsx";
//
// const CompetenceButtons = () => {
//
//     const url = 'https://skillicons.dev/icons?theme=light&i=';
//
//     const skillsBackEnd = [
//         {
//             icon: url + "java",
//             startYear: content.backend.competence1.startYear,
//             name: content.backend.competence1.name,
//             description: content.backend.competence1.description
//         },
//         {
//             icon: url + "py",
//             startYear: content.backend.competence2.startYear,
//             name: content.backend.competence2.name,
//             description: content.backend.competence2.description
//         },
//         {
//             icon: url + "spring",
//             startYear: content.backend.competence3.startYear,
//             name: content.backend.competence3.name,
//             description: content.backend.competence3.description
//         },
//
//     ];
//
//     const skillsFrontEnd = [
//         {
//             icon: url + "js",
//             startYear: content.frontend.competence3.startYear,
//             name: content.frontend.competence3.name,
//             description: content.frontend.competence3.description
//         },
//         {
//             icon: url + "ts",
//             startYear: content.frontend.competence7.startYear,
//             name: content.frontend.competence7.name,
//             description: content.frontend.competence7.description
//         },
//         {
//             icon: url + "sass",
//             startYear: content.frontend.competence6.startYear,
//             name: content.frontend.competence6.name,
//             description: content.frontend.competence6.description
//         },
//     ];
//
//     const skillsSoftwares = [
//         {
//             icon: url + 'git',
//             startYear: content.softwares.competence1.startYear,
//             name: content.softwares.competence1.name,
//             description: content.softwares.competence1.description
//         },
//         {
//             icon: url + 'figma',
//             startYear: content.softwares.competence2.startYear,
//             name: content.softwares.competence2.name,
//             description: content.softwares.competence2.description
//         },
//         {
//             icon: url + 'idea',
//             startYear: content.softwares.competence3.startYear,
//             name: content.softwares.competence3.name,
//             description: content.softwares.competence3.description
//         },
//     ];
//
//
//     const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
//
//     // Fonction pour ouvrir un panneau sans le fermer sur un second clic
//     const handleExpand = (index: number) => {
//         if (expandedIndex !== index) {
//             setExpandedIndex(index);
//         }
//     };
//
//     // Fonction pour fermer le panneau via un bouton Collapse
//     const handleCollapse = () => {
//         setExpandedIndex(null);
//     };
//
//     return (
//         <div id="button-container">
//             {/* Back-End Section */}
//             <div
//                 key={0}
//                 className={`button ${expandedIndex === 0 ? "bigWidth" : ""}`}
//                 onClick={() => handleExpand(0)}
//             >
//                 {expandedIndex === 0 ? (
//                     <div>
//                         <Skills title={"Back-End"} skills={skillsBackEnd} />
//                         <button onClick={handleCollapse}>Collapse</button> {/* Bouton de fermeture */}
//                     </div>
//                 ) : (
//                     "Back-End"
//                 )}
//             </div>
//
//             {/* Front-End Section */}
//             <div
//                 key={1}
//                 className={`button ${expandedIndex === 1 ? "bigWidth" : ""}`}
//                 onClick={() => handleExpand(1)}
//             >
//                 {expandedIndex === 1 ? (
//                     <div>
//                         <Skills title={"Front-End"} skills={skillsFrontEnd} />
//                         <button onClick={handleCollapse}>Collapse</button> {/* Bouton de fermeture */}
//                     </div>
//                 ) : (
//                     "Front-End"
//                 )}
//             </div>
//
//             {/* Autres Outils Section */}
//             <div
//                 key={2}
//                 className={`button ${expandedIndex === 2 ? "bigWidth" : ""}`}
//                 onClick={() => handleExpand(2)}
//             >
//                 {expandedIndex === 2 ? (
//                     <div>
//                         <Skills title={"Autres outils et logiciels"} skills={skillsSoftwares} />
//                         <button onClick={handleCollapse}>Collapse</button> {/* Bouton de fermeture */}
//                     </div>
//                 ) : (
//                     "Autres..."
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default CompetenceButtons;
