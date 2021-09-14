function MoodboardChoice(){


  const handleChoice = (e) => {
    console.log(e.target.id)
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