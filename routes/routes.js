// Define variables
let $noteTitle;
let $noteText;
let $saveNoteBtn;
let $newNoteBtn;
let $noteList;
let activeNote;

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
  if (activeNote && activeNote.id) {
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
  handleRenderSaveBtn(); // Ensure save button is displayed correctly
};

// Get the note data from the inputs, save it to the db and update the view
const handleNoteSave = () => {
  const newNote = {
    title: $noteTitle.value,
    text: $noteText.value
  };

  saveNote(newNote).then(() => {
    // Clear input fields after saving
    $noteTitle.value = '';
    $noteText.value = '';

    // After saving, fetch and render the updated list of notes
    getAndRenderNotes().then((notes) => {
      // Find the newly saved note in the list
      const savedNote = notes.find(note => note.title === newNote.title && note.text === newNote.text);

      // Set the activeNote to the saved note
      activeNote = savedNote || {};

      // Render the active note
      renderActiveNote();
    });
  });
};

// Delete the clicked note
const handleNoteDelete = (event) => {
  if (event.target.classList.contains('delete-note')) {
    const noteId = event.target.parentElement.dataset.id;
    deleteNote(noteId).then(() => {
      getAndRenderNotes();
    });
  }
};

// Sets the activeNote and displays it
const handleNoteView = (event) => {
  const noteId = event.target.closest('.list-group-item').dataset.id;

  // Fetch the specific note using its ID
  getNotes()
    .then((notes) => {
      const selectedNote = notes.find((note) => note.id === noteId);

      // Set the activeNote to the selected note
      activeNote = selectedNote || {};

      // Populate the input fields with the selected note's data
      $noteTitle.value = activeNote.title || '';
      $noteText.value = activeNote.text || '';

      // Render the active note
      renderActiveNote();
    })
    .catch((error) => console.error('Error fetching notes:', error));
};

// Sets the activeNote to an empty object and allows the user to enter a new note
const handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  $saveNoteBtn.style.display = 'inline';
};

// Render the list of note titles
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
  return getNotes().then((notes) => {
    renderNoteList(notes);
    return notes; // Return the notes data
  });
};




