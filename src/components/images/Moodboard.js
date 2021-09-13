import React from 'react'
import axios from 'axios'
import MoodboardCard from './MoodboardCard'

// todo: 
// add function to randomly select only 5 images from the data
// possibly needs to be called in the useEffect and defined outside of function

function Moodboard(){
  const [images, setImages] = React.useState('')

  React.useEffect(() => {

    const getData = async () => {
      try {
        const res = await axios.get('/api/images')
        setImages(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()

  }, [])

  const filteredImages = () => {
    return images.filter(image => {
      return image.mood.choice.toLowerCase().includes('adventurous')
    })
  }

  return (

    <div className="masonry">
      {images &&
        filteredImages().map(image => (
          <MoodboardCard key={image.id} image={image} />
        ))}
    </div>
  ) 

}

export default Moodboard

