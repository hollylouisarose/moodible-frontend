import React from 'react'

import Loading from '../common/Loading'
import Error from '../common/Error'
import ImageUploadField from '../common/ImageUpload'
import { getUserProfile, editUserProfile } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import { useHistory } from 'react-router'

const initialState = {
  username: '',
  email: '',
  profileImage: '',
}

function EditProfile(){
  const history = useHistory()
  const userId = getUserId()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !formData && !isError

  React.useEffect(() => {

    const getData = async () => {
      try {
        const response = await getUserProfile()
        setFormData(response.data)
      } catch (error) {
        setIsError(true)
      }

    }
    getData()

  }, [setFormData])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageUpload = (imageUrl) => {
    setFormData({ ...formData, profileImage: imageUrl })
  }

  const removeImage = () => {
    setFormData({ ...formData, profileImage: '' })
    console.log('form data', formData)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await editUserProfile(userId, formData)
      history.push(`/${userId}`)
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
              <label className="label">Username</label>
              {formErrors.username && 
            (<p className="error-text">{formErrors.username}</p>)}
              <div className="control">
                <input
                  className={`input ${formErrors.username ? 'is-danger' : ''}`}
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              {formErrors.email && 
            (<p className="error-text">{formErrors.email}</p>)}
              <div className="control">
                <input
                  className={`input ${formErrors.email ? 'is-danger' : ''}`}
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Profile Image</label>
              {formErrors.profileImage && 
            (<p className="error-text">{formErrors.profileImage}</p>)}
              <div className="control">
                <ImageUploadField
                  className={`input ${formErrors.profileImage ? 'is-danger' : ''}`}
                  name="profileImage"
                  onChange={handleImageUpload}
                  value={formData.profileImage}
                />
                <div
                  onClick={removeImage}>
                  <a>Change Image</a>
                </div>
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
    </section>)



}

export default EditProfile