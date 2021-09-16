import React from 'react'

import { getSingleNote, editNote } from '../../lib/api'
import { useParams, useHistory } from 'react-router'
import { getUserId } from '../../lib/auth'

import Loading from '../common/Loading'
import Error from '../common/Error'
import { useForm } from '../../hooks/useForm'

const intialState = {
  title: '',
  text: '',
}

function NoteEdit(){
  const history = useHistory()
  const { noteId } = useParams()
  const userId = getUserId()
  const { formData, formErrors, setFormErrors, handleChange, setFormData } = useForm(intialState)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !formData && !isError
  

  React.useEffect(() => {

    const getData = async() => {
      try {
        const response = await getSingleNote(userId, noteId) 
        setFormData(response.data)
      } catch (error) {
        setIsError(true)
      }

    }
    getData()

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await editNote(userId, noteId, formData)
      history.push(`/notes/${noteId}`)
    } catch (error) {
      setFormErrors(error.response.data)
      console.log(formErrors)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          {isError && <Error />}
          {isLoading && <Loading />}
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
                  className={`textarea ${formErrors.text ? 'is-danger' : ''}`}
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