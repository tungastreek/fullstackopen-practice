import { useEffect, useState } from 'react';
import loginService from './services/login';
import noteService from './services/notes';

import Footer from './components/Footer';
import Note from './components/Note';
import Notification from './components/Notification';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMsg, setErrorMsg] = useState('Some error has happened...');

  const fetchLoggedInUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
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
  useEffect(() => {
    setTimeout(() => setErrorMsg(null), 5000);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = { username, password };
    try {
      const user = await loginService.login(payload);
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
      setUser(user);
      noteService.setAuthorizationWithToken(user.token);
    } catch (error) {
      setErrorMsg(`Cannot login: ${error.response.statusText}`);
      setTimeout(() => setErrorMsg(null), 5000);
    }
    setUsername('');
    setPassword('');
  };

  const addNote = async (e) => {
    e.preventDefault();
    const newNoteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    try {
      const returnedNote = await noteService.create(newNoteObject);
      setNotes(notes.concat(returnedNote));
    } catch (error) {
      setErrorMsg(`The note could not be saved: ${error.response.statusText}`);
      setTimeout(() => setErrorMsg(null), 5000);
    }
    setNewNote('');
  };

  const handleToggleImportant = (id) => {
    const note = notes.find((n) => n.id === id);
    const updateNote = { content: note.content, important: !note.important };
    noteService
      .update(id, updateNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id === returnedNote.id ? returnedNote : n)));
      })
      .catch(() => {
        setErrorMsg(`The note: ${note.content} was already deleted from the server`);
        setTimeout(() => setErrorMsg(null), 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const loginForm = () => {
    return (
      <div>
        <h2>Please login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor='username'>Username: </label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <br />
          <label htmlFor='password'>Password: </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <br />
          <button type='submit'>Login</button>
        </form>
      </div>
    );
  };

  const addNoteForm = () => {
    return (
      <div>
        <h2>Add a new note</h2>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={({ target }) => setNewNote(target.value)} />
          <br />
          <button type='submit'>Save</button>
        </form>
      </div>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      {user === null ? loginForm() : addNoteForm()}
      <div>
        <h2>All notes</h2>
        <button onClick={() => setShowAll(!showAll)}>Show {showAll ? 'Important' : 'All'}</button>
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
