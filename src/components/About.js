

import React, { useEffect, useState } from 'react';
import './About.css';
import ImageGallery from './ImageGallery';  // Import the ImageGallery component
import {ABOUT_SECTION_TEXT, ABOUT_SECTION_GREETING, ABOUT_SECTION_GALLERY_SIZE} from '../personalizationConstants';

const About = () => {
    return (
        <section className="about-section">
            <h2>{ABOUT_SECTION_GREETING}</h2>
            <div className="about-content">
                <div className="about-image">
                    <img src= "./about_images/image0.jpg" alt="That's Me!" loading="lazy" />
                </div>
                <div className="about-text">
                    {ABOUT_SECTION_TEXT.map((text, index) => (
                        <p key={index}>{text}</p>
                    ))}
                </div>
            </div>
            <div className="image-gallery-padding"></div>
            <ImageGallery directory="./about_images/" gallery_size={ABOUT_SECTION_GALLERY_SIZE} />
        </section>
    );
}

export default About;
