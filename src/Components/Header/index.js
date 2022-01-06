import {BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillHome, AiOutlineLogout} from 'react-icons/ai'

import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props

  const logoutFun = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-bg navbar">
      <div>
        <Link to="/">
          <img
            className="header-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>
      <ul className="d-md-none ulList1">
        <li>
          <Link to="/">
            <AiFillHome className="header-icon" />
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <BsFillBriefcaseFill className="header-icon" />
          </Link>
        </li>
        <li>
          <button onClick={logoutFun} className="border-0 bg-transparent">
            <AiOutlineLogout className="header-icon" />
          </button>
        </li>
      </ul>

      <ul className="d-none d-md-flex ulList2">
        <li>
          <Link className="md-Link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="md-Link" to="/jobs">
            Jobs
          </Link>
        </li>
        <li className="ml-5">
          <button onClick={logoutFun} className="btn btn-primary ml-5">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
