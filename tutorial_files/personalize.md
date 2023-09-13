# Personalize Your CasuaFolio 🎨

This guide assumes you've already set up your website and it is now live locally. 

Before we start, go quickly through [`Content Overview of personalizationConstants.js`](./personalizationConstants.md).

---

1. [Locating File](#locating-required-files)
2. [Personalizing Basic Info](#personalizing-basic-info)
3. [Adding Events](#adding-events)
   - [Creating Event Folders](#creating-event-folders)
   - [Adding Images and Logos](#adding-images-and-logos)
4. [Customizing the 'About' Section](#customizing-the-about-section)
   - [Text Customization](#text-customization)
   - [Image Customization](#image-customization)



## Locating File

1. **Locate `personalizationConstants.js`**: This is the only file you will change. It is located in the `src` folder within the `public` folder.

> ⚠️ **Don't Forget to Save!**: After making any changes to the code, be sure to save the file to see the updates reflected on the website. You can generally save by pressing Ctrl + S on Windows or Cmd + S on Mac.


## Personalizing Basic Info

1. **Edit Basic Info**: Open `personalizationConstants.js` and locate the variables:

```javascript
export const FULL_NAME = "Your Name";  // Example: "John Doe"
export const SITE_TITLE = "Your Website Title";  // Example: "John's Portfolio"
export const META_DESCRIPTION = "Your Portfolio";  // Example: "John Doe's Personal Portfolio"

export const LINKEDIN_LINK = "";
export const RESUME_LOCATION = "";  // Example: "./resume.pdf"  // Note: Place this in the "public" folder
    // ... more variables
```

Replace the placeholders with your personal information.
> **Warning**: Do not modify anything to the left of the `=` sign. In other words, only change the values assigned to the variables.



## Adding Events

**What an event looks like:**
```Typescript 
{
  title: string; // The title of the group or company where the experience occurred
  event_name: string; // The specific role or position held during the experience
  date: string; // Time period during which the experience took place, e.g., 'Sep 2023 - Present'
  description: string[]; // An array of strings describing various aspects or responsibilities of the role
  skills: string[]; // An array of skills acquired or used during the experience
  directory: string; // Directory path where related images are stored
  gallery_size: number; // Total count of images in the scrollable gallery. Do not count logo.png
  link: string; // A URL linking to documentation for this particular experience
  // NOTE: if you do not have a URL, set link to ""
  //  So, link = ""
}
```


1. **Events Array**: In the `personalizationConstants.js`, look for the arrays named `EXPERIENCE_EVENTS`, `PROJECTS_EVENTS`, and `VOLUNTEER_EVENTS`. Modify them to add your experiences, projects, or volunteer work.

```javascript
export const EXPERIENCE_EVENTS = [
  {
    title: "Dareen Mall Co",
    event_name: "Professional Mall Explorer",
    date: 'Apr 2023 - May 2023',
    description: [
      "Walked around Dareen Mall a lot, showing folks the quickest ways to find good sales.",
      "Taught a small team how to dodge crowds and get to the food court fast.",
      "Made a simple chart to show the best times to go to the mall."
    ],
    skills: ["Teamwork", "Walking Fast", "Good Timing", "Finding Sales"],
    directory: './experiences_images/dareen_mall/', // dareen_mall folder: logo.png, image1.jpg, image2.jpg
    gallery_size: 2,  // Because there are two pictures in the gallery
    link: ""
  },
  // Add as many events as you have experiences
];
```

### Creating Event Folders

2. **Folder Structure**: For each event you add, create a corresponding folder in the `public` directory. The folder should be created under a parent folder that corresponds to the type of event (e.g., `experiences_images`, `projects_images`, or `volunteer_images`).

    - **Example**: If you had an experience at NASA Harvest, create a folder named `nasa_harvest` under `experiences_images`.

### Adding Images and Logos


3. **Event Images**: Place event-related images in the folder you've created for each event. Use the `.jpg` format and name them sequentially (e.g., `image1.jpg`, `image2.jpg`).

4. **Event Logos**: If you have a logo for the event or company, add it to the event folder and use `.png` format. The file should be named `logo.png`.

  > 🖼️ **Image Optimization Note:** Before adding your images to the website, it's highly recommended to compress them to a lower resolution. This will help in saving storage space and also ensure that the images load quickly when someone visits your website.  
  >  
  > I suggest using [this bulk image resizer](https://redketchup.io/bulk-image-resizer). This tool not only allows you to reduce the image resolution but also convert images to `.jpg`, which is the expected format for this template.  
  >  
  > While it might seem low, an image size of around 100KB is generally sufficient for web use!

---

## Customizing the 'About' Section

### Text Customization

1. **Edit About Text**: In the `personalizationConstants.js` file, locate the `ABOUT_SECTION_TEXT` array and customize the content.

```javascript
export const ABOUT_SECTION_TEXT = [
  "I'm a full-stack developer with 5 years of experience. I like to eat.",
  "paragraph2",
  "paragraph3",
  // ... and so on
];
```

### Image Customization

2. **About Images**: Place your images insde the `public/about_images` directory. 

    - The main image should be named `image0.jpg`.
    - Additional images should be sequentially named, starting with `image1.jpg`.

---
> ⚠️ **Don't Forget to Save!**: save by pressing Ctrl + S on Windows or Cmd + S on Mac.

After completing these steps, save `personalizationConstants.js`. Your website should now be fully personalized and reflect all the changes!



