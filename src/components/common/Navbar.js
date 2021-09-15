import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { removeToken, isAuthenticated, getUserId } from '../../lib/auth'

function Navbar(){
  const isAuth = isAuthenticated()
  const history = useHistory()
  const [isOpen, setIsOpen] = React.useState(false)
  const { pathname } = useLocation()
  const userId = getUserId()

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <h2>mood.ible</h2>
          </Link>
          <span
            className={`navbar-burger ${isOpen ? 'is-active' : ''}`}
            onClick={handleToggle}>
            <span />
            <span />
            <span />
          </span>
        </div>
        <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {!isAuth && (
                  <>
                    <Link to="/signup">
                      <button className="button">
                    Sign up
                      </button>
                    </Link>
                    <Link to="/login">
                      <button className="button">
                      Login
                      </button>
                    </Link>
                  </>
                )}
                {isAuth && (
                  <div className="buttons">
                    <button className="button" onClick={handleLogout}>
                    Logout
                    </button>
                    <Link to={`/${userId}`}>
                      <button className="button">
                      Profile
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )

}

export default Navbar