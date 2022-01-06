import Cookies from 'js-cookie'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Jobcard from '../Jobcard'
import RenderFailed from '../FailedView'
import './index.css'
import SalaryRange from '../SalaryRange'
import EmploymentType from '../EmploymentType'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobListStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failed: 'FAILED',
}

class Jobs extends Component {
  state = {
    profileData: {},
    jobsList: [],
    jobListStatus: jobListStatusList.initial,
    totalJobs: 0,
    jobType: new Set(),
    minPackage: '',
    searchText: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({jobListStatus: jobListStatusList.progress})
    const {jobType, minPackage, searchText} = this.state
    const JobTypesStr = [...jobType].join(',')

    const jwtToken = Cookies.get('jwt_token')
    const url1 = `https://apis.ccbp.in/jobs?employment_type=${JobTypesStr}&minimum_package=${minPackage}&search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url1, options)
    const data = await response.json()
    if (response.ok === true) {
      const modifData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: modifData,
        totalJobs: data.total,
        jobListStatus: jobListStatusList.success,
      })
    } else {
      this.setState({
        jobListStatus: jobListStatusList.failed,
      })
    }
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const modifData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileData: modifData})
    } else {
      this.setState({profileData: false})
    }
  }

  ChangeSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  renderSearchEl = () => {
    const {searchText} = this.state
    return (
      <div className="d-flex align-items-center search-container">
        <input
          onChange={this.ChangeSearchText}
          value={searchText}
          type="search"
          className="form-control search-input"
        />
        <button
          type="button"
          testid="searchButton"
          onClick={this.getJobsList}
          className="border-0 search-button"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderProfile = () => {
    const {profileData} = this.state
    if (profileData === false) {
      return (
        <div className="profile-retry">
          <button onClick={this.getProfileDetails} className="btn btn-primary">
            Retry
          </button>
        </div>
      )
    }
    return (
      <div className="profile-container">
        <img src={profileData.profileImageUrl} alt="profile" />
        <h1 className="profile-heading">{profileData.name}</h1>
        <p className="profile-para">{profileData.shortBio}</p>
      </div>
    )
  }

  employmentTypeFun = event => {
    const {jobType} = this.state
    const newValue = event.target.checked
    const Elvalue = event.target.value
    if (!jobType.has(Elvalue)) {
      this.setState(
        prev => ({jobType: prev.jobType.add(Elvalue)}),
        this.getJobsList,
      )
    } else {
      jobType.delete(Elvalue)
      this.setState({jobType}, this.getJobsList)
    }
  }

  renderTypesOfEmply = () => (
    <div>
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="ulList">
        {employmentTypesList.map(eachItem => (
          <EmploymentType
            employmentTypeFun={this.employmentTypeFun}
            eachItem={eachItem}
            key={eachItem.employmentTypeId}
          />
        ))}
      </ul>
    </div>
  )

  changeMinSalary = event => {
    this.setState({minPackage: event.target.value}, this.getJobsList)
  }

  renderSalaryRange = () => (
    <div>
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="ulList" id="salary" onChange={this.changeMinSalary}>
        {salaryRangesList.map(eachItem => (
          <SalaryRange eachItem={eachItem} key={eachItem.salaryRangeId} />
        ))}
      </ul>
    </div>
  )

  renderJobs = () => {
    const {jobsList, totalJobs} = this.state
    if (totalJobs > 0) {
      return (
        <ul className="ulList">
          {jobsList.map(eachItem => (
            <Jobcard details={eachItem} />
          ))}
        </ul>
      )
    }
    return (
      <div className="text-center">
        <img
          className="w-75"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h3>No Jobs Found</h3>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container text-center" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderResults = () => {
    const {jobListStatus} = this.state

    switch (jobListStatus) {
      case jobListStatusList.success:
        return this.renderJobs()
      case jobListStatusList.failed:
        return <RenderFailed />
      case jobListStatusList.progress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="content-container">
          <div className="jobs-content">
            <div className="d-md-none">{this.renderSearchEl()}</div>
            <div>{this.renderProfile()}</div>
            <hr className="hori-line" />
            {this.renderTypesOfEmply()}
            <hr className="hori-line" />
            {this.renderSalaryRange()}
          </div>
          <div className="jobsList">
            <div className="d-none d-md-block">{this.renderSearchEl()}</div>
            {this.renderResults()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
