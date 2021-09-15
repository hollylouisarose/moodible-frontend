import React from 'react'
import { getUserProfile, getUserLikedImages } from '../../lib/api'
import { useParams, useHistory } from 'react-router-dom'
import ProfileNav from './ProfileNav'


function UserProfile(){
  const history = useHistory()
  const [user, setUser] = React.useState('')
  const [likedImages, setLikedImages] = React.useState([])
  const userId = useParams()

  React.useEffect(() => {

    const getData = async () => {
      try {
        const response = await getUserProfile()
        setUser(response.data)
        setLikedImages(response.data.likedImages)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [userId]) 

  const handleRemove = async (e) => {
    const imageId = e.target.value
    const updatedImages = likedImages.filter(image => {
      return image.source !== e.target.id
    })

    setLikedImages(updatedImages)

    try {
      await getUserLikedImages(imageId, likedImages)
      history.push(`/${userId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section key={user.id} className="section">
      {user && 
      <div>
        <div className="profile-header">
          <div className="profile-icons">
            <h4>Welcome back, {user.username}</h4>
            <img className="profile-image" src={user.profileImage}/>
          </div>
          <button className="button">Edit profile </button>
        </div>
        <ProfileNav key={user.id} user={user} />

      </div>
      }
      <div className="columns is-multiline">
        { user && user.likedImages.map(image => {
          return (
            <div key={image.id} className="column is-one-quarter-desktop is-one-third-tablet">
              <button 
                onClick={handleRemove}
                className="button unfavourite-button" 
                id={image.source}
                value={image.id}
              >
                Remove</button>
              <img src={image.source}/>
            </div>
          )
        })}
      </div> 
    </section>
  )

}

export default UserProfile