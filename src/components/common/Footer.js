import { Link } from 'react-router-dom'

function Footer(){
  return (
    <footer className="footer">
      <div className="container has-text-centered">
        <div className="links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Register</Link>
          <Link to="/about">About</Link>
        </div>
        <p> 
            Made by <a href="https://github.com/hollylouisarose">
            Holly Stratton 2021</a>
        </p> 
      </div>
    </footer>
  )
}

export default Footer