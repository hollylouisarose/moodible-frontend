import React from 'react'
import { useParams , useHistory } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'

import { getUserId } from '../../lib/auth'
import { getSingleImage, favouriteImage } from '../../lib/api'
import Loading from '../common/Loading'
import Error from '../common/Error'

import outlineheart from '../../images/outlineheart.svg'
import filledheart from '../../images/filledheart.svg'


function ImageShow(){
  const history = useHistory()
  const { imageId } = useParams()
  const [image, setImage] = React.useState(null)
  const [isLiked, setIsLiked] = React.useState(false)
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
      setIsLiked(true)
      setTimeout(() => {
        history.push(`/moodboard/${image.mood.choice.toLowerCase()}`)
      }, 400)
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
                {isLiked ? 
                  <button className="favourite-button button" id={image.id}>
                    <img 
                      src={filledheart}
                      id={image.id}
                      alt="like-button"
                      onClick={handleLike} />
                  </button>
                  :
                  <button className="favourite-button button" id={image.id}>
                    <img 
                      src={outlineheart} 
                      id={image.id}
                      onClick={handleLike}
                      alt="like-button"
                    />
                  </button>
                }
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