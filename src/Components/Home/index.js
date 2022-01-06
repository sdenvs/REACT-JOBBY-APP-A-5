import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="home-content">
          <h1 className="home-heading">Find the Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the jobs that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button className="btn btn-primary">Find Jobs</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
