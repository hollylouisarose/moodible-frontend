import React from 'react'
import axios from 'axios'
import { getHeaders } from '../../lib/api'
import { Link } from 'react-router-dom'

function UserProfile(){

  const [user, setUser] = React.useState('')

  React.useEffect(() => {

    const getData = async () => {
      try {
        const response = await axios.get('/api/auth/profile', getHeaders())
        setUser(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, []) 

  console.log(user)

  return (
    <section key={user.id} className="section">
      {user && 
      <div>
        <h3 className="has-text-centered">Welcome back, {user.username}</h3>
        <Link to="/moodboard"> Moodboard</Link>
      </div>
      }
      <div className="columns is-multiline">
        { user && user.likedImages.map(image => {
          return (
            <div key={image.id} className="column is-one-quarter-desktop is-one-third-tablet">
              <img src={image.source}/>
            </div>
          )
        })}
      </div> 
    </section>
  )

}

export default UserProfile