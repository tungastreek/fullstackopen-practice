const Note = ( {note, handleToggleImportant} ) => {
  const label = note.important ? 'Make unimportant' : 'Make important'
  return (
    <li className="note">
      {note.content}
      <button onClick={handleToggleImportant}>{label}</button>
    </li>
  )
}

export default Note
