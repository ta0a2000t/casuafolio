// WARNING: DO NOT CHANGE THE NAMES OF THESE VARIABLES.
// In other words: DO NOT MODIFY ANYTHING TO THE LEFT OF THE '=' SIGN.
import info from "./personalizationConstants.json";

/******************************************
 * 
 *           SECTION 1: VARIABLES
 * 
 ******************************************/

// ---- Sub-Section: Personal Information ----
export const FULL_NAME = info.FULL_NAME; // PUT YOUR NAME HERE
export const SITE_TITLE = info.SITE_TITLE; // displayed on the tab bar of browser.


// ---- Sub-Section: Site Metadata ----
// This tells Google what this website is. Example: Taha Al-Nufaili's Portfolio
export const META_DESCRIPTION = info.META_DESCRIPTION; 


// ---- Sub-Section: About Section (aka bio) ----
export const ABOUT_SECTION_GREETING =info.ABOUT_SECTION_GREETING;
export const ABOUT_SECTION_TEXT = info.ABOUT_SECTION_TEXT;
export const ABOUT_SECTION_GALLERY = info.ABOUT_SECTION_GALLERY; // DO NOT COUNT "image0.jpg"



// ---- Sub-Section: Social and Resume Links ----
// If you do not want to show any of the below, keep the link empty text, so: ""
export const YOUTUBE_LINK = info.YOUTUBE_LINK;
export const LINKEDIN_LINK = info.LINKEDIN_LINK;
export const GITHUB_LINK = info.GITHUB_LINK;
export const TWITTER_LINK = info.TWITTER_LINK; // NOTE, I am not sharing my twitter here, so i set it to: ""
export const INSTAGRAM_LINK = info.INSTAGRAM_LINK;  

export const RESUME_LOCATION = info.RESUME_LOCATION;
            // example "./resume.pdf" #NOTE: . means in the "public" folder
            // RESUME_LOCATION could be also a URL to some website that holds you resume.


// ---- Sub-Section: Tab Menu Configuration (Optional) ----
// Purpose: To allow customization of tab names in the navigation menu.
// Note: This section is optional. Modify only if you wish to rename default tab names. 
// Example: Change "About" to alternative names like "Bio" or "Me."
// Another Example: Change "Experience" to "Education", or "Random", or anything.
// WARNING: DO NOT MODIFY ANYTHING TO THE LEFT OF THE '=' SIGN.
export const ABOUT_TAB_NAME = info.ABOUT_TAB_NAME;

// tab button names:
export const VOLUNTEER_TAB_NAME = info.VOLUNTEER_TAB_NAME;
export const EXPERIENCE_TAB_NAME = info.EXPERIENCE_TAB_NAME;
export const PROJECTS_TAB_NAME = info.PROJECTS_TAB_NAME;




/******************************************
 * 
 *           SECTION 2: EVENTS
 * 
 *  Purpose: To outline all professional, volunteer
 *  and project-based events (experiences).
 ******************************************/

// headlines:
export const EXPERIENCE_PAGE_HEADLINE = info.EXPERIENCE_PAGE_HEADLINE;
export const PROJECTS_PAGE_HEADLINE = info.PROJECTS_PAGE_HEADLINE;
export const VOLUNTEER_PAGE_HEADLINE = info.VOLUNTEER_PAGE_HEADLINE;


/*
What an event looks like:
{
  title: string; // The title of the group or company where the experience occurred
  event_name: string; // The specific role or position held during the experience
  date: string; // Time period during which the experience took place, e.g., 'Sep 2023 - Present'
  description: string[]; // An array of strings describing various aspects or responsibilities of the role
  skills: string[]; // An array of skills acquired or used during the experience
  directory: string; // Directory path where related images are stored
  gallery_size: number; // Number indicating the total count of images in the scrollable gallery. do not count logo.png
  link: string; // A URL linking to documentation for this particular experience
}
*/


// ---- Sub-Section: Experience Events ----
// make sure to sort them; topmost is your most recent
export const EXPERIENCE_EVENTS = info.EXPERIENCE_EVENTS;

// ---- Sub-Section: Volunteer Events ----
// make sure to sort them; topmost is your most recent
export const VOLUNTEER_EVENTS = info.VOLUNTEER_EVENTS;

// ---- Sub-Section: Project Events ----
// make sure to sort them; topmost is your most recent
export const PROJECT_EVENTS = info.PROJECT_EVENTS;
