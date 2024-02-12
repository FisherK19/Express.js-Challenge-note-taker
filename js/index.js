// Define variables to store references to HTML elements
let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let clearBtn;
let noteList;

// Check if the current page path is '/notes'
if (window.location.pathname === '/notes') {
  // Assign references to HTML elements
  noteForm = document.querySelector('.note-form');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  clearBtn = document.querySelector('.clear-btn');
  noteList = document.querySelector('.list-container .list-group');

  // Event listener for clicking the Save Note button
  saveNoteBtn.addEventListener('click', handleNoteSave);

  // Event listener for clicking the New Note button
  newNoteBtn.addEventListener('click', handleNewNoteView);

  // Event listener for clicking the Clear button
  clearBtn.addEventListener('click', renderActiveNote);

  // Event listener for input events in the note form
  noteForm.addEventListener('input', handleRenderBtns);
}

// Function to fetch and render notes from the server
const getAndRenderNotes = () => {
  fetch('/api/notes')
    .then(response => response.json())
    .then(renderNoteList)
    .catch(error => console.error('Error fetching notes:', error));
};

// Function to render the list of note titles
const renderNoteList = (notes) => {
  noteList.innerHTML = ''; // Clear existing notes
  if (notes.length === 0) {
    noteList.innerHTML = '<li class="list-group-item">No saved notes</li>';
  } else {
    notes.forEach(note => {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.innerText = note.title;
      li.addEventListener('click', () => handleNoteView(note));
      noteList.appendChild(li);
    });
  }
};

// Function to handle saving a note
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value
  };
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newNote)
  })
    .then(response => response.json())
    .then(() => {
      getAndRenderNotes(); // Fetch and render updated notes
      renderActiveNote(); // Clear note form
    })
    .catch(error => console.error('Error saving note:', error));
};

// Function to handle viewing a note
const handleNoteView = (note) => {
  activeNote = note;
  renderActiveNote();
};

// Function to handle creating a new note view
const handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

// Function to render the active note
const renderActiveNote = () => {
  // Code to render active note in the right-hand column
};

// Function to render appropriate buttons based on note form state
const handleRenderBtns = () => {
  // Code to render appropriate buttons based on note form state
};

// Initial function call to fetch and render notes from the server
getAndRenderNotes();
