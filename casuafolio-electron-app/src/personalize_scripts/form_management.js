const { createEventsSection, readEventsSection, createAboutSection} = require('./event_management');

// Function to populate the form fields with existing values
function populateForm(info_in) {
  if (info_in === undefined) {
      console.log("undo stack is empty");
      return;
  }

  // Basic Info
  document.getElementById('fullName').value = info_in.FULL_NAME;
  document.getElementById('siteTitle').value = info_in.SITE_TITLE;
  document.getElementById('metaDescription').value = info_in.META_DESCRIPTION;
  document.getElementById('greeting').value = info_in.ABOUT_SECTION_GREETING;
  document.getElementById('aboutText').value = info_in.ABOUT_SECTION_TEXT.join('\n');
  
  // Social Links
  document.getElementById('youtubeLink').value = info_in.YOUTUBE_LINK;
  document.getElementById('linkedinLink').value = info_in.LINKEDIN_LINK;
  document.getElementById('githubLink').value = info_in.GITHUB_LINK;
  document.getElementById('twitterLink').value = info_in.TWITTER_LINK;
  document.getElementById('instagramLink').value = info_in.INSTAGRAM_LINK;

  // Resume and Tab Names
  if (info_in.RESUME_LOCATION == '') {
    deleteCV();
  } else {
    setCV();
  }

  document.getElementById('aboutTabName').value = info_in.ABOUT_TAB_NAME;
  document.getElementById('volunteerTabName').value = info_in.VOLUNTEER_TAB_NAME;
  document.getElementById('experienceTabName').value = info_in.EXPERIENCE_TAB_NAME;
  document.getElementById('projectsTabName').value = info_in.PROJECTS_TAB_NAME;

  // Page Headlines
  document.getElementById('experiencePageHeadline').value = info_in.EXPERIENCE_PAGE_HEADLINE;
  document.getElementById('projectsPageHeadline').value = info_in.PROJECTS_PAGE_HEADLINE;
  document.getElementById('volunteerPageHeadline').value = info_in.VOLUNTEER_PAGE_HEADLINE;
    

  createEventsSection(info_in.EXPERIENCE_EVENTS, 'experienceEvents');
  createEventsSection(info_in.VOLUNTEER_EVENTS, 'volunteerEvents');
  createEventsSection(info_in.PROJECT_EVENTS, 'projectEvents');
  createAboutSection([{gallery: info_in.ABOUT_SECTION_GALLERY}], 'aboutSectionInputs');

}




// Function to read the form
function readForm() {
  let info = {};
  // Gather updated data from form fields
  info.FULL_NAME = document.getElementById('fullName').value;
  info.SITE_TITLE = document.getElementById('siteTitle').value;
  info.META_DESCRIPTION = document.getElementById('metaDescription').value;
  info.ABOUT_SECTION_GREETING = document.getElementById('greeting').value;
  info.ABOUT_SECTION_TEXT = document.getElementById('aboutText').value.split('\n');

  // Social Links
  info.YOUTUBE_LINK = document.getElementById('youtubeLink').value;
  info.LINKEDIN_LINK = document.getElementById('linkedinLink').value;
  info.GITHUB_LINK = document.getElementById('githubLink').value;
  info.TWITTER_LINK = document.getElementById('twitterLink').value;
  info.INSTAGRAM_LINK = document.getElementById('instagramLink').value;

  // Resume and Tab Names
  if (document.getElementById('resumePreviewer-div').innerHTML == ``) {
    info.RESUME_LOCATION = ``;
  } else {
    info.RESUME_LOCATION = 'personal_CV_file.pdf';
  }
  info.ABOUT_TAB_NAME = document.getElementById('aboutTabName').value;
  info.VOLUNTEER_TAB_NAME = document.getElementById('volunteerTabName').value;
  info.EXPERIENCE_TAB_NAME = document.getElementById('experienceTabName').value;
  info.PROJECTS_TAB_NAME = document.getElementById('projectsTabName').value;

  // Page Headlines
  info.EXPERIENCE_PAGE_HEADLINE = document.getElementById('experiencePageHeadline').value;
  info.PROJECTS_PAGE_HEADLINE = document.getElementById('projectsPageHeadline').value;
  info.VOLUNTEER_PAGE_HEADLINE = document.getElementById('volunteerPageHeadline').value;

  info.EXPERIENCE_EVENTS = readEventsSection('experienceEvents');
  info.VOLUNTEER_EVENTS = readEventsSection('volunteerEvents');
  info.PROJECT_EVENTS = readEventsSection('projectEvents');
  info.ABOUT_SECTION_GALLERY = readEventsSection('aboutSectionInputs')[0].gallery;
  return info;
}



// Helper function to check if a string is a valid URL
function isValidURL(str) {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
}

// Helper function to validate if a field is non-empty after trimming
function isNonEmpty(str) {
  return typeof str === "string" && str.trim().length > 0;
}


function validateEvent(event) {
  if (!isNonEmpty(event.title)) return { valid: false, message: "Event title is empty." };

  if (!isNonEmpty(event.event_name)) 
    return { valid: false, message: `Event name for "${event.title}" is empty.` };
    
  if (!isNonEmpty(event.date)) 
    return { valid: false, message: `Event date for "${event.title}" is empty.` };
  
  if (!Array.isArray(event.description) || event.description.some(text => !isNonEmpty(text))) {
    return { valid: false, message: `All description items in the event titled "${event.title}" should be non-empty.` };
  }
  
  if (!Array.isArray(event.skills) || event.skills.some(skill => !isNonEmpty(skill))) {
    return { valid: false, message: `All skills in the event titled "${event.title}" should be non-empty.` };
  }
  

  if (event.link && !isValidURL(event.link)) 
    return { valid: false, message: `Invalid link URL for "${event.title}".` };

  return { valid: true };
}




// Function to validate the main info object
function isValidForm(info) {
  console.log(info);
  // Validate top-level string fields
  const topLevelStringFields = [
    "FULL_NAME", "SITE_TITLE", "META_DESCRIPTION",
    "ABOUT_SECTION_GREETING", "YOUTUBE_LINK", "LINKEDIN_LINK",
    "GITHUB_LINK", "TWITTER_LINK", "INSTAGRAM_LINK",
    "ABOUT_TAB_NAME", "VOLUNTEER_TAB_NAME", "EXPERIENCE_TAB_NAME",
    "PROJECTS_TAB_NAME", "EXPERIENCE_PAGE_HEADLINE", "PROJECTS_PAGE_HEADLINE",
    "VOLUNTEER_PAGE_HEADLINE"
  ];

  for (const field of topLevelStringFields) {
    if (isNonEmpty(info[field])) {
          // Check if URL fields are valid
      if (field.endsWith("_LINK") && info[field] && !isValidURL(info[field])) {
        return { valid: false, message: `${field} is not a valid Link (URL).` };
      }
    } else {
      info[field] = ""; // trimmed
    }

  }

  // Validate ABOUT_SECTION_TEXT
  if (!Array.isArray(info.ABOUT_SECTION_TEXT) || info.ABOUT_SECTION_TEXT.some(text => !isNonEmpty(text))) {
    return { valid: false, message: "All items in ABOUT_SECTION_TEXT should be non-empty." };
  }

  // Validate events in EXPERIENCE_EVENTS, VOLUNTEER_EVENTS, and PROJECT_EVENTS
  const eventCategories = ["EXPERIENCE_EVENTS", "VOLUNTEER_EVENTS", "PROJECT_EVENTS"];
  for (const category of eventCategories) {
    if (!Array.isArray(info[category])) {
      return { valid: false, message: `${category} should be an array.` };
    }

    for (const event of info[category]) {
      const validationResult = validateEvent(event);
      if (!validationResult.valid) {
        return validationResult;
      }
    }
  }

  // If everything passed, the object is valid
  return { valid: true, message: "Info object is valid." };
}



module.exports = {
  populateForm,
  isValidForm,
  readForm
};
  