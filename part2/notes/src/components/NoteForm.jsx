import { useState } from 'react';

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState('');
  const handleAddNote = (e) => {
    e.preventDefault();
    addNote({
      content: newNote,
      important: true,
    });
    setNewNote('');
  };
  return (
    <div>
      <h2>Add a new note</h2>
      <form onSubmit={handleAddNote}>
        <input value={newNote} onChange={({ target }) => setNewNote(target.value)} />
        <br />
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default NoteForm;
