import React from 'react'
import { Link } from 'react-router-dom'

function MoodboardCard({ image }){


  return (

    <Link to={`/images/${image.id}`}>
      <div className="masonry-item" key={image.id}>
        <img className="masonry-image" src={image.source} />
      </div>
    </Link>
  ) 


}

export default MoodboardCard