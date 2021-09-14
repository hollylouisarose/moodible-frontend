import React from 'react'
import axios from 'axios'
import MoodboardCard from './MoodboardCard'
import { useParams } from 'react-router'

// todo: 
// filter the images by mood
// randomly select 5
// set those 5 into state?


function Moodboard(){
  const [images, setImages] = React.useState('')
  const mood = useParams()
  const [randomFilteredImages, setRandomFilteredImages] = React.useState([])

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


  const selected = images && images?.filter(image => {
    return image.mood.choice.toLowerCase().includes(mood.moodId)
  })

  console.log(selected)


  function randomThree() {
    const nums = new Set()
    while (selected && nums.size < 5) {
      nums.add(Math.ceil(Math.random() * selected.length - 1))
    }
    console.log(nums)
    return [...nums]
  }
  const [first, second, third, fourth, fifth] = randomThree()

  return (

    <>
      { selected && 
      <div className="masonry">
        <div className="masonry-item">
          <img src={selected[first].source}/>
        </div>
        <div className="masonry-item">
          <img src={selected[second].source}/>
        </div>
        <div className="masonry-item">
          <img src={selected[third].source}/>
        </div>
        <div className="masonry-item">
          <img src={selected[fourth].source}/>
        </div>
        <div className="masonry-item">
          <img src={selected[fifth].source}/>
        </div>
      </div>
      }
    </>
  ) 

}

export default Moodboard

