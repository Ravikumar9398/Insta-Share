import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dewzkraqq/image/upload/v1684220648/erroring_1_jukbgl.png"
      alt="page not found"
    />
    <h1 className="not-found-head">Page Not Found</h1>
    <p className="not-found-des">
      we are sorry, the page you requested could not be found.Please go back to
      the homepage.
    </p>
    <Link to="/" className="link">
      <button type="button" className="not-found-btn">
        Home page
      </button>
    </Link>
  </div>
)

export default NotFound
