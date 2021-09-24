import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'

import { getUserProfile, getUserLikedImages } from '../../lib/api'

import ProfileNav from './ProfileNav'
import Loading from '../common/Loading'
import Error from '../common/Error'


function UserProfile(){
  const history = useHistory()
  const [user, setUser] = React.useState('')
  const [likedImages, setLikedImages] = React.useState([])
  const userId = useParams()
  const [isError, setIsError] = React.useState(false)
  const isLoading = !user && !isError
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

  React.useEffect(() => {

    const getData = async () => {
      try {
        const response = await getUserProfile()
        setUser(response.data)
        setLikedImages(response.data.likedImages)
      } catch (error) {
        setIsError(true)
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
      {isError && <Error />}
      {isLoading && <Loading />}
      {user && 
      <div>
        <div className="profile-header">
          <div className="profile-icons">
            <h4>Hi there, {user.username}</h4>
            <img className="profile-image" src={user.profileImage}/>
          </div>
        </div>
        <ProfileNav key={user.id} user={user} />
      </div>
      }
      <div className="columns is-multiline">
        { user && user.likedImages.map(image => {
          return (
            <div key={image.id} className="column is-one-quarter-desktop is-one-third-tablet">
              <animated.div style={props}>
                <figure className="user-favourite-figure">
                  <button 
                    onClick={handleRemove}
                    className="button unfavourite-button" 
                    id={image.source}
                    value={image.id}
                    aria-label="remove"
                  > X </button>
                  <img className="user-favourite" src={image.source}/>
                </figure>
              </animated.div>
            </div>
          )
        })}
      </div> 
    </section>
  )

}

export default UserProfile