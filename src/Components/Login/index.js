import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    usernameblur: false,
    passwordBlur: false,
    showError: false,
    error: '',
  }

  usernameBlurFun = () => {
    this.setState({usernameblur: true})
  }

  usernameChange = event => {
    this.setState({username: event.target.value})
  }

  usernameVerify = () => {
    const {usernameblur, username} = this.state
    if (usernameblur === true && username === '') {
      return <p className="error-msg">*Required</p>
    }
    return null
  }

  passwordVerify = () => {
    const {passwordBlur, password} = this.state
    if (passwordBlur === true && password === '') {
      return <p className="error-msg">*Required</p>
    }
    return null
  }

  passwordBlurFun = () => {
    this.setState({passwordBlur: true})
  }

  passwordChange = event => {
    this.setState({password: event.target.value})
  }

  formSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 7})
      history.replace('/')
    } else {
      this.setState({showError: true, error: data.error_msg})
    }
  }

  render() {
    const {username, password, error, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="form-bg-container">
        <form onSubmit={this.formSubmit} className="form-form">
          <div className="text-center mb-4">
            <img
              className="form-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="exampleInputEmail1">
              USERNAME
            </label>
            <input
              onBlur={this.usernameBlurFun}
              value={username}
              onChange={this.usernameChange}
              type="text"
              className="form-control form-input"
              id="exampleInputEmail1"
              placeholder="Username"
            />
            {this.usernameVerify()}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="exampleInputPassword1">
              PASSWORD
            </label>
            <input
              onBlur={this.passwordBlurFun}
              onChange={this.passwordChange}
              value={password}
              type="password"
              className="form-control form-input"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            {this.passwordVerify()}
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
          {showError && <p className="error-msg">{error}</p>}
        </form>
      </div>
    )
  }
}

export default Login
