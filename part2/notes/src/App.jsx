import { useEffect, useState } from 'react'
import noteService from './services/notes'

import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState('Some error has happened...')

  const fetchNoteHook = () => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }

  useEffect(fetchNoteHook, [])
  useEffect(() => { 
    setTimeout(() => setErrorMsg(null), 5000)
  }, [])

  const addNote = (e) => {
    e.preventDefault()
    const newNoteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService
      .create(newNoteObject)
      .then(returnedNotes => {
        setNotes(notes.concat(returnedNotes))
        setNewNote('')
      })
  }

  const handleToggleImportant = (id) => {
    const note = notes.find(n => n.id === id)
    const newNote = { ...note, important: !note.important }
    noteService
      .update(id, newNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id === returnedNote.id ? returnedNote : n))
      })
      .catch(error => {
        setErrorMsg(`The note: ${note.content} was already deleted from the server`)
        setTimeout(() => setErrorMsg(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            handleToggleImportant={() => handleToggleImportant(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <br />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
