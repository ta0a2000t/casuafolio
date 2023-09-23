
function prepend(value, array) {
  var newArray = array.slice();
  newArray.unshift(value);
  return newArray;
}

function createFolder(folderName) {
  unsavedEventFoldersList.push(folderName);
  const folderPath = path.join(relativePathTo_events_images, folderName);
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) throw err;
    
    console.log(`Folder ${folderPath} created`);
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



async function copyImageToNewLoc(imgSourcePath, destinationPath) {
  try {
    
    // Read the file from the source path
    const fileData = fs.readFileSync(imgSourcePath); // note: no encoding is specified
    
    // Write the file to the destination path
    fs.writeFileSync(destinationPath, fileData); // writing file synchronously
    


  } catch (error) {
    console.error('Error copying image:', error);
  }
}



function deleteImageFile(event_and_image_names) {
  // let event_and_image_names = path.join(event_folder_name, fileName);

  const folderPath = path.join(relativePathTo_events_images, event_and_image_names);
  fs.rm(folderPath, { recursive: true }, (err) => {
    if (err) throw err;
    console.log(`Image ${folderPath} removed`);
    unsavedImagesList = unsavedImagesList.filter(e => e !== event_and_image_names);
  });

}

function processNewImage(imgSourcePath, event_folder_name, galleryDivID_of_addedImage) {  
  let galleryDiv_of_addedImage = document.getElementById(galleryDivID_of_addedImage);
  galleryDiv_of_addedImage.id = galleryDiv_of_addedImage.id.slice(0, galleryDiv_of_addedImage.id.length - 3); // remove "new"
  
  const originalImageName = path.basename(imgSourcePath);
  const uniqueImageName = `img_${Date.now()}_${Math.floor(Math.random() * 1000000)}_${originalImageName}`;
  const destinationPath = path.join(relativePathTo_events_images, event_folder_name, uniqueImageName);
  
  copyImageToNewLoc(imgSourcePath, destinationPath);


  unsavedImagesList.push(path.join(event_folder_name, uniqueImageName));

  createImageElement(galleryDiv_of_addedImage, event_folder_name, uniqueImageName);
}


function createImageElement(galleryDiv_of_addedImage, event_folder_name, imageName) {
  
  // Creating image and inserting it into gallery div ////
  const imgContainer = document.createElement('div');
  imgContainer.className = 'image-container';

  const img = document.createElement('img');
  img.src = path.join('..', relativePathTo_events_images, event_folder_name, imageName);
  img.alt = `Gallery Image: ${imageName}`;
  img.className = 'gallery-image';

  const removeButton = document.createElement('button');
  removeButton.innerText = 'x';
  removeButton.classList.add("skill-delete-btn");
  
  removeButton.addEventListener('click', () => {
    galleryDiv_of_addedImage.removeChild(imgContainer);
    let event_and_image_names = path.join(event_folder_name, imageName);
      deleteImageFile(event_and_image_names);
  });

  imgContainer.appendChild(img);
  imgContainer.appendChild(removeButton);
  galleryDiv_of_addedImage.appendChild(imgContainer);
}





// Function to add a delete button to an event
function addEventDeleteButton(eventDiv, index, sectionInfo, sectionId) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add("event-delete-btn")
  deleteButton.addEventListener('click', () => {
    eventDiv.classList.add('fade-out');

    

    setTimeout(() => {
      removeFolder(sectionInfo[index].folder_name);

      sectionInfo.splice(index, 1);
      createEventsSection(sectionInfo, sectionId);
    }, 500);

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
  createFolder(folderName);

  // Storing the folderName in the event object
  newEvent.folder_name = folderName;



  // Prepend new event to the sectionInfo array
  sectionInfo = prepend(newEvent, sectionInfo);

  // Recreate the events section with the updated sectionInfo
  createEventsSection(sectionInfo, sectionId);
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
    keyLabel.textContent = key;
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
      galleryDiv.id = `gallery-${index}`;
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
                  alert('You must have at least 2 skills.');
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
          alert('You must have at least 2 skills.');
      }
  
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
  //console.log(event);

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
  }
};
  

  // Reading events from sections
function readEventsSection(sectionId) {
  const sectionDiv = document.getElementById(sectionId);
  const eventDivs = sectionDiv.querySelectorAll('.eventDiv');

  const events = Array.from(eventDivs).map(readEventDiv);

  return events;
}

module.exports = {
  createEventDiv,
  addNewEvent,
  createEventsSection,
  readEventsSection
};
  