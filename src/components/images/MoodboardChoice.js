import { useHistory } from 'react-router-dom'

function MoodboardChoice(){
  const history = useHistory()

  const handleChoice = (e) => {
    console.log(e.target.id)
    history.push(`/moodboard/${e.target.id}`)
  }

  return (
    <section className="section">
      <div className="div">
        <button 
          onClick={handleChoice}
          className="button"
          id="calm"> Calm
        </button>
        <button 
          onClick={handleChoice}
          className="button"
          id="playful"> Playful
        </button>
        <button 
          onClick={handleChoice}
          className="button"
          id="adventurous"> Adventurous
        </button>

      </div>



    </section>


  )

}

export default MoodboardChoice