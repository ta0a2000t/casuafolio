
function prepend(value, array) {
  var newArray = array.slice();
  newArray.unshift(value);
  return newArray;
}

function createFolder(folderName) {

  const folderPath = path.join(__dirname, "..", "..", "casuafolio-react-app", "public", "events_images", folderName);
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) throw err;
    
    console.log(`Folder ${folderPath} created`);
  });
}

function removeFolder(folderName) {
  const folderPath = path.join(__dirname, "..", "..", "casuafolio-react-app", "public", "events_images", folderName);
  fs.rm(folderPath, { recursive: true }, (err) => {
    if (err) throw err;
    console.log(`Folder ${folderPath} removed`);
  });
}

// sourcePath example: '/Users/tahaal/Desktop/casuafolio_one_to_one_logo.png'
async function copyImageToFolder0(sourcePath, destinationFolder) {
  try {
    // Extract the image name from the source path
    const imageName = path.basename(sourcePath);
    
    // Define the destination path
    const destinationPath = path.join(destinationFolder, `img${Date.now()}_${Math.floor(Math.random() * 1000000)}`.concat(imageName));
    console.log(sourcePath)
    console.log(destinationFolder)
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^")

    // Ensure the destination folder exists
    //await fs.mkdir(destinationFolder, { recursive: true });
    
    // Read the file from the source path
    const fileData = await fs.readFile(sourcePath);
    console.log(fileData)
    // Write the file to the destination path
    fs.writeFileSync(destinationPath, fileData, function(err) {
      if (err) throw err;
        console.log(`Image copied to ${destinationPath}`);
    });
    
  } catch (error) {
    console.error('Error copying image:', error);
  }
}

async function copyImageToFolder(sourcePath, destinationFolder) {
  try {
    // Extract the image name from the source path
    const imageName = path.basename(sourcePath);
    
    // Define the destination path
    const destinationPath = path.join(destinationFolder, imageName);
    
    // Ensure the destination folder exists    
    // Read the file from the source path
    const fileData = fs.readFileSync(sourcePath); // note: no encoding is specified

    console.log(fileData)
    console.log("wwwwwww")
    
    // Write the file to the destination path
    fs.writeFileSync(destinationPath, fileData); // writing file synchronously
    


  } catch (error) {
    console.error('Error copying image:', error);
  }
}


function processNewImage(imgSourcePath, folder_name_of_addedImage, galleryDivID_of_addedImage) {  
  console.log("190228")
  console.log(folder_name_of_addedImage);
  console.log(galleryDivID_of_addedImage);
  let galleryDiv_of_addedImage = document.getElementById(galleryDivID_of_addedImage);
  console.log(galleryDiv_of_addedImage.id)

  galleryDiv_of_addedImage.id = galleryDiv_of_addedImage.id.slice(0, galleryDiv_of_addedImage.id.length - 3); // remove "new"
  console.log(galleryDiv_of_addedImage.id)
  console.log(folder_name_of_addedImage)

  let destinationFolder = path.join(__dirname, "..", "casuafolio-react-app", "public", "events_images", folder_name_of_addedImage);
  console.log(destinationFolder)
  console.log("^^^^")
  copyImageToFolder(imgSourcePath, destinationFolder);
  

  // creating image and inserting it into gallery div ////
  const imgContainer = document.createElement('div');
  imgContainer.className = 'image-container';

  const img = document.createElement('img');
  img.src = path.relative(__dirname, path.join(destinationFolder, path.basename(imgSourcePath)));
  img.alt = `Newly Added Image`;
  img.className = 'gallery-image';

  const removeButton = document.createElement('button');

  removeButton.innerText = 'x';
  removeButton.classList.add("skill-delete-btn");
  removeButton.addEventListener('click', () => {
    galleryDiv_of_addedImage.removeChild(imgContainer);
  });

  imgContainer.appendChild(img);
  imgContainer.appendChild(removeButton);
  galleryDiv_of_addedImage.appendChild(imgContainer);
  /////////////

};





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
    event_name: 'Your Position',
    date: 'Your Date Range',
    description: ['Task or achievement 1', 'Task or achievement 2'],
    skills: ['Skill 1', 'Skill 2'],
    gallery: [],
    link: 'Your Link'
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
  
      event[key].forEach((path, imgIndex) => {
          const imgContainer = document.createElement('div');
          imgContainer.className = 'image-container';
  
          const img = document.createElement('img');
          img.src = path;
          img.alt = `Image ${imgIndex}`;
          img.className = 'gallery-image';
  
          const removeButton = document.createElement('button');
          removeButton.classList.add("skill-delete-btn");
          removeButton.innerText = 'x';
          removeButton.addEventListener('click', () => {
              galleryDiv.removeChild(imgContainer);
          });
  
          imgContainer.appendChild(img);
          imgContainer.appendChild(removeButton);
          galleryDiv.appendChild(imgContainer);
      });
  
      const addButton = document.createElement('button');
      addButton.innerText = '+';
      addButton.addEventListener('click', () => {
          // Handle adding new images, e.g. open a dialog to select a new image and append it to galleryDiv
          // After the user selects a new image, create new img and imgContainer elements and append them to galleryDiv
          console.log(11)
          console.log( galleryDiv.id)
          console.log(99)
          galleryDiv.id = galleryDiv.id.concat("new");
          let galleryDivID_of_addedImage = galleryDiv.id;
          let folder_name_of_addedImage = event.folder_name;
          console.log(event)
          requestImage(folder_name_of_addedImage, galleryDivID_of_addedImage)

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
  