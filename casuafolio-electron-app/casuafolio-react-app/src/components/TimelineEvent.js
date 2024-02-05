

import React from 'react';
import './TimelineEvent.css';
import ImageGallery from './ImageGallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const TimelineEvent = ({ event }) => {

  const EventDescription = ({ description }) => {
    const descriptionList = description.map((line, index) => (
      <li key={index}>{line}</li>
    ));
  
    return (
      <div>
        <ul className="timeline-description">
          {descriptionList}
        </ul>
      </div>
    );
  };

  const SkillList = ({ skills }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {skills.map((skill, index) => (
          <div key={index} className="skill-item" >
            {skill}
          </div>
        ))}
      </div>
    );
  };

  const ArrowIcon = ({ link }) => {    
    return (
      <div className="arrow-icon">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </a>
        ) : (
          <div />
        )}
      </div>
    );
  };
  
  
  

  return (
    <div className="TimelineEvent-container">
      <div className="TimelineEvent-arrowBox"></div>
      <div className="timeline-event">
        <span className="event-date">{event.date}</span>
        <div className="timeline-top"> 
          <div className="timeline-image">
              <img src={`./events_images/${event.folder_name}/${event.logo}`} alt={event.title} loading="lazy" />
          </div>
          <div className="timeline-content">
            <h3>{event.title}</h3>

          </div>

        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ marginBottom: '0em' }}>{event.event_name}</h2>
          <ArrowIcon link={event.link} />
        </div>

        <EventDescription description={event.description} style={{ marginTop: '0em' }}/>
        <SkillList skills={event.skills} />
        <ImageGallery folder_name={event.folder_name} gallery={event.gallery} />
      </div>
    </div>
  );
};

export default TimelineEvent;
