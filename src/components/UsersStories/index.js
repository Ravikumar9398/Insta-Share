import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 8,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 512,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
}

class UserStories extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userStories: [],
  }

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const UserStoriesAPIURL = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(UserStoriesAPIURL, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = await fetchedData.users_stories.map(userStory => ({
        storyUrl: userStory.story_url,
        userId: userStory.user_id,
        userName: userStory.user_name,
      }))

      this.setState({
        userStories: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSlider = () => {
    const {userStories} = this.state

    return (
      <ul className="slick-container">
        <Slider {...settings}>
          {userStories.map(eachLogo => {
            const {userId, storyUrl, userName} = eachLogo
            return (
              <li className="slick-item" key={userId}>
                <img className="logo-image" src={storyUrl} alt="user story" />
                <p className="user-story-name">{userName}</p>
              </li>
            )
          })}
        </Slider>
      </ul>
    )
  }

  renderSuccessView = () => (
    <div className="main-container">{this.renderSlider()}</div>
  )

  onClickTryAgainButton = () => this.getUserStories()

  renderFailureView = () => (
    <div className="main-container">
      <h1>Failure View</h1>
      <p>Something went wrong. Please try again</p>
      <img
        src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662435108/InstaShare/SomethingWentWrong_glggye.png"
        alt="failure view"
        className="failure-view-image"
      />
      <button type="button" onClick={this.onClickTryAgainButton}>
        Try again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default UserStories
