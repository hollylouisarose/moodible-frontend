import React from 'react'

function Login(){

  const handleChange = (e) => {
    console.log('value', e.target.value, 'name', e.target.name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <form
            className="column is-half is-offset-one-quarter box"
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
                onClick={handleSubmit}
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