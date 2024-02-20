const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Function to read notes from db.json file
function getNotes() {
  const data = fs.readFileSync(path.join(__dirname, 'db/db.json'), 'utf8');
  return JSON.parse(data) || [];
}

// Function to save notes to db.json file
function saveNotes(notes) {
  fs.writeFileSync(path.join(__dirname, 'db/db.json'), JSON.stringify(notes), 'utf8');
}

// Function to save a note to the database
function saveNoteToDB(newNote) {
  // Get existing notes
  const notes = getNotes();
  
  // Assign a unique ID to the new note
  newNote.id = uuidv4();
  
  // Add the new note to the list of notes
  notes.push(newNote);
  
  // Save the updated list of notes to the database
  saveNotes(notes);
  
  // Return the newly saved note
  return newNote;
}

module.exports = {
  getNotes,
  saveNotes,
  saveNoteToDB
};
