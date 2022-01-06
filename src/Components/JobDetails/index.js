import Cookies from 'js-cookie'
import {Component} from 'react'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {FiMapPin, FiExternalLink} from 'react-icons/fi'
import RenderFailed from '../FailedView'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const statusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failed: 'FAILED',
}

class JobDetails extends Component {
  state = {
    similarJobs: [],
    JobDetailsData: {},
    getJobDetailsStatus: statusList.initial,
  }

  componentDidMount() {
    this.getDetailsOfJob()
  }

  getDetailsOfJob = async () => {
    const {match} = this.props
    const {id} = match.params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const similarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      const JobDetailsData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
      }
      console.log(JobDetailsData.skills)
      this.setState({
        similarJobs,
        JobDetailsData,
        getJobDetailsStatus: statusList.success,
      })
    } else {
      this.setState({getJobDetailsStatus: statusList.failed})
    }
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state

    return (
      <ul className="ulList">
        {similarJobs.map(eachItem => (
          <SimilarJobCard details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderJobDetailsData = () => {
    const {JobDetailsData} = this.state
    const skills = JobDetailsData.skills.map(eachItem => ({
      imageUrl: eachItem.image_url,
      name: eachItem.name,
    }))
    const lifeAtList = {
      description: JobDetailsData.lifeAtCompany.description,
      imageUrl: JobDetailsData.lifeAtCompany.image_url,
    }
    return (
      <div>
        <div className="jobcard-bg">
          <div className="job-card-top">
            <div className="mr-2">
              <img
                className="company-logo"
                src={JobDetailsData.companyLogoUrl}
                alt={JobDetailsData.title}
              />
            </div>
            <div>
              <h1 className="job-card-heading">{JobDetailsData.title}</h1>
              <div className="d-flex">
                <BsFillStarFill className="star-icon" />
                <p>{JobDetailsData.rating}</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between job-card-details">
            <div className="d-flex align-items-center">
              <FiMapPin className="mr-1" />
              <p className="mr-3">{JobDetailsData.location}</p>
              <BsFillBriefcaseFill className="mr-2" />
              <p>{JobDetailsData.employmentType}</p>
            </div>
            <div>
              <p>{JobDetailsData.packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hori-line" />
          <div className="job-card-descrip">
            <div className="d-flex justify-content-between  mb-2">
              <p className="font-weight-bold"> Description</p>
              <a href={JobDetailsData.companyWebsiteUrl} className="d-flex">
                <p className="font-weight-bold">Visit</p>
                <FiExternalLink />
              </a>
            </div>
            <p>{JobDetailsData.jobDescription}</p>
          </div>
          <div>
            <p className="font-weight-bold">Skills</p>
            <ul className="ulList skillsList">
              {skills.map(eachItem => (
                <li className="skills-item-container">
                  <img
                    className="skills-logo"
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                  />
                  <p>{eachItem.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="font-weight-bold text-light">Life at Company</p>
          <p className="description mb-2">{lifeAtList.description}</p>
          <img className="w-100" src={lifeAtList.imageUrl} />
        </div>
        {this.renderSimilarJobs()}
      </div>
    )
  }

  renderResult = () => {
    const {getJobDetailsStatus} = this.state
    switch (getJobDetailsStatus) {
      case statusList.success:
        return this.renderJobDetailsData()
      case statusList.failed:
        return <RenderFailed />

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bgjobdetails">
        <Header />
        <div className="p-3">{this.renderResult()}</div>
      </div>
    )
  }
}

export default JobDetails
