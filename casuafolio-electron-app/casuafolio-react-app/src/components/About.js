

import React, { useEffect, useState } from 'react';
import './About.css';
import ImageGallery from './ImageGallery';  // Import the ImageGallery component
import {ABOUT_SECTION_TEXT, ABOUT_SECTION_GREETING, ABOUT_SECTION_GALLERY} from '../personalizationConstants';

const About = () => {

    // Check if ABOUT_SECTION_GALLERY is empty and adjust its value accordingly
    const gallery = ABOUT_SECTION_GALLERY.length === 0 
        ? ["blankImage.png", "blankImage.png", "blankImage.png"] 
        : ABOUT_SECTION_GALLERY;

    // Destructure the adjusted array to separate the first image from the rest
    const [firstImg, ...withoutFirstImg] = gallery;
    return (
        <section className="about-section">
            <h2>{ABOUT_SECTION_GREETING}</h2>
            <div className="about-content">
                <div className="about-image">
                    <img src= {`./events_images/about_images/${firstImg}`} alt="That's Me!" loading="lazy" />
                </div>
                <div className="about-text">
                    {ABOUT_SECTION_TEXT.map((text, index) => (
                        <p key={index}>{text}</p>
                    ))}
                </div>
            </div>
            <div className="image-gallery-padding"></div>
            <ImageGallery folder_name="about_images" gallery={withoutFirstImg} />
        </section>
    );
}

export default About;
