

import React from 'react';
import PropTypes from 'prop-types';
import './ImageGallery.css';

// Example: directory = './volunteering_images/mathcounts/'
const ImageGallery = ({ directory, gallery_size }) => {


    // Render empty div if gallery size is 0
    if (gallery_size === 0) {
    return <div style={{ paddingBottom: '1em' }}></div>;
    }

    const gallery = Array.from({ length: gallery_size }, (_, i) => `image${i + 1}.jpg`);

    return (
    <div className="image-container">
        <div className="timeline-gallery">
        {gallery.map((img, index) => (
            <div key={index} className="image-wrapper">
            <img src={`${directory}/${img}`} alt={`Gallery ${img}`} loading="lazy" />
            </div>
        ))}
        </div>
    </div>
    );
    };

    ImageGallery.propTypes = {
    directory: PropTypes.string.isRequired,
    gallery_size: PropTypes.number.isRequired, 
    };

export default ImageGallery;
