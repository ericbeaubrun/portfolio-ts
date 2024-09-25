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


import {useState} from "react";
import "./CompetenceButtons.scss";
import content from "../content/competences.json";
import {Skills} from "./Skills.tsx";

const CompetenceButtons = () => {

    const url = 'https://skillicons.dev/icons?theme=light&i=';

    const skillsBackEnd = [
        {
            icon: url + "java",
            startYear: content.backend.competence1.startYear,
            name: content.backend.competence1.name,
            description: content.backend.competence1.description
        },
        {
            icon: url + "py",
            startYear: content.backend.competence2.startYear,
            name: content.backend.competence2.name,
            description: content.backend.competence2.description
        },
        {
            icon: url + "spring",
            startYear: content.backend.competence3.startYear,
            name: content.backend.competence3.name,
            description: content.backend.competence3.description
        },
        {
            icon: url + "php",
            startYear: content.backend.competence4.startYear,
            name: content.backend.competence4.name,
            description: content.backend.competence4.description
        },
        // {
        //     icon: url + "c",
        //     startYear: content.backend.competence5.startYear,
        //     name: content.backend.competence5.name,
        //     description: content.backend.competence5.description
        // },
        {
            icon: url + "mysql",
            startYear: content.backend.competence6.startYear,
            name: content.backend.competence6.name,
            description: content.backend.competence6.description
        },
        {
            icon: url + "postgres",
            startYear: content.backend.competence7.startYear,
            name: content.backend.competence7.name,
            description: content.backend.competence7.description
        },
        {
            icon: url + "nodejs",
            startYear: content.backend.competence8.startYear,
            name: content.backend.competence8.name,
            description: content.backend.competence8.description
        },
    ];

    const skillsFrontEnd = [
        // {
        //     icon: url + "html",
        //     startYear: content.frontend.competence1.startYear,
        //     name: content.frontend.competence1.name,
        //     description: content.frontend.competence1.description
        // },
        // {
        //     icon: url + "css",
        //     startYear: content.frontend.competence2.startYear,
        //     name: content.frontend.competence2.name,
        //     description: content.frontend.competence2.description
        // },
        {
            icon: url + "js",
            startYear: content.frontend.competence3.startYear,
            name: content.frontend.competence3.name,
            description: content.frontend.competence3.description
        },
        {
            icon: url + "ts",
            startYear: content.frontend.competence7.startYear,
            name: content.frontend.competence7.name,
            description: content.frontend.competence7.description
        },
        {
            icon: url + "sass",
            startYear: content.frontend.competence6.startYear,
            name: content.frontend.competence6.name,
            description: content.frontend.competence6.description
        },
        {
            icon: url + "react",
            startYear: content.frontend.competence4.startYear,
            name: content.frontend.competence4.name,
            description: content.frontend.competence4.description
        },
        {
            icon: url + "next",
            startYear: content.frontend.competence5.startYear,
            name: content.frontend.competence5.name,
            description: content.frontend.competence5.description
        }, {
            icon: url + "vue",
            startYear: content.frontend.competence5.startYear,
            name: content.frontend.competence5.name,
            description: content.frontend.competence5.description
        },


    ];

    const skillsSoftwares = [
        {
            icon: url + 'git',
            startYear: content.softwares.competence1.startYear,
            name: content.softwares.competence1.name,
            description: content.softwares.competence1.description
        },
        {
            icon: url + 'figma',
            startYear: content.softwares.competence2.startYear,
            name: content.softwares.competence2.name,
            description: content.softwares.competence2.description
        },
        {
            icon: url + 'idea',
            startYear: content.softwares.competence3.startYear,
            name: content.softwares.competence3.name,
            description: content.softwares.competence3.description
        },
        {
            icon: url + 'webstorm',
            startYear: content.softwares.competence4.startYear,
            name: content.softwares.competence4.name,
            description: content.softwares.competence4.description
        },
        {
            icon: url + 'notion',
            startYear: content.softwares.competence5.startYear,
            name: content.softwares.competence5.name,
            description: content.softwares.competence5.description
        },
        {
            icon: url + 'ps',
            startYear: content.softwares.competence6.startYear,
            name: content.softwares.competence6.name,
            description: content.softwares.competence6.description
        },
        {
            icon: url + 'pr',
            startYear: content.softwares.competence7.startYear,
            name: content.softwares.competence7.name,
            description: content.softwares.competence7.description
        },
    ];

    console.log(url + 'pr');

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div id="button-container">
            <div
                key={0}
                className={`button ${expandedIndex === 0 ? "bigWidth" : ""}`}
                onClick={() => handleClick(0)}
            >
                {expandedIndex === 0 ? (
                    <div>
                        <Skills title={"Back-End"} skills={skillsBackEnd}/>
                    </div>
                ) : (
                    "Back-End"
                )}
            </div>

            <div
                key={1}
                className={`button ${expandedIndex === 1 ? "bigWidth" : ""}`}
                onClick={() => handleClick(1)}
            >
                {expandedIndex === 1 ? (
                    <div>
                        <Skills title={"Front-End"} skills={skillsFrontEnd}/>
                    </div>
                ) : (
                    "Front-End"
                )}
            </div>

            <div
                key={0}
                className={`button ${expandedIndex === 2 ? "bigWidth" : ""}`}
                onClick={() => handleClick(2)}
            >
                {expandedIndex === 2 ? (
                    <div>
                        <Skills title={"Autres outils et logiciels"} skills={skillsSoftwares}/>
                    </div>
                ) : (
                    "Autres..."
                )}
            </div>

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
