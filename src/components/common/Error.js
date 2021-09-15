import { Link } from 'react-router-dom'

function Error() {
  return (
    <section className="section">
      <div className="container has-text-centered">
        <h2 className="title">Something went wrong... </h2>
        <Link to="/">Head back to home</Link>
      </div>
    </section>
  )
}

export default Error 