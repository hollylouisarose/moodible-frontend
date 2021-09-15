import React from 'react'
import { getAllNotes } from '../../lib/api'
import { Link } from 'react-router-dom'


function NotesIndex(){

  const [notes, setNotes] = React.useState([])
  React.useEffect(() => {

    const getData = async () => {

      try {
        const response = await getAllNotes()
        setNotes(response.data.notesMade)
      } catch (error) {
        console.log(error)
      }

    }

    getData()

  },[])

  return (
    <section className="section">
      <div className="container">
        <h4 className="has-text-centered">Your notes</h4>
        <Link className="button" to="/notes/new">Add a note</Link>
        {notes && notes.map(note =>{
          return (
            <div key={note.id}>
              <ul>
                <Link to={`/notes/${note.id}`}>
                  <li>{note.title}</li>
                </Link>
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )

}

export default NotesIndex