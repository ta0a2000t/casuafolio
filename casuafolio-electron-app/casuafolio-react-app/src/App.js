

import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import TimelineEvent from './components/TimelineEvent';
import 'font-awesome/css/font-awesome.min.css';
import About from './components/About'
import SocialIcons from './components/SocialIcons'; // adjust the import path as needed

import {FULL_NAME , EXPERIENCE_EVENTS, PROJECT_EVENTS, VOLUNTEER_EVENTS} from './personalizationConstants';
import {ABOUT_TAB_NAME, VOLUNTEER_TAB_NAME, EXPERIENCE_TAB_NAME, PROJECTS_TAB_NAME, EXPERIENCE_PAGE_HEADLINE, PROJECTS_PAGE_HEADLINE, VOLUNTEER_PAGE_HEADLINE} from './personalizationConstants';
import {HEADER_COLOR} from './stylingConstants';
import { getColor } from './helpers/utils';


function App() {
  const bgColor = 'rgba(0, 0, 0, 1)';
  const theme = '';
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [activeTimeline, setActiveTimeline] = useState('experiences'); // 'projects', 'volunteer', or 'experiences'
  const aboutRef = useRef(null); // to scroll to about section
  const [sectionToScroll, setSectionToScroll] = useState(null);
  const headerColor = getColor(HEADER_COLOR, 7);



  useEffect(() => {
    if (sectionToScroll) {
        if (sectionToScroll === 'about') {
          aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        } else if (sectionToScroll === 'timeline') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      setSectionToScroll(null);  // Resetting the state
    }
  }, [sectionToScroll]); 

  useEffect(() => {
    // Define timeline events
    const projectEvents = PROJECT_EVENTS;
    const volunteerEvents = VOLUNTEER_EVENTS;
    const experienceEvents = EXPERIENCE_EVENTS;
    
    // Set timelineEvents based on activeTimeline
    if (activeTimeline === 'projects') {
      setTimelineEvents(projectEvents);
    } else if (activeTimeline === 'volunteer') {
      setTimelineEvents(volunteerEvents);
    } else if (activeTimeline === 'experiences') {
      setTimelineEvents(experienceEvents);
    }
  }, [activeTimeline]);


  
  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    return () => {
      document.body.style.backgroundColor = null;
    };
  }, [bgColor]);

  return (
    <div className={`App ${theme}`} style={{ backgroundColor: bgColor }}>
    
    <header className="App-header" style={{ backgroundColor: headerColor }}>
      <div className="top-left">
        <div className="Fullname">{FULL_NAME}</div>
      </div>


      <div className="center">
      <div className="TabMenu">
        
        <button 
        className={`${activeTimeline === 'experiences' ? 'active' : ''}`} 
          onClick={() => {
            setActiveTimeline('experiences');
            setSectionToScroll('timeline');
          }}
        >
          {EXPERIENCE_TAB_NAME}
        </button>
        

        {PROJECTS_TAB_NAME && (
          <button 
        className={`${activeTimeline === 'projects' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTimeline('projects');
              setSectionToScroll('timeline');
            }}
          >
            {PROJECTS_TAB_NAME}
          </button>
        )}

        {VOLUNTEER_TAB_NAME && (
          <button 
        className={`${activeTimeline === 'volunteer' ? 'active' : ''}`} 
            onClick={() => {
              setActiveTimeline('volunteer');
              setSectionToScroll('timeline');
            }}
          >
            {VOLUNTEER_TAB_NAME}
          </button>
        )}

        
        <button onClick={() => setSectionToScroll('about')}>
          {ABOUT_TAB_NAME}
        </button>
        
      </div>
    </div>


      <div className="top-right">
      <SocialIcons />
      </div>

    </header>
      <section className="Timeline">
        <h2>{activeTimeline === 'projects' ? PROJECTS_PAGE_HEADLINE : activeTimeline === 'volunteer' ? VOLUNTEER_PAGE_HEADLINE : EXPERIENCE_PAGE_HEADLINE}</h2>
        {timelineEvents.map((event, index) => (
          <TimelineEvent key={index} event={event} />
        ))}
      </section>

      <section id="about" ref={aboutRef}>
        <About/>
      </section>
    </div>


  );
}

export default App;
