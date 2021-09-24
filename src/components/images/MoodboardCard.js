import React from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'

import { getUserLikedImages } from '../../lib/api'
import Error from '../common/Error'

import outlineheart from '../../images/outlineheart.svg'
import filledheart from '../../images/filledheart.svg'

function MoodboardCard({ image }){

  const [likedImages, setLikedImages] = React.useState([])
  const [isLiked, setIsLiked] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } })

  const handleLike = async (e) => {
    const imageId = e.target.id
    setLikedImages(e.target.id)
    setIsLiked(true)
    try {
      await getUserLikedImages(imageId, likedImages)
    } catch (error) {
      setIsError(true)
    }
  }

  return (
    <>
      <div>
        {isError && <Error/>}
      </div>
      <div className="masonry-item" key={image.id}>
        <animated.div style={props}>
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
          <Link to={`/images/${image.id}/`}>
            <img className="masonry-image" src={image.source}/>
          </Link>
        </animated.div>
      </div>
    </>
  ) 


}

export default MoodboardCard