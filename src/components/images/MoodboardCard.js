import React from 'react'
import { Link } from 'react-router-dom'

import { getUserLikedImages } from '../../lib/api'

import outlineheart from '../../images/outlineheart.svg'
import filledheart from '../../images/filledheart.svg'

function MoodboardCard({ image }){

  const [likedImages, setLikedImages] = React.useState([])
  const [isLiked, setIsLiked] = React.useState(false)

  const handleLike = async (e) => {
    const imageId = e.target.id
    setLikedImages(e.target.id)
    setIsLiked(true)
    try {
      await getUserLikedImages(imageId, likedImages)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="masonry-item" key={image.id}>
      <>
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
        <Link to={`/images/${image.id}`}>
          <img className="masonry-image" src={image.source}/>
        </Link>
      </>
    </div>


  ) 


}

export default MoodboardCard