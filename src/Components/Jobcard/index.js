import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {FiMapPin} from 'react-icons/fi'
import './index.css'

const Jobcard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <li className="jobcard-bg">
      <Link to={`/jobs/${id}`}>
        <div className="job-card-top">
          <div className="mr-2">
            <img className="company-logo" src={companyLogoUrl} alt={title} />
          </div>
          <div>
            <h1 className="job-card-heading">{title}</h1>
            <div className="d-flex">
              <BsFillStarFill className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between job-card-details">
          <div className="d-flex align-items-center">
            <FiMapPin className="mr-1" />
            <p className="mr-3">{location}</p>
            <BsFillBriefcaseFill className="mr-2" />
            <p>{employmentType}</p>
          </div>
          <div>
            <p>{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="hori-line" />
        <div className="job-card-descrip">
          <p className="font-weight-bold"> Description</p>
          <p>{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default Jobcard
