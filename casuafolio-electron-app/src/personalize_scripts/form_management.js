const { createEventsSection, readEventsSection} = require('./event_management');

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
  document.getElementById('aboutSectionGallerySize').value = info_in.ABOUT_SECTION_GALLERY_SIZE;
  
  // Social Links
  document.getElementById('youtubeLink').value = info_in.YOUTUBE_LINK;
  document.getElementById('linkedinLink').value = info_in.LINKEDIN_LINK;
  document.getElementById('githubLink').value = info_in.GITHUB_LINK;
  document.getElementById('twitterLink').value = info_in.TWITTER_LINK;
  document.getElementById('instagramLink').value = info_in.INSTAGRAM_LINK;

  // Resume and Tab Names
  document.getElementById('resumeLocation').value = info_in.RESUME_LOCATION;
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
  info.ABOUT_SECTION_GALLERY_SIZE = parseInt(document.getElementById('aboutSectionGallerySize').value, 10);

  // Social Links
  info.YOUTUBE_LINK = document.getElementById('youtubeLink').value;
  info.LINKEDIN_LINK = document.getElementById('linkedinLink').value;
  info.GITHUB_LINK = document.getElementById('githubLink').value;
  info.TWITTER_LINK = document.getElementById('twitterLink').value;
  info.INSTAGRAM_LINK = document.getElementById('instagramLink').value;

  // Resume and Tab Names
  info.RESUME_LOCATION = document.getElementById('resumeLocation').value;
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

  return info;
}

// Function to validate the form
function isValidForm(info) {
  console.log("validating form")
  return true;
}


module.exports = {
  populateForm,
  isValidForm,
  readForm
};
  