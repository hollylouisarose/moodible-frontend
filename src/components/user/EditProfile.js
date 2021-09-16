import React from 'react'


import Loading from '../common/Loading'
import Error from '../common/Error'
import { getUserProfile, editUserProfile } from '../../lib/api'
import { getUserId } from '../../lib/auth'

const intialState = {
  username: '',
  email: '',
  profileImage: '',
}

function EditProfile(){

  const userId = getUserId()
  const [formData, setFormData] = React.useState(intialState)
  const [formErrors, setFormErrors] = React.useState(intialState)
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

  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await editUserProfile(userId, formData)
    } catch (error) {
      setFormErrors({ ...formErrors, ...error.response.data })
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
                <input
                  className={`input ${formErrors.profileImage ? 'is-danger' : ''}`}
                  name="profileImage"
                  onChange={handleChange}
                  value={formData.profileImage}
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
    </section>)



}

export default EditProfile