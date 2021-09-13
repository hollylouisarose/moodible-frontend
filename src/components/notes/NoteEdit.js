import React from 'react'
import axios from 'axios'
import { getHeaders } from '../../lib/api'
import { useParams, useHistory } from 'react-router'
import { getUserId } from '../../lib/auth'

const intialState = {
  title: '',
  text: '',
}

function NoteEdit(){
  const history = useHistory()
  const { noteId } = useParams()
  const userId = getUserId()
  const [formData, setFormData] = React.useState(intialState)

  React.useEffect(() => {

    const getData = async() => {

      try {
        const response = await axios.get(`/api/images/${userId}/notes/${noteId}/`, getHeaders() ) 
        setFormData(response.data)
      } catch (error) {
        console.log(error)
      }

    }

    getData()

  }, [])

  console.log('note form data', formData)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/api/images/${userId}/notes/${noteId}/`, formData, getHeaders())
      history.push(`/notes/${noteId}`)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter box"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Text</label>
              <div className="control">
                <textarea
                  type="text"
                  className="textarea"
                  name="text"
                  onChange={handleChange}
                  value={formData.text}
                />
              </div>
            </div>
            <div className="field">
              <button 
                type="submit" 
                className="button is-fullwidth login">
                Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )


}

export default NoteEdit