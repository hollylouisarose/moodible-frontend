import React from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'

import { getUserId } from '../../lib/auth'
import { deleteNote, getSingleNote } from '../../lib/api'

import ProfileNav from '../user/ProfileNav'
import Loading from '../common/Loading'
import Error from '../common/Error'


function NoteShow(){
  const history = useHistory()
  const [note, setNote] = React.useState([])
  const { noteId }  = useParams()
  const userId = getUserId()
  const [isError, setIsError] = React.useState(false)
  const isLoading = !note && !isError
  
  React.useEffect(() => {

    const getData = async() => {

      try {
        const response = await getSingleNote(userId, noteId)
        setNote(response.data)
      } catch (error) {
        setIsError(true)
      }

    }

    getData()

  }, [userId, noteId])

  const handleDelete = async () => {
    await deleteNote(userId, noteId)
    history.push(`/${userId}/notes`)
  }


  return (
    <section className="section">
      <div className="container">
        <ProfileNav />
        {isError && <Error />}
        {isLoading && <Loading />}
        {note && 
        <>
          <div key={note.id}>
            <h4>{note.title}</h4>
            <p>{note.text}</p>
          </div>
          <button className="button">
            <Link to={`/notes/${noteId}/edit`}>
            Edit</Link>
          </button>
          <button 
            onClick={handleDelete}
            className="button"
          >Delete</button>
          <button 
            className="button">
            <Link to={`/${userId}/notes`}>
              Back to notes
            </Link>
          </button>
        </>
        }
      </div>
    </section>
  )

}

export default NoteShow