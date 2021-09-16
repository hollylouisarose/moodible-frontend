import React from 'react'
import { useHistory } from 'react-router'

import { getUserId, setToken } from '../../lib/auth'
import { logIn } from '../../lib/api'


function Login(){
  const history = useHistory()
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  })
  const [isError, setIsError] = React.useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setIsError(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await logIn(formData)
      setToken(response.data.token)
      const userId = getUserId()
      history.push(`/${userId}`)
    } catch (error) {
      setIsError(true)
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
            <h3 className="has-text-centered">Log in</h3>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              {isError && 
              <p className="has-text-centered error">
                Oops! Incorrect login details</p>}
              <button 
                type="submit" 
                className="button is-fullwidth login">
                Login</button>
            </div>
          </form>
        </div>
      </div>
    </section>

  )


}

export default Login