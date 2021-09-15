import React from 'react'

import { getUserId } from '../../lib/auth'
import { addNote } from '../../lib/api'
import { useHistory } from 'react-router'

const initialState = {
  title: '',
  text: '',
}

function NoteNew(){
  const history = useHistory()
  const userId = getUserId()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await addNote(userId, formData)
      history.push(`/notes/${response.data.id}`)
    } catch (error) {
      setFormErrors({ ...formErrors, ...error.response.data })
      console.log(formErrors)
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
              {formErrors.title && 
                (<p className="error-text">{formErrors.title}</p>)}
              <div className="control">
                <input
                  className={`input ${formErrors.title ? 'is-danger' : ''}`}
                  name="title"
                  onChange={handleChange}
                  value={formData.title}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Text</label>
              {formErrors.text && 
                (<p className="error-text">{formErrors.text}</p>)}
              <div className="control">
                <textarea
                  type="text"
                  className={`textarea ${formErrors.title ? 'is-danger' : ''}`}
                  name="text"
                  placeholder="Your next big idea..."
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