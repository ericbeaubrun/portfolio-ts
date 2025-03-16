import './Timeline.scss';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import idiatechIcon from '../../assets/idia-tech.png';
import graduationIcon from '../../assets/diplome.png';
import cyIcon from '../../assets/cy.png';
import mcdoIcon from '../../assets/mcdo.png';
import CompetencesList from "../CompetencesList.tsx";
import {useLanguage} from "../Utils/LanguageContext.tsx";

const Timeline = () => {

    const { content } = useLanguage();

    return (
        <>
            <VerticalTimeline lineColor={"white"}>
                <VerticalTimelineElement
                    className="vertical-timeline-element--graduation"
                    contentArrowStyle={{borderRight: '10px solid  white'}}
                    date={content.timeline[0].date}
                    iconStyle={{
                        background: 'white',
                        color: 'black',
                    }}
                    icon={
                        <div className="timeline-icon-container">
                            <img className="timeline-icon graduation-icon" src={graduationIcon} alt={"test"}/>
                        </div>
                    }
                >

                    <h3 className="vertical-timeline-element-title">{content.timeline[0].title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{content.timeline[0].subtitle}</h4>
                    <p> {content.timeline[0].desc}</p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{borderRight: '10px  solid  white'}}
                    date={content.timeline[1].date}
                    iconStyle={{
                        background: 'white',
                        color: 'black',
                        objectFit: 'cover',
                    }}
                    icon={
                        <div className="timeline-icon-container">
                            <img className="timeline-icon cy-icon" src={cyIcon} alt={"test"}/>
                        </div>
                    }
                >

                    <h3 className="vertical-timeline-element-title">{content.timeline[1].title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{content.timeline[1].subtitle}</h4>
                    <p> {content.timeline[1].desc}</p>

                    <CompetencesList skills={content.timeline[1].skills}/>

                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date={content.timeline[2].date}
                    contentArrowStyle={{borderRight: '10px  solid  white'}}

                    iconStyle={{
                        background: 'white',
                        color: 'black',
                    }}

                    icon={
                        <div className="timeline-icon-container">
                            <img className="timeline-icon idiateh-icon" src={idiatechIcon} alt={"test"}/>
                        </div>
                    }
                >

                    <h3 className="vertical-timeline-element-title">{content.timeline[2].title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{content.timeline[2].subtitle}</h4>
                    <p> {content.timeline[2].desc}</p>

                    <CompetencesList skills={content.timeline[2].skills}/>

                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--graduation"

                    iconStyle={{
                        background: 'white',
                        color: 'black'
                    }}

                    date={content.timeline[3].date}
                    contentArrowStyle={{borderRight: '10px  solid  white'}}

                    icon={
                        <div className="timeline-icon-container">
                            <img className="timeline-icon graduation-icon" src={graduationIcon} alt={"test"}/>
                        </div>
                    }
                >
                    <h3 className="vertical-timeline-element-title">{content.timeline[3].title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{content.timeline[3].subtitle}</h4>
                    <p> {content.timeline[3].desc}</p>
                </VerticalTimelineElement>

                <VerticalTimelineElement
                    className="vertical-timeline-element--graduation"

                    iconStyle={{
                        background: 'white',
                        color: 'black'
                    }}

                    date={content.timeline[4].date}
                    contentArrowStyle={{borderRight: '10px  solid  white'}}

                    icon={
                        <div className="timeline-icon-container">
                            <img className="timeline-icon mcdo-icon" src={mcdoIcon} alt={"test"}/>
                        </div>
                    }
                >
                    <h3 className="vertical-timeline-element-title">{content.timeline[4].title}</h3>
                    <h4 className="vertical-timeline-element-subtitle">{content.timeline[4].subtitle}</h4>
                    <p> {content.timeline[4].desc}</p>
                </VerticalTimelineElement>

                {/*<VerticalTimelineElement*/}
                {/*    iconStyle={{background: 'white', color: 'white'}}*/}
                {/*/>*/}

            </VerticalTimeline>
        </>

    );
};

export default Timeline;
