import {Component} from 'react'

import Cookies from 'js-cookie'
import {FaCamera} from 'react-icons/fa'

import Header from '../Header'

import './index.css'

class MyProfile extends Component {
  state = {
    userDetails: [],
    storiesList: [],
    postsList: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const profileDetailsApiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const jwtToken = Cookies.get('jwt_token')

    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(profileDetailsApiUrl, option)
    const data = await response.json()
    const {profile} = data
    console.log(profile)
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
      })
    }
  }

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
          <img src={profilePic} alt="my profile" className="profile-image" />
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
              <img src={each.image} alt="my story" className="story-image" />
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
                  <img src={each.image} alt="my post" className="post-image" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="profile-container">
        <Header />
        {this.renderProfileDetails()}
      </div>
    )
  }
}

export default MyProfile
