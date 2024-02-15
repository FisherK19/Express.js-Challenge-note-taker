let notes = [];

// Function to retrieve all notes
const retrieveNotes = () => {
    return Promise.resolve(notes);
};

// Function to add a new note
const addNote = (newNote) => {
    const note = {
        id: notes.length + 1,
        ...newNote
    };
    notes.push(note);
    return Promise.resolve(note);
};

// Function to delete a note by ID
const deleteNote = (id) => {
    notes = notes.filter(note => note.id !== parseInt(id));
    return Promise.resolve();
};

export default { retrieveNotes, addNote, deleteNote };
