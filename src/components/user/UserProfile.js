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
      { user && user.likedImages.map(image => {
        return <img key={image.id} src={image.source}/>
      })}
    </section>
  )

}

export default UserProfile