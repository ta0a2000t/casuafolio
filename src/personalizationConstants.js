// WARNING: DO NOT CHANGE THE NAMES OF THESE VARIABLES.
// In other words: DO NOT MODIFY ANYTHING TO THE LEFT OF THE '=' SIGN.

/******************************************
 * 
 *           SECTION 1: VARIABLES
 * 
 ******************************************/

// ---- Sub-Section: Personal Information ----
export const FULL_NAME = "Taha Al-Nufaili"; // PUT YOUR NAME HERE
export const SITE_TITLE = "Taha🌴🐪"; // displayed on the tab bar of browser.


// ---- Sub-Section: Site Metadata ----
// This tells Google what this website is. Example: Taha Al-Nufaili's Portfolio
export const META_DESCRIPTION = "Taha Al-Nufaili's Portfolio"; 


// ---- Sub-Section: About Section (aka bio) ----
export const ABOUT_SECTION_GREETING = "Hala 👋";
export const ABOUT_SECTION_TEXT = [
  "I'm in my final undergrad year, but don't let that fool you—I'm all about diving into code, tackling full-stack development, and getting my hands dirty with machine learning. 🤖",
  "When I'm not in front of my computer, you'll probably find me out exploring or lining up that perfect shot in pool. 🎱",
  "So, wanna build something cool together? Or maybe a game of pool? Hit me up!🤙"
];
export const ABOUT_SECTION_GALLERY_SIZE = 4; // DO NOT COUNT "image0.jpg"



// ---- Sub-Section: Social and Resume Links ----
// If you do not want to show any of the below, keep the link empty text, so: ""
export const YOUTUBE_LINK = "https://www.youtube.com/@tahaalnufaili8838";
export const LINKEDIN_LINK = "https://www.linkedin.com/in/taha-al-nufaili/";
export const GITHUB_LINK = "https://github.com/ta0a2000t";
export const TWITTER_LINK = ""; // NOTE, I am not sharing my twitter here, so i set it to: ""
export const INSTAGRAM_LINK = "";  

export const RESUME_LOCATION = "./Fall2023_Resume_Taha_Al_Nufaili.pdf"
            // example "./resume.pdf" #NOTE: . means in the "public" folder
            // RESUME_LOCATION could be also a URL to some website that holds you resume.


// ---- Sub-Section: Tab Menu Configuration (Optional) ----
// Purpose: To allow customization of tab names in the navigation menu.
// Note: This section is optional. Modify only if you wish to rename default tab names. 
// Example: Change "About" to alternative names like "Bio" or "Me."
// Another Example: Change "Experience" to "Education", or "Random", or anything.
// WARNING: DO NOT MODIFY ANYTHING TO THE LEFT OF THE '=' SIGN.
export const ABOUT_TAB_NAME = "About"

// tab button names:
export const VOLUNTEER_TAB_NAME = "Volunteer"
export const EXPERIENCE_TAB_NAME = "Experience"
export const PROJECTS_TAB_NAME = "Projects"




/******************************************
 * 
 *           SECTION 2: EVENTS
 * 
 *  Purpose: To outline all professional, volunteer
 *  and project-based events (experiences).
 ******************************************/

// headlines:
export const EXPERIENCE_PAGE_HEADLINE = "My Experiences 🛶"
export const PROJECTS_PAGE_HEADLINE = "My Projects 🛠"
export const VOLUNTEER_PAGE_HEADLINE = "My Volunteer Work 🤝"


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
export const EXPERIENCE_EVENTS = [
  {
    title: "Your Company Name",
    event_name: "Your Position",
    date: 'Your Date Range',
    description: ["Task or achievement 1", "Task or achievement 2"],
    skills: ["Skill 1", "Skill 2"],
    directory: './experiences_images/folder_of_this_event/',
    gallery_size: 0,
    link: "Your Link"
  },
  {
    title: "NASA Harvest",
    event_name: "Machine Learning Intern",
    date: 'Feb 2023 - May 2023',
    description: [
      "Employed Google Earth Engine API to split labeled 1-year image composites into 3-week intervals, overlayed coordinates, and exported imagery to Google Drive.",
      "Utilized Random Upsampling to balance data, then built a 1D CNN model in TensorFlow and evaluated using F-1 scores."
    ],
    skills: ["Google Earth Engine API", "TensorFlow", "Data Preprocessing", "F-1 Score Evaluation"],
    directory: './experiences_images/nasa_harvest',
    gallery_size: 5, // There are five images in the scrollable gallery 
    link: "https://www.timeshighered-events.com/gsd-congress-2023/agenda/speakers/3050569"
  },
  {
    title: "Dareen Mall Co",
    event_name: "Professional Mall Explorer",
    date: 'Apr 2011 - May 2012',
    description: [
      "Walked around Dareen Mall a lot, showing folks the quickest ways to find good sales.",
      "Taught a small team how to dodge crowds and get to the food court fast.",
      "Made a simple chart to show the best times to go to the mall."
    ],
    skills: ["Teamwork", "Walking Fast", "Good Timing", "Finding Sales"],
    directory: './experiences_images/dareen_mall_co/', // dareen_mall_co folder: logo.png, image1.jpg, image2.jpg
    gallery_size: 2,  // Because there are two pictures in the gallery
    link: ""
  }
]

// ---- Sub-Section: Volunteer Events ----
// make sure to sort them; topmost is your most recent
export const VOLUNTEER_EVENTS = [
  {
    title: "Your Volunteer Event",
    event_name: "Your Role",
    date: 'Your Date',
    description: ["Task or achievement 1"],
    skills: ["Skill 1", "Skill 2"],
    directory: './volunteering_images/folder_of_this_event/',
    gallery_size: 0,
    link: "Your Link"
  },
  {
    title: "Bitcamp Hackathon",
    event_name: "Mentoring at Bitcamp Hackathon",
    date: 'Apr 2023',
    description: ["Helped participants with app design..."],
    skills: ["Mentoring", "Machine Learning"],
    directory: './volunteering_images/bitcamp/',
    gallery_size: 2,
    link: ""
  }
]

// ---- Sub-Section: Project Events ----
// make sure to sort them; topmost is your most recent
export const PROJECT_EVENTS = [
  {
    title: "Your Project Title",
    event_name: "Your Project Event",
    date: 'Your Date Range',
    description: ["Task or achievement 1", "Task or achievement 2"],
    skills: ["Skill 1", "Skill 2"],
    directory: './projects_images/folder_of_this_event/',
    gallery_size: 0,
    link: "Your Link"
  },

  {
    title: "Pygame - Pong Replica",
    event_name: "Game Development",
    date: "June 2020",
    description: ["Created my first game, a replica of Pong, using Python and Pygame."],
    skills: ["Python", "Pygame"],
    gallery_size: 2,
    directory: "./projects_images/pong_replica/",
    link: "https://www.youtube.com/shorts/pCsyJK2JL6g"
  }
]
