import React from 'react'
import { useParams , useHistory } from 'react-router-dom'

import { getUserId } from '../../lib/auth'
import { getSingleImage, favouriteImage } from '../../lib/api'
import Loading from '../common/Loading'
import Error from '../common/Error'


function ImageShow(){
  const history = useHistory()
  const { imageId } = useParams()
  const [image, setImage] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !image && !isError

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
      await favouriteImage(imageId, image)
      history.push(`/moodboard/${image.mood.choice.toLowerCase()}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="section">
      <div className="container">
        {isError && <Error />}
        {isLoading && <Loading />}
        {image && <div key={image.id}>
          <button 
            onClick={handleLike}
            className="button favourite-button"
          >Like</button>
          <figure className="image-single">
            <img src={image.source} />
          </figure>
        </div>}
      </div>  
    </section>
  )


}

export default ImageShow