import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'
import {BiMenu} from 'react-icons/bi'

import './index.css'

class Header extends Component {
  state = {
    searchInput: '',
    isSearch: false,
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearch = () => {
    const {isSearch} = this.state
    this.setState({
      isSearch: !isSearch,
    })
  }

  render() {
    const {history, searchFunction} = this.props
    const {searchInput, isSearch} = this.state
    const onClickLogout = () => {
      Cookies.remove('jwt_token')
      history.replace('/login')
    }

    const searchInputFunction = () => {
      searchFunction(searchInput)
    }

    const home = history.location.pathname === '/' ? 'color' : ''
    const profile = history.location.pathname === '/my-profile' ? 'color' : ''

    return (
      <>
        <nav className="header-container">
          <Link to="/" className="link">
            <div className="logo-bg">
              <img
                src="https://res.cloudinary.com/dewzkraqq/image/upload/v1683812736/Standard_Collection_8website-logo_btafhg.png"
                alt="website logo"
              />
              <img
                src="https://res.cloudinary.com/dewzkraqq/image/upload/v1684475040/pngfind.com-instagram-png-23180_xsfyty.png"
                alt="website logo"
                className="insta-logo"
              />
            </div>
          </Link>

          <ul className="right-container header-links">
            <li className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search Caption"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-icon"
                onClick={searchInputFunction}
              >
                <FaSearch />
              </button>
            </li>

            <Link to="/" className="link">
              <li className={`link-text ${home}`}>Home</li>
            </Link>
            <Link to="/my-profile" className="link">
              <li className={`link-text ${profile}`}>Profile</li>
            </Link>
            <li>
              <button
                type="button"
                className="logout-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
          <div className="menu-container">
            <Popup
              modal
              trigger={
                <button type="button" className="list-button">
                  <BiMenu size={34} />
                </button>
              }
            >
              {close => (
                <div className="popup-container">
                  <button
                    type="button"
                    className="trigger-button"
                    onClick={() => close()}
                  >
                    Close
                  </button>
                  <ul className="popup-list">
                    <Link to="/" className="link">
                      <li className="list-item">Home</li>
                    </Link>
                    <Link to="/my-profile" className="link">
                      <li className="list-item">Profile</li>
                    </Link>
                    <li>
                      <button
                        type="button"
                        className="list-button"
                        onClick={this.onClickSearch}
                      >
                        Search
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="list-button"
                        onClick={onClickLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </Popup>
          </div>
        </nav>
        {isSearch && (
          <div className="mobile-search-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search Caption"
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              className="search-icon"
              onClick={searchInputFunction}
            >
              <FaSearch />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
