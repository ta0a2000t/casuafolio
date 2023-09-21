const fs = require('fs');
const path = require('path');
const SimpleUndo = require('simple-undo'); // import the SimpleUndo package


let info = {};

// Your serialize and unserialize methods
function myObjectSerializer(done) {
    done(JSON.stringify(info));
}

function myObjectUnserializer(serialized) {
    info2 = JSON.parse(serialized);
    populateForm(info2);  // Repopulate the form based on the new state
}

const history = new SimpleUndo({
    maxLength: 10,
    provider: myObjectSerializer
});


// Set the path to your personalizationConstants.js
const currentDir = __dirname;
//console.log("Current Directory: ", currentDir);

// Navigate back to the common root directory 'casuafolio'
const rootPath = path.resolve(currentDir, '..', '..'); // contents of casuafolio repo
//console.log("Root Directory: ", rootPath);

// Navigate down into the React app's src folder
const relativePathToPersonalizationConstants = path.join(rootPath, 'casuafolio-react-app', 'src', 'personalizationConstants.json');
//console.log("Trying to read from: ", relativePathToPersonalizationConstants);
fs.readFile(relativePathToPersonalizationConstants, 'utf8', (err, data) => {
  if (err) {
    console.error("Could not read file", err);
    return;
  }
  console.log("File contents:", data);


  info = JSON.parse(data);
  history.save();

  console.log(info)
  populateForm(info);

});

  

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
      
  
  createSection(info_in.EXPERIENCE_EVENTS, 'experienceEvents');
  createSection(info_in.VOLUNTEER_EVENTS, 'volunteerEvents');
  createSection(info_in.PROJECT_EVENTS, 'projectEvents');

}

// Listen for form submission
document.getElementById('personalizationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
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

    info.EXPERIENCE_EVENTS = readSection('experienceEvents');
    info.VOLUNTEER_EVENTS = readSection('volunteerEvents');
    info.PROJECT_EVENTS = readSection('projectEvents');



    history.save();

    // Update the file
    fs.writeFileSync(relativePathToPersonalizationConstants, JSON.stringify(info));
});



// Undo Functionality
function undoChanges() {
    if (history.count() > 1 ) {
        history.undo(myObjectUnserializer);
    }
}

// Redo Functionality
function redoChanges() {
    if (history.count() > 1 ) {
        history.redo(myObjectUnserializer);
    }
}

document.getElementById('undoButton').addEventListener('click', undoChanges);
document.getElementById('redoButton').addEventListener('click', redoChanges); 





  






// Function to create an individual event
function createEventDiv(event, index, sectionInfo, sectionId) {
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('eventDiv');
    
  
    // Create title for each event
    const eventTitle = document.createElement('h3');
    eventTitle.textContent = `Event ${index + 1}`; 
    eventDiv.appendChild(eventTitle);

    // Loop through keys in each event
    Object.keys(event).forEach((key) => {
    const keyDiv = document.createElement('div');
    keyDiv.classList.add('keyDiv');

    const keyLabel = document.createElement('label');
    keyLabel.textContent = key;
    keyLabel.htmlFor = `${key}_${index}`;
    keyDiv.appendChild(keyLabel);

    // Handle different types of key-value pairs
    if (key === 'description') {
        const textArea = document.createElement('textarea');
        textArea.id = `${key}_${index}`;
        textArea.value = event[key].join('\n'); // Join array into a multi-line string
        keyDiv.appendChild(textArea);
    } else if (key === "gallery_size") {
        const inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.id = `${key}_${index}`;
        inputField.value = event[key];
        keyDiv.appendChild(inputField);
    } else if (key === 'skills') {
        const skillsDiv = document.createElement('div');
        skillsDiv.classList.add('skillsDiv');
    
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.addEventListener('click', function() {
            const skillInputs = Array.from(skillsDiv.querySelectorAll('input'));
        
            if (skillInputs.length >= 10) {
                alert('You cannot add more than 10 skills.');
                return;
            }
        
            if (skillInputs.some(input => input.value.trim().length === 0)) {
                alert('You must populate the empty skill field first.');
                return;
            }
        
            window.open('create-skill.html', 'Add New Skill', 'width=300,height=200');
        });
        
    
        skillsDiv.appendChild(addButton);
    
        // Make sure the array has at least 2 skills
        if (event[key] && event[key].length >= 2) {
            event[key].forEach((skill, skillIndex) => {
                const skillInput = document.createElement('input');
                skillInput.type = 'text';
                skillInput.value = skill;
                skillInput.id = `${key}_${index}_${skillIndex}`;
                skillInput.addEventListener('blur', function() {
                    const trimmedValue = skillInput.value.trim();
                    if (trimmedValue.length < 2) {
                        alert('Each skill should have at least 2 non-space characters.');
                        skillInput.focus();
                    } else {
                        skillInput.value = trimmedValue;
                    }
                });
    
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'x';
                deleteButton.addEventListener('click', function() {
                    // Make sure at least 2 skills remain
                    if (skillsDiv.querySelectorAll('input').length <= 2) {
                        alert('You must have at least 2 skills.');
                        return;
                    }
                    skillInput.remove();
                    deleteButton.remove();
                });
    
                skillsDiv.appendChild(skillInput);
                skillsDiv.appendChild(deleteButton);
            });
        } else {
            alert('You must have at least 2 skills.');
        }
    
        keyDiv.appendChild(skillsDiv);
    } else if (Array.isArray(event[key])) {
        event[key].forEach((subValue, subIndex) => {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = `${key}_${index}_${subIndex}`;
        inputField.value = subValue;
        keyDiv.appendChild(inputField);
        });
    } else {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = `${key}_${index}`;
        inputField.value = event[key];
        keyDiv.appendChild(inputField);
    }

    eventDiv.appendChild(keyDiv);
    });
      
      
    // Add delete button and attach the event
    addDeleteButton(eventDiv, index, sectionInfo, sectionId);
    
    return eventDiv;
  }
  
  // Function to add a delete button to an event
  function addDeleteButton(eventDiv, index, sectionInfo, sectionId) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      eventDiv.classList.add('fade-out');
    
      setTimeout(() => {
        sectionInfo.splice(index, 1);
        createSection(sectionInfo, sectionId);
      }, 500);
    });
    
    eventDiv.appendChild(deleteButton);
  }
  
  // Function to add a new event
  function addNewEvent(sectionInfo, sectionId) {
    const newEvent = {
      title: 'Your Company Name',
      event_name: 'Your Position',
      date: 'Your Date Range',
      description: ['Task or achievement 1', 'Task or achievement 2'],
      skills: ['Skill 1', 'Skill 2'],
      directory: './your_images_folder/',
      gallery_size: 0,
      link: 'Your Link'
    };
    sectionInfo.push(newEvent);
    createSection(sectionInfo, sectionId);
  }
  
  // Main function to create the section
const createSection = (sectionInfo, sectionId) => {
    const sectionDiv = document.getElementById(sectionId);
    sectionDiv.innerHTML = '';

    // Add "+" button at the top
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.addEventListener('click', () => {
        addNewEvent(sectionInfo, sectionId);
    });
    sectionDiv.appendChild(addButton);

    // Loop through each event in reverse
    for (let index = sectionInfo.length - 1; index >= 0; index--) {
        const event = sectionInfo[index];
        const eventDiv = createEventDiv(event, index, sectionInfo, sectionId);
        sectionDiv.appendChild(eventDiv);
    }
};
  











// Reading events from sections
function readSection(sectionId) {
    const sectionDiv = document.getElementById(sectionId);
    const eventDivs = sectionDiv.querySelectorAll('.eventDiv');
    const events = Array.from(eventDivs).map((eventDiv, index) => {
        const event = {}; // Initialize an empty event object

        // Read text inputs and number inputs
        const inputs = eventDiv.querySelectorAll('input');
        inputs.forEach((input) => {
            const idComponents = input.id.split('_');
            const key = idComponents[0];
            const value = input.type === 'number' ? parseInt(input.value, 10) : input.value;
            
            if (Array.isArray(event[key])) {
                event[key].push(value);
            } else if (event[key] !== undefined) {
                event[key] = [event[key], value];
            } else {
                event[key] = value;
            }
        });

        // Read textareas (for description)
        const textareas = eventDiv.querySelectorAll('textarea');
        textareas.forEach((textarea) => {
            const idComponents = textarea.id.split('_');
            const key = idComponents[0];
            const value = textarea.value.split('\n');
            event[key] = value;
        });

        return event;
    });

    return events;
}
