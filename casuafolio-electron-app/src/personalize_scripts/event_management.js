

// Function to add a delete button to an event
function addEventDeleteButton(eventDiv, index, sectionInfo, sectionId) {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    eventDiv.classList.add('fade-out');
  
    setTimeout(() => {
      sectionInfo.splice(index, 1);
      createEventsSection(sectionInfo, sectionId);
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
  createEventsSection(sectionInfo, sectionId);
}



// Function to create an individual event
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

        // Create and add a new skill input with a delete button
        createSkillInput(skillsDiv, '', `${key}_${index}_${skillInputs.length}`);
    });
    
    skillsDiv.appendChild(addButton);

    // Function to create skill input and its delete button
    function createSkillInput(parent, value, id) {
        const skillInput = document.createElement('input');
        skillInput.type = 'text';
        skillInput.value = value;
        skillInput.id = id;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'x';
        deleteButton.addEventListener('click', function() {
            if (skillsDiv.querySelectorAll('input').length <= 2) {
                alert('You must have at least 2 skills.');
                return;
            }
            skillInput.remove();
            deleteButton.remove();
        });

        parent.appendChild(skillInput);
        parent.appendChild(deleteButton);
    }

    if (event[key] && event[key].length >= 2) {
        event[key].forEach((skill, skillIndex) => {
            createSkillInput(skillsDiv, skill, `${key}_${index}_${skillIndex}`);
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
  addEventDeleteButton(eventDiv, index, sectionInfo, sectionId);
  
  return eventDiv;
}


  

  

// Main function to create the section
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
  for (let index = 0 ; index < sectionInfo.length; index++) {
      const event = sectionInfo[index];
      const eventDiv = createEventDiv(event, index, sectionInfo, sectionId);
      sectionDiv.appendChild(eventDiv);
  }
};
  

  // Reading events from sections
function readEventsSection(sectionId) {
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

module.exports = {
  createEventDiv,
  addNewEvent,
  createEventsSection,
  readEventsSection
};
  