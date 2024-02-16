// Define variables
let $noteTitle;
let $noteText;
let $saveNoteBtn;
let $newNoteBtn;
let $noteList;

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Check window location
  if (window.location.pathname === '/notes') {
    // Select DOM elements
    $noteTitle = document.querySelector('.note-title');
    $noteText = document.querySelector('.note-textarea');
    $saveNoteBtn = document.querySelector('.save-note');
    $newNoteBtn = document.querySelector('.new-note');
    $noteList = document.querySelector('.list-container .list-group');

    // Event listeners for interacting with the notes
    $saveNoteBtn.addEventListener('click', handleNoteSave);
    $newNoteBtn.addEventListener('click', handleNewNoteView);
    $noteList.addEventListener('click', handleNoteView);
    $noteList.addEventListener('click', handleNoteDelete);
    $noteTitle.addEventListener('input', handleRenderSaveBtn);
    $noteText.addEventListener('input', handleRenderSaveBtn);

    // Fetch and render notes on page load
    getAndRenderNotes();
  }
});

// A function for getting all notes from the db
const getNotes = () => {
  return fetch("/api/notes")
    .then(response => response.json())
    .catch(error => console.error('Error fetching notes:', error));
};

// A function for saving a note to the db
const saveNote = (note) => {
  return fetch("/api/notes", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
  .catch(error => console.error('Error saving note:', error));
};

// A function for deleting a note from the db
const deleteNote = (id) => {
  return fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(error => console.error('Error deleting note:', error));
};

// If there is an activeNote, display it, otherwise render empty inputs
const renderActiveNote = () => {
  if (activeNote.id) {
    $noteTitle.readOnly = true;
    $noteText.readOnly = true;
    $noteTitle.value = activeNote.title;
    $noteText.value = activeNote.text;
  } else {
    $noteTitle.readOnly = false;
    $noteText.readOnly = false;
    $noteTitle.value = '';
    $noteText.value = '';
  }
  handleRenderSaveBtn();
};

// Get the note data from the inputs, save it to the db and update the view
const handleNoteSave = () => {
  const newNote = {
    title: $noteTitle.value,
    text: $noteText.value
  };

  saveNote(newNote).then(() => {
    // After saving, fetch and render the updated list of notes
    getAndRenderNotes();
    // Reset the active note and form fields
    activeNote = {};
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (event) => {
  const note = event.target.closest('.list-group-item').dataset;
  if (activeNote.id === note.id) {
    activeNote = {};
    renderActiveNote();
  }
  deleteNote(note.id).then(() => {
    getAndRenderNotes();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (event) => {
  activeNote = event.target.closest('.list-group-item').dataset;
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

// If a note's title or text are empty, hide the save button
// Or else show it
const handleRenderSaveBtn = () => {
  if (!$noteTitle.value.trim() || !$noteText.value.trim()) {
    $saveNoteBtn.style.display = 'none';
  } else {
    $saveNoteBtn.style.display = 'inline';
  }
};

const deleteNoteBtn = document.querySelector('.delete-note');
deleteNoteBtn.addEventListener('click', handleNoteDelete);

// Render's the list of note titles
const renderNoteList = (notes) => {
  $noteList.innerHTML = '';
  notes.forEach(note => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.dataset.id = note.id;
    li.innerHTML = `
      <span>${note.title}</span>
      <i class="fas fa-trash-alt float-right text-danger delete-note"></i>`;
    $noteList.appendChild(li);
  });
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => {
  getNotes().then(renderNoteList);
};
