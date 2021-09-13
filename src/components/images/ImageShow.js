import React from 'react'
import { useParams , useHistory } from 'react-router-dom'
import axios from 'axios'

import { getUserId } from '../../lib/auth'
import { getHeaders } from '../../lib/api'

function ImageShow(){
  const history = useHistory()
  const { imageId } = useParams()
  const [image, setImage] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/api/images/${imageId}`)
        setImage(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [imageId])

  console.log('before like', image)

  const handleLike = async () => {
    const userId = getUserId()
    if (!image.likedBy.includes(userId)){
      image.likedBy.push(userId)
    }

    try {
      await axios.post(`/api/images/${imageId}/like/`, image, getHeaders())
      history.push('/moodboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {image && <div key={image.id}>
        <button 
          onClick={handleLike}
          className="button favourite-button"
        >Like</button>
        <img src={image.source} />
      </div>}
    </>
  )


}

export default ImageShow