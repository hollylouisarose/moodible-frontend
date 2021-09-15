import { Link } from 'react-router-dom'
import { getUserId } from '../../lib/auth'

function ProfileNav(){

  const userId = getUserId()

  return (
    <div className="navbar user-nav" role="navigation" aria-label="user navigation">
      <div className="navbar-brand">
        <div className="navbar-item ">
          <Link to="/choosemood"> Make a Moodboard</Link>
          <Link to={`/${userId}/notes`}>Your notes</Link>
          <Link to={`/${userId}`}>Your favourites</Link>
        </div>
      </div>
    
    </div>
  )



}

export default ProfileNav