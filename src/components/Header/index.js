import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'

import './index.css'

class Header extends Component {
  state = {
    searchInput: '',
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  render() {
    const {searchInput} = this.state
    const {history, searchFunction} = this.props

    const onClickLogout = () => {
      Cookies.remove('jwt_token')
      history.replace('/login')
    }

    const home = history.location.pathname === '/' ? 'color' : ''
    const profile = history.location.pathname === '/my-profile' ? 'color' : ''

    const onClickSearch = () => {
      searchFunction(searchInput)
    }

    return (
      <div className="header-container">
        <Link to="/" className="link">
          <div className="logo-bg">
            <img
              src="https://res.cloudinary.com/dewzkraqq/image/upload/v1683812736/Standard_Collection_8website-logo_btafhg.png"
              alt="website logo"
            />
            <h1 className="logo-title">Insta Share</h1>
          </div>
        </Link>

        <div className="right-container">
          <div className="search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search Caption"
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              className="search-icon"
              onClick={onClickSearch}
            >
              <FaSearch />
            </button>
          </div>
          <Link to="/" className="link">
            <p className={`link-text ${home}`}>Home</p>
          </Link>
          <Link to="/my-profile" className="link">
            <p className={`link-text ${profile}`}>Profile</p>
          </Link>

          <button type="button" className="logout-btn" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
