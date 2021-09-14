import React from 'react'
import axios from 'axios'
import MoodboardCard from './MoodboardCard'
import { useParams } from 'react-router'

function Moodboard(){
  const [images, setImages] = React.useState('')
  const mood = useParams()

  React.useEffect(() => {

    const getData = async () => {
      try {
        const response = await axios.get('/api/images')
        setImages(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()

  }, [])

  const selected = images && images.filter(image => {
    return image.mood.choice.toLowerCase().includes(mood.moodId)
  })

  const randomisedImages = () => {
    let images = []
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
      <div className="masonry">
        {images && randomisedImages().map(image => {
          return (
            < MoodboardCard key={image.id} image={image}/>
          )  
        })}
      </div>
    </>
  ) 

}

export default Moodboard

