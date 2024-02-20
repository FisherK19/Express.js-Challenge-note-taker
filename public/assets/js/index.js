// Define variables
let $noteTitle;
let $noteText;
let $saveNoteBtn;
let $newNoteBtn;
let $noteList;
let activeNote;

// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
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
});

// Function to get all notes from the server
const getNotes = () => {
  return fetch("/api/notes")
    .then(response => response.json())
    .catch(error => console.error('Error fetching notes:', error));
};

// Function to save a note to the server
const saveNote = (note) => {
  return fetch("/api/notes", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  })
  .then(response => response.json())
  .catch(error => console.error('Error saving note:', error));
};

// Function to delete a note from the server
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
  handleRenderSaveBtn(); 
};

// Function to handle saving a note
const handleNoteSave = () => {
  const newNote = {
    title: $noteTitle.value,
    text: $noteText.value
  };

  saveNote(newNote).then(savedNote => {
    console.log('Note saved successfully:', savedNote);
    getAndRenderNotes(); // Fetch and render the updated list of notes
  }).catch(error => {
    console.error('Error saving note:', error);
  });
};

// Function to handle deleting a note
const handleNoteDelete = (event) => {
  if (event.target.classList.contains('delete-note')) {
    const noteId = event.target.parentElement.dataset.id;
    deleteNote(noteId).then(() => {
      getAndRenderNotes(); // Fetch and render the updated list of notes
    }).catch(error => {
      console.error('Error deleting note:', error);
    });
  }
};

// Function to handle viewing a note
const handleNoteView = (event) => {
  const noteId = event.target.closest('.list-group-item').dataset.id;
  getNotes().then((notes) => {
    const selectedNote = notes.find(note => note.id === noteId);
    if (selectedNote) {
      $noteTitle.value = selectedNote.title;
      $noteText.value = selectedNote.text;
      renderActiveNote();
    }
  }).catch(error => {
    console.error('Error fetching notes:', error);
  });
};

// Function to handle viewing a new note
const handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  $saveNoteBtn.style.display = 'inline';
};

// Function to render the list of note titles
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

// Function to get notes from the server and render them to the sidebar
const getAndRenderNotes = () => {
  getNotes().then(renderNoteList).catch(error => {
    console.error('Error rendering notes:', error);
  });
};
