import React from 'react'
import { Link } from 'react-router-dom'

import { getAllNotes } from '../../lib/api'

import ProfileNav from '../user/ProfileNav'

import Loading from '../common/Loading'
import Error from '../common/Error'



function NotesIndex(){

  const [notes, setNotes] = React.useState([])
  const [isError, setIsError] = React.useState(false)
  const isLoading = !notes && !isError

  React.useEffect(() => {

    const getData = async () => {

      try {
        const response = await getAllNotes()
        setNotes(response.data.notesMade)
      } catch (error) {
        setIsError(true)
      }

    }

    getData()

  },[])

  return (
    <section className="section">
      <div className="container">
        <h4 className="has-text-centered">Your notes</h4>
        < ProfileNav />
        <Link className="button" to="/notes/new">Add a note</Link>
        {isError && <Error />}
        {isLoading && <Loading />}
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