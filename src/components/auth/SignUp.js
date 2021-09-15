import React from 'react'
import { useHistory } from 'react-router'
import { signUp } from '../../lib/api'

const initialState = {
  username: '',
  firstname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

function Register(){

  const history = useHistory()
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signUp(formData)
      history.push('/login')
    } catch (error) {
      setFormErrors({ ...formErrors, ...error.response.data })
  
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
            <h3 className="has-text-centered">Lets get started</h3>
            <p className="has-text-centered">Sign up for an account</p>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className={`input ${formErrors.username ? 'is-danger' : ''}`}
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">First name</label>
              <div className="control">
                <input className="input"
                  placeholder="Your first name"
                  name="firstname"
                  onChange={handleChange}
                />
              </div>
            </div> 
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={`input ${formErrors.email ? 'is-danger' : ''}`}
                  placeholder="Email Address"
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  type="password"
                  className={`input ${formErrors.password ? 'is-danger' : ''}`}
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input
                  type="password"
                  className={`input ${formErrors.passwordConfirmation ? 'is-danger' : ''}`}
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <button type="submit" 
                className="button is-fullwidth">
                Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </section>

  )

}

export default Register