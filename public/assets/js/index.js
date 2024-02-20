// Add event listeners for saving and creating new notes when the page loads
window.addEventListener('load', function() {
  document.querySelector('.save-note').addEventListener('click', saveNote);
  document.querySelector('.new-note').addEventListener('click', createNewNote);
});

// Function to save a note
function saveNote() {
  var title = document.querySelector('.note-title').value;
  var text = document.querySelector('.note-textarea').value;

  if (title.trim() !== '' && text.trim() !== '') {
      var listItem = document.createElement('li');
      listItem.classList.add('list-group-item');

      var deleteButton = document.createElement('button');
      deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
      deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'float-end', 'delete-button');

      deleteButton.addEventListener('click', function(event) {
          event.stopPropagation();
          deleteNote(listItem);
      });

      listItem.addEventListener('click', function() {
          displayNoteContent(title, text);
      });

      listItem.appendChild(deleteButton);
      listItem.appendChild(document.createTextNode(title));

      document.getElementById('note-list').appendChild(listItem);

      saveToLocalStorage();

      document.querySelector('.note-title').value = '';
      document.querySelector('.note-textarea').value = '';
  } else {
      alert('Title and text cannot be empty!');
  }
}

// Function to create a new note
function createNewNote() {
  document.querySelector('.note-title').value = '';
  document.querySelector('.note-textarea').value = '';
}

// Function to delete a note
function deleteNote(listItem) {
  listItem.remove();
  saveToLocalStorage();
}

// Function to display note content
function displayNoteContent(title, text) {
  document.querySelector('.note-title').value = title;
  document.querySelector('.note-textarea').value = text;
}

// Function to save notes to local storage
function saveToLocalStorage() {
  var notes = [];
  var listItems = document.querySelectorAll('.list-group-item');
  listItems.forEach(function(item) {
      notes.push(item.textContent.trim());
  });
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes from local storage
function loadNotes() {
  var storedNotes = localStorage.getItem('notes');
  if (storedNotes) {
      var notes = JSON.parse(storedNotes);
      notes.forEach(function(note) {
          var listItem = document.createElement('li');
          listItem.classList.add('list-group-item');

          var deleteButton = document.createElement('button');
          deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
          deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'float-end', 'delete-button');

          deleteButton.addEventListener('click', function(event) {
              event.stopPropagation();
              deleteNote(listItem);
          });

          listItem.addEventListener('click', function() {
              displayNoteContent(note, '');
          });

          listItem.appendChild(deleteButton);
          listItem.appendChild(document.createTextNode(note));

          document.getElementById('note-list').appendChild(listItem);
      });
  }
}
