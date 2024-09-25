import './Timeline.css';  // Assurez-vous d'inclure les styles de base
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import content from '../content/presentation.json';
import graduationIcon from '../assets/graduation-cap-icon.svg'
import cyIcon from '../assets/cy.svg';
import idiatechIcon from '../assets/idia-tech.svg';
// import {color} from "framer-motion";
// const CustomIcon = (className, icon) => {
//     return (
//         <>
//         </>
//     );
// }

const Timeline = () => {

    return (
        <>
            <VerticalTimeline lineColor={"red"}>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{borderRight: '10px solid  white'}}
                    date={content.parcours.container1.date}
                    iconStyle={{
                        background: 'white',
                        color: 'black',
                    }}
                    icon={
                        <div className="timeline-icon-container">
                            <img className="timeline-icon" src={"../content/presentation.json"} alt={"test"}/>
                        </div>
                    }
                >
                    <h3 className="vertical-timeline-element-title">{content.parcours.container1.title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{}</h4>
                    <p> {content.parcours.container1.description}</p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{borderRight: '10px  solid  white'}}
                    date={content.parcours.container2.date}
                    iconStyle={{
                        background: 'white',
                        color: 'black',
                        objectFit: 'cover',
                    }}
                    icon={
                        <div className="timeline-icon-container">

                            <img className="timeline-icon" src={cyIcon} alt={"test"}/>
                        </div>
                    }
                >
                    <h3 className="vertical-timeline-element-title">{content.parcours.container2.title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{}</h4>
                    <p> {content.parcours.container2.description}</p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date={content.parcours.container3.date}
                    contentArrowStyle={{borderRight: '10px  solid  white'}}

                    iconStyle={{
                        background: 'white',
                        color: 'black',
                        // borderRight:"7px solid red",
                        // boxShadow:"0 0 0 4px #fff, inset 0 2px 0 red, 0 3px 0 4px red"
                    }}
                    //box-shadow: 0 0 0 4px #fff, inset 0 2px 0 rgba(0, 0, 0, .08), 0 3px 0 4px rgba(0, 0, 0, .05);
                    //border-right: 7px solid rgb(33, 150, 243);
                    icon={
                        <div className="timeline-icon-container">
                            <img className="timeline-icon" src={idiatechIcon} alt={"test"}/>
                        </div>
                    }
                >
                    <h3 className="vertical-timeline-element-title">{content.parcours.container3.title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{}</h4>
                    <p> {content.parcours.container3.description}</p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    iconStyle={{
                        background: 'white',
                        color: 'black'
                    }}
                    date={content.parcours.container4.date}
                    contentArrowStyle={{borderRight: '10px  solid  white'}}

                    icon={
                        <div className="timeline-icon-container">
                            <img className="timeline-icon" src={graduationIcon} alt={"test"}/>
                        </div>
                    }

                >
                    <h3 className="vertical-timeline-element-title">{content.parcours.container4.title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{}</h4>
                    <p> {content.parcours.container4.description}</p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    iconStyle={{background: 'rgb(16, 204, 82)', color: '#fff'}}
                    // icon={<img src={graduationIcon} alt={"test"}/>}
                />
            </VerticalTimeline>
        </>

    );
};

export default Timeline;
