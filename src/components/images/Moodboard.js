import React from 'react'

import { useParams } from 'react-router'
import { getAllImages } from '../../lib/api'
import { getUserId } from '../../lib/auth'

import Loading from '../common/Loading'
import Error from '../common/Error'
import MoodboardCard from './MoodboardCard'
import ProfileNav from '../user/ProfileNav'

function Moodboard(){
  const [images, setImages] = React.useState('')
  const mood = useParams()
  const userId = getUserId()
  const [isError, setIsError] = React.useState(false)
  const isLoading = !images && !isError

  React.useEffect(() => {

    const getData = async () => {
      try {
        const response = await getAllImages()
        setImages(response.data)
      } catch (error) {
        setIsError(true)
      }
    }
    getData()

  }, [])

  const selected = images && images.filter(image => {
    return image.mood.choice.toLowerCase().includes(mood.moodId)
  })

  const randomisedImages = () => {
    const images = []
    for (let index = 0; images.length < 5; index++) {
      const random = selected[Math.floor(Math.random() * selected.length)]
      if (!images.includes(random)){
        images.push(random)
      }
    }
    return images
    
  }

  return (
    <>
      {isError && <Error />}
      {isLoading && <Loading />}
      <ProfileNav key={userId} user={userId} />
      <div className="masonry">
        {images && randomisedImages().map(image => {
          return (
            <MoodboardCard key={image.id} image={image} />
          )  
        })}
      </div>
    </>
  ) 

}

export default Moodboard

