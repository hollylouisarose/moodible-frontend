import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

import { setToken } from '../../lib/auth'
import { getPayload } from '../../lib/auth'


function Login(){
  const history = useHistory()
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getUserId = () => {
    const payload = getPayload()
    if (!payload) return false
    const userId = payload.sub
    return userId
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/login/', formData)
      setToken(response.data.token)
      const userId = getUserId()
      console.log('the user', userId)
      history.push(`/${userId}`)
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