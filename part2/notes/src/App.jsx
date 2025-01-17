import { useEffect, useState } from 'react'
import axios from 'axios'

import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const fetchNoteHook = () => {
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }

  useEffect(fetchNoteHook, [])

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const addNote = (e) => {
    e.preventDefault()
    const newNoteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    setNotes(notes.concat(newNoteObject))
    setNewNote('')
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} content={note.content} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
