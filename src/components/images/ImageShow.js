import React from 'react'
import { useParams , useHistory } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'

import { getUserId } from '../../lib/auth'
import { getSingleImage, favouriteImage } from '../../lib/api'
import Loading from '../common/Loading'
import Error from '../common/Error'
import outlineheart from '../../images/outlineheart.svg'


function ImageShow(){
  const history = useHistory()
  const { imageId } = useParams()
  const [image, setImage] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !image && !isError
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSingleImage(imageId)
        setImage(response.data)
      } catch (error) {
        console.log(error)
        setIsError(true)
      }
    }
    getData()
  }, [imageId])

  console.log()

  const handleLike = async () => {
    const userId = getUserId()
    if (!image.likedBy.includes(userId)){
      image.likedBy.push(userId)
    }

    try {
      const response = await favouriteImage(imageId, image)
      console.log(response)
      history.push(`/moodboard/${image.mood.choice.toLowerCase()}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section className="section">
        <div className="container">
          {isError && <Error />}
          {isLoading && <Loading />}
          {image && <div className="image-show" key={image.id}>
            <animated.div style={props}>
              <figure className="image-single">
                <button 
                  onClick={handleLike}
                  className="button show-favourite"
                  aria-label="like-button"
                >
                  <img alt="like-image" src={outlineheart} />
                </button>
                <img src={image.source} />
                <p className="has-text-centered">{image.description}</p>
              </figure>
            </animated.div>
          </div>}
        </div>  
      </section>
    </>
  )


}

export default ImageShow