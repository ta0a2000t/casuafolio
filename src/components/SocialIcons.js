import React from 'react';
import './SocialIcons.css';

import {
  YOUTUBE_LINK,
  LINKEDIN_LINK,
  GITHUB_LINK,
  RESUME_LOCATION,
  TWITTER_LINK,
  INSTAGRAM_LINK,
} from '../personalizationConstants';

const socialLinks = [
  { link: RESUME_LOCATION, icon: "fa-file-text" },
  { link: LINKEDIN_LINK, icon: "fa-linkedin" },
  { link: GITHUB_LINK, icon: "fa-github" },
  { link: TWITTER_LINK, icon: "fa-twitter" },
  { link: YOUTUBE_LINK, icon: "fa-youtube" },
  { link: INSTAGRAM_LINK, icon: "fa-instagram" },
];

const SocialIcons = () => {
  return (
    <div className="social-icons">
      {socialLinks.map((social, index) =>
        social.link ? (
          <a key={index} href={social.link} target={social.link} rel="noopener noreferrer">
            <i className={`fa ${social.icon} fa-lg`}></i>
          </a>
        ) : null
      )}
    </div>
  );
};

export default SocialIcons;
