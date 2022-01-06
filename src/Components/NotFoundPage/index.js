import Header from '../Header'
import './index.css'

const NotFoundPage = () => (
  <div className="notFound-bg">
    <Header />
    <div className="text-center mt-5 text-light p-3">
      <img
        className="not-found-img"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>we're sorry,the page you requested could not be found.</p>
    </div>
  </div>
)

export default NotFoundPage
