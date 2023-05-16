import {Component} from 'react'

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShow: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      isShow: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const loginApiUrl = 'https://apis.ccbp.in/login'

    const {username, password} = this.state
    const userDetails = {username, password}

    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, option)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      return this.onSubmitSuccess(data.jwt_token)
    }
    return this.onSubmitFailure(data.error_msg)
  }

  render() {
    const {isShow, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dewzkraqq/image/upload/v1683812307/Layer_22x_ryknna.png"
          alt="website login"
          className="web-image"
        />
        <div className="from-container">
          <div className="logo-container">
            <img
              src="https://res.cloudinary.com/dewzkraqq/image/upload/v1683812736/Standard_Collection_8website-logo_btafhg.png"
              alt="website logo"
            />
            <h1 className="title">insta Share</h1>
          </div>
          <form className="form-bg" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="username"
              className="input"
              onChange={this.onChangeUsername}
            />
            <br />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="password"
              className="input"
              onChange={this.onChangePassword}
            />
            <br />
            {isShow ? <p className="error-msg">{errorMsg}</p> : ''}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
