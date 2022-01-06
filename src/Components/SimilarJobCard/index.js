import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {FiMapPin} from 'react-icons/fi'

import './index.css'

const SimilarJobCard = props => {
  const {details} = props
  return (
    <div className="jobcard-bg">
      <div className="job-card-top">
        <div className="mr-2">
          <img
            className="company-logo"
            src={details.companyLogoUrl}
            alt={details.title}
          />
        </div>
        <div>
          <h1 className="job-card-heading">{details.title}</h1>
          <div className="d-flex">
            <BsFillStarFill className="star-icon" />
            <p>{details.rating}</p>
          </div>
        </div>
      </div>
      <div className="job-card-descrip mb-2">
        <p className="font-weight-bold"> Description</p>
        <p>{details.jobDescription}</p>
      </div>
      <div className="d-flex justify-content-between job-card-details">
        <div className="d-flex align-items-center">
          <FiMapPin className="mr-1" />
          <p className="mr-3">{details.location}</p>
          <BsFillBriefcaseFill className="mr-2" />
          <p>{details.employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobCard
