import React from 'react'
import axios from 'axios'
import { getHeaders } from '../../lib/api'

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

  console.log('user profile info', user)

  return <h2>User profile</h2>

}

export default UserProfile