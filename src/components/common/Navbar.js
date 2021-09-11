import { Link, useLocation } from 'react-router-dom'
import React from 'react'

function Navbar(){

  const [isOpen, setIsOpen] = React.useState(false)
  const { pathname } = useLocation()

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])


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
                <>
                  <Link to="/signup">
                    Sign up
                  </Link>
                  <Link to="/login">
                    Login
                  </Link>
                </>
                {/* <button>Log Out</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )

}

export default Navbar