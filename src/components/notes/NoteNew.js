import React from 'react'
import { getUserId } from '../../lib/auth'
import { addNote } from '../../lib/api'
import { useHistory } from 'react-router'

const intialState = {
  title: '',
  text: '',
}

function NoteNew(){
  const history = useHistory()
  const userId = getUserId()
  const [formData, setFormData] = React.useState(intialState)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await addNote(userId, formData)
      history.push(`/notes/${response.data.id}`)
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
                Save Note</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )



}

export default NoteNew