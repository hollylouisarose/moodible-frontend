import React from 'react'
import { Link } from 'react-router-dom'
import moodboardimage from '../../images/moodboard.png'


function Home(){

  return (
    <section className="section">
      <div className="content">
        <div className="hero">
          <div className="columns">
            <div className="column is-half">
              <h3>Inspiration without information overwhelm.</h3>
              <p>Mood.ible generates a curated moodboard of five inspiring images, based on your chosen ‘mood’.</p>
              <p>You will never see more than five at a time, this give you time to savour each one, without disappearing down a rabbit hole.</p>
            </div>
            <div className="column is-half">
              <figure>
                <img src={moodboardimage} />
              </figure>
            </div>
          </div>
          <div className="columns">
            <div className="column is-half">
              <h3>Ideas strikes at weird times!</h3>
              <p>Your profile is the perfect place to store your favourite images and write your ideas down, ready for when you need them.</p>
            </div>
          </div>
        </div>

      </div>
      <div className="hero">
        <h3 className="has-text-centered">More focus, less scrolling</h3>
        <button className="cta-button button">
          <Link to="/signup">
            Sign Up
          </Link>
        </button>
      </div>
    </section>
    
  ) 


}

export default Home