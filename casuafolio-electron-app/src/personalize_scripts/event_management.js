
function prepend(value, array) {
  var newArray = array.slice();
  newArray.unshift(value);
  return newArray;
}

function createFolder(folderName, callback) {
  unsavedEventFoldersList.push(folderName);
  const folderPath = path.join(relativePathTo_events_images, folderName);
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error(`Failed to create folder ${folderPath}`, err);
      if (callback) callback(err);
      return;
    }
    
    console.log(`Folder ${folderPath} created`);
    if (callback) callback(null); // Indicate success by calling callback without an error
  });
}

function removeFolder(folderName) {
  
  const folderPath = path.join(relativePathTo_events_images, folderName);
  fs.rm(folderPath, { recursive: true }, (err) => {
    if (err) throw err;
    console.log(`Folder ${folderPath} removed`);
    unsavedEventFoldersList = unsavedEventFoldersList.filter(e => e !== folderName);
  });
}



async function copyFileToNewLoc(fileSourcePath, destinationPath) {
  try {
    
    // Read the file from the source path
    const fileData = fs.readFileSync(fileSourcePath); // note: no encoding is specified
    
    // Write the file to the destination path
    fs.writeFileSync(destinationPath, fileData); // writing file synchronously
    


  } catch (error) {
    console.error('Error copying image:', error);
  }
}


function deleteImageFile(event_and_image_names) {
  const imagePath = path.join(relativePathTo_events_images, event_and_image_names);

  // Check if the file exists before attempting to delete it
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File ${imagePath} does not exist.`);
      return;
    }

    // File exists, proceed with deletion
    fs.rm(imagePath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Failed to remove ${imagePath}:`, err);
        return;
      }
      console.log(`Image ${imagePath} removed`);
      unsavedImagesList = unsavedImagesList.filter(e => e !== event_and_image_names);
    });
  });
}

function processNewImage(imgSourcePath, event_folder_name, galleryDivID_of_addedImage, isLogo) {  
  let galleryDiv_of_addedImage = document.getElementById(galleryDivID_of_addedImage);
  galleryDiv_of_addedImage.id = galleryDiv_of_addedImage.id.slice(0, galleryDiv_of_addedImage.id.length - 3); // remove "new"
  
  const originalImageName = path.basename(imgSourcePath);
  const uniqueImageName = `img_${Date.now()}_${Math.floor(Math.random() * 1000000)}_${originalImageName}`;
  const destinationPath = path.join(relativePathTo_events_images, event_folder_name, uniqueImageName);
  copyFileToNewLoc(imgSourcePath, destinationPath);

  unsavedImagesList.push(path.join(event_folder_name, uniqueImageName));

  createImageElement(galleryDiv_of_addedImage, event_folder_name, uniqueImageName, isLogo);
}

function processNewCV(fileSourcePath, folderName) {
  const destinationPath = path.join(relativePathTo_events_images, '..', 'personal_CV_file.pdf');
  console.log(destinationPath);
  copyFileToNewLoc(fileSourcePath, destinationPath);


}



function createImageElement(galleryDiv_of_addedImage, event_folder_name, imageName, isLogo) {
  if (isLogo) {
      // Step 1: Identify and delete existing logo
      const existingLogo = galleryDiv_of_addedImage.querySelector('.logo-image');
      if (existingLogo) {
          // Assuming deleteImageFile handles the deletion logic, including server-side if applicable
          const existingImageName = existingLogo.getAttribute('data-image-name');
          if (existingImageName) {
              let event_and_image_names = path.join(event_folder_name, existingImageName);
              //deleteImageFile(event_and_image_names); // Delete the existing logo
              toBeDeletedImageList.push({
                path: event_and_image_names,
                galleryDivId: galleryDiv_of_addedImage.id,
                eventName: event_folder_name,
                imageName: imageName,
                isLogo: isLogo
              });// do not delete until the submit button gets hit
          }
          galleryDiv_of_addedImage.removeChild(existingLogo.parentNode); // Remove the container of the logo
      }

      // Step 2: Add the new logo
      // Creating a new container for the logo might be optional based on your specific needs
      const logoContainer = document.createElement('div');
      logoContainer.className = 'logo-container';

      const logoImg = document.createElement('img');
      logoImg.src = path.join(relativePathTo_events_images, event_folder_name, imageName);
      logoImg.alt = "Logo Image";
      logoImg.className = 'logo-image';
      logoImg.setAttribute('data-image-name', imageName); // Store image name for potential future deletion

      logoContainer.appendChild(logoImg);
      galleryDiv_of_addedImage.appendChild(logoContainer);
  } else {

      // Gallery image logic remains as before
      const imgContainer = document.createElement('div');
      imgContainer.className = 'image-container';

      const img = document.createElement('img');
      img.src = path.join(relativePathTo_events_images, event_folder_name, imageName);
      img.alt = `Gallery Image: ${imageName}`;
      img.className = 'gallery-image';

      const removeButton = document.createElement('button');
      removeButton.innerText = 'x';
      removeButton.classList.add("skill-delete-btn");
      removeButton.addEventListener('click', () => {
          galleryDiv_of_addedImage.removeChild(imgContainer);
          let event_and_image_names = path.join(event_folder_name, imageName);
          //deleteImageFile(event_and_image_names);
          toBeDeletedImageList.push({
            path: event_and_image_names,
            galleryDivId: galleryDiv_of_addedImage.id,
            eventName: event_folder_name,
            imageName: imageName,
            isLogo: isLogo
          });
           // do not delete until the submit button gets hit
      });

      imgContainer.appendChild(img);
      imgContainer.appendChild(removeButton);
      galleryDiv_of_addedImage.appendChild(imgContainer);
  }
}



// this is unique for this event since we prepend into secinfo: "sectionInfo.length - index"


// Function to add a delete button to an event
function addEventDeleteButton(eventDiv, index, sectionInfo, sectionId) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete Event';
  deleteButton.classList.add("event-delete-btn")
  deleteButton.addEventListener('click', () => {
    eventDiv.classList.add('fade-out');

    // Mark the folder for deletion
    toBeDeletedFolderList.push({
      folderName: sectionInfo[index].folder_name,
      sectionInfo: sectionInfo,
      sectionId: sectionId,
      eventIndex: index, // Store index to potentially reorder or restore UI elements
      eventData: sectionInfo[index] // Optionally store the entire event data if needed for restoration
    });

    // remove the div of the event, without removing the data in sectionInfo
    eventDiv.remove()

  });
  
  eventDiv.appendChild(deleteButton);
}

// Function to add a new event
function addNewEvent(sectionInfo, sectionId) {
  // Reading the existing events from the section
  const existingEvents = readEventsSection(sectionId);
  sectionInfo = [...existingEvents];

  const newEvent = {
    title: 'Your Company Name',
    event_name: 'Your Position/Role',
    date: 'Month Year - Month Year',
    description: ['Task or achievement 1', 'Task or achievement 2'],
    skills: ['Skill 1', 'Skill 2'],
    link: '',
    gallery: [], // hidden value
    folder_name: "", // hidden value
    logo: "" //hidden value
  };

  // Combining the title, timestamp, and a random number to form a unique folder name
  const folderName = `event_images_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

  // createFolder with a callback to ensure actions are taken after the folder is created
  createFolder(folderName, (err) => {
    if (err) {
      console.error('Failed to create folder for new event:', err);
      return; // Stop further execution
    }

    // Folder creation was successful

    // Storing the folderName in the event object
    newEvent.folder_name = folderName;

    // Prepend new event to the sectionInfo array
    sectionInfo = prepend(newEvent, sectionInfo);

    // Recreate the events section with the updated sectionInfo
    createEventsSection(sectionInfo, sectionId);

  });
}



// Function to create an individual event
// Function to create an individual event
function createEventDiv(event, index, sectionInfo, sectionId) {
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('eventDiv');
  

  // Create title for each event
  const eventTitle = document.createElement('h3');
  eventTitle.textContent = `Event ${sectionInfo.length - index}`; 
  eventDiv.appendChild(eventTitle);

  // Loop through keys in each event
  Object.keys(event).forEach((key) => {

    const keyDiv = document.createElement('div');
    keyDiv.classList.add('keyDiv');

    const keyLabel = document.createElement('label');
    keyLabel.textContent = formatName(key);
    keyLabel.htmlFor = `${key}-${index}`;
    keyDiv.appendChild(keyLabel);

    // Handle different types of key-value pairs
    if (key === 'description') {
        const textArea = document.createElement('textarea');
        textArea.id = `${key}-${index}`;
        textArea.value = event[key].join('\n'); // Join array into a multi-line string
        keyDiv.appendChild(textArea);
    } else if (key === "gallery") {
      const galleryDiv = document.createElement('div');
      galleryDiv.id = getGalleryDivIdOfEvent(event.folder_name);
      galleryDiv.className = 'gallery-container';
  
      event[key].forEach((imageName) => {
        createImageElement(galleryDiv, event.folder_name, imageName);
      });
  
      const addButton = document.createElement('button');
      addButton.innerText = '+';
      addButton.addEventListener('click', () => {
          galleryDiv.id = galleryDiv.id.concat("new");
          let galleryDivID_of_addedImage = galleryDiv.id;
          let event_folder_name = event.folder_name;
          const isLogo = false;
          requestImage(event_folder_name, galleryDivID_of_addedImage, isLogo)

      });
  
      keyDiv.appendChild(galleryDiv);
      keyDiv.appendChild(addButton); // Append outside of the galleryDiv
  } else if (key === 'logo') {
    // Create a container for the logo
    const logoContainer = document.createElement('div');
    logoContainer.id = getLogoContainerIdOfEvent(event.folder_name);
    logoContainer.className = 'logo-container';
  
    // If a logo already exists, display it
    if (event[key]) {
      createImageElement(logoContainer, event.folder_name, event[key], true); // Assuming the last parameter signifies 'isLogo'
    }
  
    // Create a replace button for the logo
    const replaceButton = document.createElement('button');
    replaceButton.textContent = 'Replace Logo';
    replaceButton.addEventListener('click', () => {
      let logoContainerID = logoContainer.id; // Use the container's current ID without alteration
      const isLogo = true; // Signify that this is for a logo, affecting how 'createImageElement' and 'requestImage' behave
      requestImage(event.folder_name, logoContainerID, isLogo); // No need to alter the ID like with the gallery
    });
  
    // Append the logo (if exists) and replace button to the logo container
    logoContainer.appendChild(replaceButton);
    keyDiv.appendChild(logoContainer); // Append the logo container to the keyDiv
  } else if (key === 'skills') {
      const skillsDiv = document.createElement('div');
      skillsDiv.classList.add('skillsDiv');
  
      const addButton = document.createElement('button');
      addButton.textContent = '+';
      skillsDiv.appendChild(addButton); // Append addButton as soon as you create it
  
      // Function to create skill input and its delete button
      function createSkillInput(parent, value, id) {
          const skillInput = document.createElement('input');
          skillInput.type = 'text';
          skillInput.value = value;
          skillInput.id = id;
          skillInput.placeholder = 'New Skill';
          skillInput.classList.add("a-skill-input")
  
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'x';
          deleteButton.classList.add("skill-delete-btn");
          
          parent.insertBefore(skillInput, addButton); // Insert before addButton
          parent.insertBefore(deleteButton, addButton); // Insert before addButton
          
          deleteButton.addEventListener('click', function() {
              if (skillsDiv.querySelectorAll('input').length <= 2) {
                  alert('You must have at least 2 skills. 😾');
                  return;
              }
              skillInput.remove();
              deleteButton.remove();
          });
      }
  
      if (event[key] && event[key].length >= 2) {
          event[key].forEach((skill, skillIndex) => {
              createSkillInput(skillsDiv, skill, `${key}-${index}_${skillIndex}`);
          });
      } else {
          alert('You must have at least 2 skills. 😾');
      }
  
      addButton.addEventListener('click', function() {
          const skillInputs = Array.from(skillsDiv.querySelectorAll('input'));
  
          if (skillInputs.length >= 10) {
              alert('You cannot add more than 10 skills. 😾');
              return;
          }
  
          if (skillInputs.some(input => input.value.trim().length === 0)) {
              alert('You must populate the empty skill field first. 😾');
              return;
          }
  
          // Create and add a new skill input with a delete button
          createSkillInput(skillsDiv, '', `${key}-${index}_${skillInputs.length}`);
      });
  
      keyDiv.appendChild(skillsDiv);
  } else if (Array.isArray(event[key])) {
        event[key].forEach((subValue, subIndex) => {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = `${key}-${index}_${subIndex}`;
        inputField.value = subValue;
        keyDiv.appendChild(inputField);
        });
    } else {
        const inputField = document.createElement('input');
        if (key === "folder_name") {
          inputField.type = 'hidden';
          keyLabel.textContent = '';

        } else {
          inputField.type = 'text';
        }

        inputField.id = `${key}-${index}`;
        inputField.value = event[key];
        keyDiv.appendChild(inputField);

        
    }

    eventDiv.appendChild(keyDiv);
  });
    
    
  // Add delete button and attach the event
  addEventDeleteButton(eventDiv, index, sectionInfo, sectionId);
  
  return eventDiv;
}


function readEventDiv(eventDiv){
  const event = {}; // Initialize an empty event object

  // Read text inputs and number inputs
  const inputs = eventDiv.querySelectorAll('input');
  inputs.forEach((input) => {
      const idComponents = input.id.split('-');
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
      const idComponents = textarea.id.split('-');
      const key = idComponents[0];
      const value = textarea.value.split('\n');
      event[key] = value;
  });

  // Read image names (for gallery)
  const galleryDiv = eventDiv.querySelector('.gallery-container');
  if (galleryDiv) {
      const imageElements = galleryDiv.querySelectorAll('img.gallery-image');
      const imageNames = [];
      imageElements.forEach((img) => {
          imageNames.push(path.basename(img.src)); // Storing src attribute, modify if you need to store something else
      });
      event['gallery'] = imageNames;
  }

  // Read logo image name, if present
  const logoImg = eventDiv.querySelector('img.logo-image');
  if (logoImg) {
      // Assuming the logo file name can be extracted from the src attribute
      const logoPath = new URL(logoImg.src).pathname;
      event['logo'] = path.basename(logoPath); // Assigning directly since only one logo is expected
  }

  return event;
}

  

// Main function to create the event section ( multiple events inside)
const createEventsSection = (sectionInfo, sectionId) => {
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
  for (let index =  0 ; index < sectionInfo.length; index++) {
      const event = sectionInfo[index];
      const eventDiv = createEventDiv(event, index, sectionInfo, sectionId);

      sectionDiv.appendChild(eventDiv);

      if (event.logo === "") {// if event has no log (ie. newly created evnt)
        processNewImage(path.join(relativePathTo_events_images, '..', 'blankImage.png'), event.folder_name, getLogoContainerIdOfEvent(event.folder_name), true);
      }
  }
};
  

  // Reading events from sections
function readEventsSection(sectionId) {
  const sectionDiv = document.getElementById(sectionId);
  const eventDivs = sectionDiv.querySelectorAll('.eventDiv');

  const events = Array.from(eventDivs).map(readEventDiv);

  return events;
}


// Main function to create the event section ( multiple events inside)
const createAboutSection = (sectionInfo, sectionId) => {
  const sectionDiv = document.getElementById(sectionId);
  sectionDiv.innerHTML = '';


  index = 0
  const event = sectionInfo[index];
  event.folder_name = "about_images";
  const eventDiv = createAboutDiv(event, index);
  sectionDiv.appendChild(eventDiv);
  
};

// Function to create an individual event
// **mainly for the about section gallery** (a downscaled version of createEventDiv() )
function createAboutDiv(event, index) {
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('eventDiv');
  

  // Create title for each event
  const eventTitle = document.createElement('h3');
  eventTitle.textContent = `About Section`; 
  eventDiv.appendChild(eventTitle);

  // Loop through keys in each event
  Object.keys(event).forEach((key) => {
    const keyDiv = document.createElement('div');
    keyDiv.classList.add('keyDiv');

    const keyLabel = document.createElement('label');
    keyLabel.textContent = formatName(key);
    keyLabel.htmlFor = `${key}-${index}`;
    keyDiv.appendChild(keyLabel);

    // Handle different types of key-value pairs
    if (key === "gallery") {
      const galleryDiv = document.createElement('div');
      galleryDiv.id = getGalleryDivIdOfEvent(event.folder_name);
      galleryDiv.className = 'gallery-container';
  
      event[key].forEach((imageName) => {
        createImageElement(galleryDiv, event.folder_name, imageName);
      });
  
      const addButton = document.createElement('button');
      addButton.innerText = '+';
      addButton.addEventListener('click', () => {
          galleryDiv.id = galleryDiv.id.concat("new");
          let galleryDivID_of_addedImage = galleryDiv.id;
          let event_folder_name = event.folder_name;
          
          requestImage(event_folder_name, galleryDivID_of_addedImage)

      });
  
      keyDiv.appendChild(galleryDiv);
      keyDiv.appendChild(addButton); // Append outside of the galleryDiv
    } else {
        const inputField = document.createElement('input');
        if (key === "folder_name") {
          inputField.type = 'hidden';
          keyLabel.textContent = '';
        } else {
          inputField.type = 'text';
        }

        inputField.id = `${key}-${index}`;
        inputField.value = event[key];
        keyDiv.appendChild(inputField);

        
    }

    eventDiv.appendChild(keyDiv);
  });
      
  return eventDiv;
}





module.exports = {
  createEventDiv,
  addNewEvent,
  createEventsSection,
  readEventsSection,
  createAboutSection
};
  




function formatName(unformattedName) {
  // Split the string by underscores
  const words = unformattedName.split('_');
  
  // Capitalize the first letter of each word and join them back together
  const formattedName = words.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' '); // Join with a space for display-friendly format
  
  return formattedName;
}


function getGalleryDivIdOfEvent(event_folder_name) {
  return `gallery-${event_folder_name}`;
}

function getLogoContainerIdOfEvent(event_folder_name) {
  return `logo-container-${event_folder_name}`;
}