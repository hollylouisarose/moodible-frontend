import React from 'react'
import { getAllImages } from '../../lib/api'

function ImageIndex(){
  const [images, setImages] = React.useState('')
  const [formData, setFormData] = React.useState({
    mood: '',
  })

  React.useEffect(() => {

    const getData = async () => {
      try {
        const res = await getAllImages()
        setImages(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()

  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const filteredImages = () => {
    return images.filter(image => {
      return image.mood.choice.toLowerCase().includes(formData.mood.toLowerCase())
    })
  }

  return (
    <>
      <div className="field">
        <label className="label">Filter by Mood</label> 
        <select 
          name="mood"
          onChange={handleChange}
          value={formData.size}
        >
          <option value=""> Select an option</option>
          <option value="calm"> Calm</option>
          <option value="adventurous"> Adventurous</option>
          <option value="playful"> Playful</option>
        </select>
      </div>
      <h2>test</h2>
      {images &&
        filteredImages().map(image => (
          <div key={image.id}>
            <img  src={image.source} />
            <p> {image.mood.choice}</p>
          </div>
        ))}
    </>
  ) 

}

export default ImageIndex