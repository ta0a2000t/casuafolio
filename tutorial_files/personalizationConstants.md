# Content Overview of `personalizationConstants.js`

This is the only file you will change. It is located inside the 'src' folder. Read below & open it to learn about its contents.

- [Section 1: Variables](#section-1-variables)
  - [Personal Information](#personal-information)
  - [Site Metadata](#site-metadata)
  - [About Section](#about-section)
  - [Social and Resume Links](#social-and-resume-links)
  - [Tab Menu Configuration](#tab-menu-configuration)
  
- [Section 2: Events](#section-2-events)
  - [Experience Events](#experience-events)
  - [Project Events](#project-events)
  - [Volunteer Events](#volunteer-events)

---

## Section 1: Variables

### Personal Information

- `FULL_NAME`: Your full name in English.
- `SITE_TITLE`: The title displayed on the browser's tab bar.

### Site Metadata

- `META_DESCRIPTION`: This metadata will be used by search engines to understand what your website is about.

### About Section

- `ABOUT_SECTION_GREETING`: The greeting message in the About section.
- `ABOUT_SECTION_TEXT`: An array containing paragraphs for the About section.

📝 Note: For the About section images, place your images inside `public/about_images` directory. The main image should be named `image0.jpg`, and additional images should be sequentially named, starting with `image1.jpg`.

### Social and Resume Links

- `YOUTUBE_LINK`: Link to your YouTube account.
- `LINKEDIN_LINK`: Link to your LinkedIn account.
- `GITHUB_LINK`: Link to your GitHub account.
- `TWITTER_LINK`: Link to your Twitter account (if you wish to share it).
- `INSTAGRAM_LINK`: Link to your Instagram account.
- `RESUME_LOCATION`: URL or local path to your resume.

### Tab Menu Configuration (Optional)

- `ABOUT_TAB_NAME`: Name of the 'About' tab.
- `VOLUNTEER_TAB_NAME`: Name of the 'Volunteer' tab.
- `EXPERIENCE_TAB_NAME`: Name of the 'Experience' tab.
- `PROJECTS_TAB_NAME`: Name of the 'Projects' tab.

---

## Section 2: Events

>📝 Note: For event-related images, place them in the folder you've created for each event. Use the `.jpg` format and name them sequentially (e.g., `image1.jpg`, `image2.jpg`). If you have a logo for the event or company, add it to the event folder and use `.png` format. The file should be named `logo.png`.

### Experience Events

- `EXPERIENCE_PAGE_HEADLINE`: Headline for the experience page.
- `EXPERIENCE_EVENTS`: Array of objects detailing each experience, including the role, date, skills, and image directory.


### Project Events

- `PROJECTS_PAGE_HEADLINE`: Headline for the projects page.
- `PROJECT_EVENTS`: Array of objects detailing each project, including the role, date, skills, and image directory.

### Volunteer Events

- `VOLUNTEER_PAGE_HEADLINE`: Headline for the volunteer page.
- `VOLUNTEER_EVENTS`: Array of objects detailing each volunteer experience, including the role, date, skills, and image directory.
