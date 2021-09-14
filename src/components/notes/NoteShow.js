import React from 'react'
import axios from 'axios'
import { useParams, useHistory, Link } from 'react-router-dom'
import { getUserId } from '../../lib/auth'
import { getHeaders } from '../../lib/api'


function NoteShow(){
  const history = useHistory()
  const [note, setNote] = React.useState([])
  const { noteId }  = useParams()
  const userId = getUserId()
  

  React.useEffect(() => {

    const getData = async() => {

      try {
        const response = await axios.get(`/api/images/${userId}/notes/${noteId}/`, getHeaders() ) 
        setNote(response.data)
      } catch (error) {
        console.log(error)
      }

    }

    getData()

  }, [])

  const handleDelete = async () => {
    await axios.delete(`/api/images/${userId}/notes/${noteId}/`, getHeaders())
    history.push(`/${userId}/notes`)
  }


  return (
    <section className="section">
      <div className="container">
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