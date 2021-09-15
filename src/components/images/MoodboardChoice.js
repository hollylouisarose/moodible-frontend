import { useHistory } from 'react-router-dom'

function MoodboardChoice(){
  const history = useHistory()

  const handleChoice = (e) => {
    console.log(e.target.id)
    history.push(`/moodboard/${e.target.id}`)
  }

  return (
    <section className="section">
      <div className="choices">
        <button 
          onClick={handleChoice}
          className="button mood-choice"
          id="calm"> Calm
        </button>
        <button 
          onClick={handleChoice}
          className="button mood-choice"
          id="playful"> Playful
        </button>
        <button 
          onClick={handleChoice}
          className="button mood-choice"
          id="adventurous"> Adventurous
        </button>

      </div>



    </section>


  )

}

export default MoodboardChoice