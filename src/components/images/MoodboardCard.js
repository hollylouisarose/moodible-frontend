import React from 'react'
import { Link } from 'react-router-dom'
import { getUserLikedImages } from '../../lib/api'

function MoodboardCard({ image }){

  const [likedImages, setLikedImages] = React.useState([])
  const [isLiked, setIsLiked] = React.useState(false)
  const button = document.querySelector('.favourite-button')

  const handleLike = async (e) => {
    const images = []
    const imageId = e.target.id
    images.push(imageId)
    setLikedImages(images)
    try {
      await getUserLikedImages(imageId, likedImages)
      setIsLiked(true)
      console.log('is liked', isLiked)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="masonry-item" key={image.id}>
      <>
        <button className="button favourite-button"
          id={image.id}
          onClick={handleLike}
        >{!isLiked ? 'Like' : 'Liked' }</button>
        <Link to={`/images/${image.id}`}>
          <img className="masonry-image" src={image.source}/>
        </Link>
      </>
    </div>


  ) 


}

export default MoodboardCard