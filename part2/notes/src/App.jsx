import { useEffect, useState } from 'react';
import loginService from './services/login';
import noteService from './services/notes';

import Footer from './components/Footer';
import Note from './components/Note';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Tooglable from './components/utils/Togglable';
import NoteForm from './components/NoteForm';

const App = () => {
  /*
   * Constants of the component
   */
  const loggedInUserKey = 'loggedNoteAppUser';

  /*
   * Helper functions of the component
   */
  const showMessage = ({ text, type }) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  /*
   * States of the component
   */
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showAllNotes, setShowAllNotes] = useState(true);
  const [message, setMessage] = useState(null);

  /*
   * Effects of the component
   */
  const fetchLoggedInUser = () => {
    const loggedUserJSON = window.localStorage.getItem(loggedInUserKey);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setAuthorizationWithToken(user.token);
    }
  };

  const fetchNoteHook = () => {
    noteService.getAll().then((response) => {
      setNotes(response);
    });
  };

  useEffect(fetchLoggedInUser, []);
  useEffect(fetchNoteHook, []);

  /*
   * Event handlers
   */
  const login = async ({ username, password }) => {
    const payload = { username, password };
    try {
      const user = await loginService.login(payload);
      window.localStorage.setItem(loggedInUserKey, JSON.stringify(user));
      setUser(user);
      noteService.setAuthorizationWithToken(user.token);
      showMessage({ text: 'Logged in successfully', type: 'success' });
    } catch (error) {
      showMessage({ text: error.response.statusText, type: 'error' });
    }
  };

  const addNote = async (newNoteObject) => {
    try {
      const returnedNote = await noteService.create(newNoteObject);
      setNotes(notes.concat(returnedNote));
      showMessage({ text: `Note: ${returnedNote.content} added`, type: 'success' });
    } catch (error) {
      showMessage({ text: error.response.statusText, type: 'error' });
    }
  };

  const handleToggleImportant = async (id) => {
    const note = notes.find((n) => n.id === id);
    const updateNote = { content: note.content, important: !note.important };

    try {
      const returnedNote = await noteService.update(id, updateNote);
      setNotes(notes.map((n) => (n.id === returnedNote.id ? returnedNote : n)));
      showMessage({ text: `Note: ${returnedNote.content} updated`, type: 'success' });
    } catch {
      showMessage({
        text: `The note: ${note.content} cannot be updated by current user`,
        type: 'error',
      });
    }
  };

  /*
   * Render the component
   */
  const notesToShow = showAllNotes ? notes : notes.filter((note) => note.important);

  const loginForm = () => {
    return (
      <Tooglable buttonLabel='Login'>
        <LoginForm login={login} />
      </Tooglable>
    );
  };

  const addNoteForm = () => {
    return (
      <Tooglable buttonLabel='Add Note'>
        <NoteForm addNote={addNote} />
      </Tooglable>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      {message && <Notification message={message} />}
      {user === null ? loginForm() : addNoteForm()}
      <div>
        <h2>All notes</h2>
        <button onClick={() => setShowAllNotes(!showAllNotes)}>
          Show {showAllNotes ? 'Important' : 'All'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleToggleImportant={() => handleToggleImportant(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
