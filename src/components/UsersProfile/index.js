import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {FaCamera} from 'react-icons/fa'

import Header from '../Header'
import './index.css'

class UserProfile extends Component {
  state = {
    userDetails: [],
    storiesList: [],
    postsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getUsersProfileDetails()
  }

  getUsersProfileDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {userId} = params
    console.log(userId)

    const userProfileApiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
    const jwtToken = Cookies.get('jwt_token')

    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(userProfileApiUrl, option)
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
        userDetails: updatedData,
        storiesList: updatedData.stories,
        postsList: updatedData.posts,
        isLoading: false,
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
    const {
      userName,
      postsCount,
      followersCount,
      followingCount,
      userBio,
      profilePic,
    } = userDetails
    console.log(postsList)
    return (
      <div className="image-bg">
        <div className="profile-Details">
          <img src={profilePic} alt="user profile" className="profile-image" />
          <div>
            <p className="user-name">{userName}</p>
            <div className="follow-bg">
              <p>{postsCount} posts</p>
              <p>{followersCount} followers</p>
              <p>{followingCount} following</p>
            </div>
            <p>{userName}</p>
            <p>{userBio}</p>
          </div>
        </div>
        <ul className="stories-list">
          {storiesList.map(each => (
            <li key={each.id} className="story-item">
              <img src={each.image} alt="user story" className="story-image" />
            </li>
          ))}
        </ul>
        <div className="posts-container">
          <div className="posts-name">
            <img
              src="https://res.cloudinary.com/dewzkraqq/image/upload/v1684211234/Vectorvector_oahc0u.png"
              alt="vector"
              className="vector"
            />
            <p>Posts</p>
          </div>
          {postsList.length === 0 ? (
            <div className="no-posts-container">
              <FaCamera className="no-list" size={45} />
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
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <Header />
        {isLoading ? this.renderLoading() : this.renderProfileDetails()}
      </div>
    )
  }
}

export default UserProfile
