import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {BiCamera} from 'react-icons/bi'
import {BsGrid3X3} from 'react-icons/bs'

import Header from '../Header'
import './index.css'

const apiConstantStatus = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {
    userDetails: [],
    storiesList: [],
    postsList: [],

    apiStatus: apiConstantStatus.initial,
  }

  componentDidMount() {
    this.getUsersProfileDetails()
  }

  getUsersProfileDetails = async () => {
    this.setState({
      apiStatus: apiConstantStatus.in_progress,
    })
    const {match} = this.props
    console.log(this.props)
    const {params} = match
    const {userId} = params
    console.log(userId)

    const UserProfileAPIURL = `https://apis.ccbp.in/insta-share/users/${userId}`
    const jwtToken = Cookies.get('jwt_token')

    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(UserProfileAPIURL, option)
    const data = await response.json()
    const userDetails = data.user_details
    const profile = userDetails
    console.log(userDetails)
    if (response.ok === true) {
      const updatedData = {
        id: profile.id,
        followersCount: profile.followers_count,
        followingCount: profile.followers_count,
        posts: profile.posts,
        postsCount: profile.posts_count,
        profilePic: profile.profile_pic,
        stories: profile.stories.map(item => ({
          id: item.id,
          image: item.image,
        })),
        userBio: profile.user_bio,
        userId: profile.user_id,
        userName: profile.user_name,
      }

      const {stories} = updatedData.stories
      console.log(stories)
      this.setState({
        userDetails: profile,
        storiesList: profile.stories,
        postsList: profile.posts,
        apiStatus: apiConstantStatus.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiConstantStatus.failure,
      })
    }
  }

  renderLoading = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderProfileDetails = () => {
    const {userDetails, storiesList, postsList} = this.state

    return (
      <>
        <div className="image-bg">
          <div className="profile-Details">
            <img
              src={userDetails.profile_pic}
              alt="user profile"
              className="profile-image"
            />
            <div>
              <h1 className="user-name">{userDetails.user_name}</h1>
              <ul className="follow-bg">
                <li>
                  <p>
                    <span className="span-count">
                      {userDetails.posts_count}
                    </span>{' '}
                    posts
                  </p>
                </li>
                <li>
                  <p>
                    {' '}
                    <span className="span-count">
                      {userDetails.followers_count}
                    </span>{' '}
                    followers
                  </p>
                </li>
                <li>
                  <p>
                    <span className="span-count">
                      {userDetails.following_count}
                    </span>{' '}
                    following
                  </p>
                </li>
              </ul>
              <p>{userDetails.user_id}</p>
              <p>{userDetails.user_bio}</p>
            </div>
          </div>
          <ul className="stories-list">
            {storiesList.map(each => (
              <li key={each.id} className="story-item">
                <img
                  src={each.image}
                  alt="user story"
                  className="story-image"
                />
              </li>
            ))}
          </ul>
          <div className="posts-container">
            <div className="posts-name">
              <BsGrid3X3 />
              <h1>Posts</h1>
            </div>
            {postsList.length === 0 ? (
              <div className="no-posts-container">
                <BiCamera className="no-list" size={45} />
                <p className="no-posts">No Posts Yet</p>
              </div>
            ) : (
              <ul className="posts-list">
                {postsList.map(each => (
                  <li key={each.id}>
                    <img
                      src={each.image}
                      alt="user post"
                      className="post-image"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="mobile-container">
          <h1 className="user-name">{userDetails.user_name}</h1>
          <div className="mobile-image-container">
            <img
              src={userDetails.profile_pic}
              alt="my profile"
              className="mobile-profile-image"
            />
            <ul className="mobile-follow-bg">
              <li className="mobile-list-item">
                <p className="mobile-user-bio">{userDetails.posts_count} </p>
                <p>Posts</p>
              </li>
              <li>
                <p className="mobile-user-bio">{userDetails.followers_count}</p>
                <p>followers</p>
              </li>
              <li>
                <p className="mobile-user-bio">
                  {userDetails.following_count}{' '}
                </p>
                <p>following</p>
              </li>
            </ul>
          </div>
          <p className="mobile-user-bio">{userDetails.user_id}</p>
          <p>{userDetails.user_bio}</p>
          <ul className="stories-list">
            {storiesList.map(each => (
              <li key={each.id} className="story-item">
                <img src={each.image} alt="my story" className="story-image" />
              </li>
            ))}
          </ul>
          <div className="posts-container">
            <div className="posts-name">
              <BsGrid3X3 />
              <h1 className="posts">Posts</h1>
            </div>
            {postsList.length === 0 ? (
              <div className="no-posts-container">
                <BiCamera className="no-list" size={45} />
                <p className="no-posts">No Posts Yet</p>
              </div>
            ) : (
              <ul className="posts-list">
                {postsList.map(each => (
                  <li key={each.id}>
                    <img
                      src={each.image}
                      alt="my post"
                      className="mobile-post-image"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dewzkraqq/image/upload/v1683945695/Pathpath_gdzdyw.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button">Try again</button>
    </div>
  )

  renderUserProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderProfileDetails()
      case apiConstantStatus.failure:
        return this.renderFailure()
      case apiConstantStatus.in_progress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderUserProfile()}
      </div>
    )
  }
}

export default UserProfile
