import { Link } from 'react-router-dom'

function About(){

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-half-desktop is-two-thirds-tablet">
            <h3>Thanks for visiting mood.ible!</h3>
            <p>I made this site for my final project for my Software Engineering course at General Assembly</p>
            <p>At time of writing, I am about to graduate and will be looking for opportunities so if you would like to chat, get in touch:</p>
            <ul>
              <li>
                <Link to="https://www.linkedin.com/in/hstratton/">Linkedin</Link>
              </li>
              <li>
                <Link to="https://github.com/hollylouisarose">GitHub</Link>
              </li>
              <p>Thanks! Holly 🙂</p>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )


}

export default About