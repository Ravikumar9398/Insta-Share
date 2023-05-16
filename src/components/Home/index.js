import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import PostItems from '../PostItems'
import UsersStories from '../UsersStories'

import './index.css'

const apiConstantStatus = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  search: 'SEARCH',
}

class Home extends Component {
  state = {
    postDetails: [],
    apiStatus: apiConstantStatus.initial,
    searchInput: '',
    searchList: [],
  }

  componentDidMount() {
    this.getPostDetails()
  }

  searchInputFunction = async searchInput => {
    this.setState({
      apiStatus: apiConstantStatus.in_progress,
    })

    const usersPostApiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(usersPostApiUrl, option)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.posts.map(each => ({
        comments: each.comments.map(item => ({
          comment: item.comment,
          userName: item.user_name,
        })),
        createdAt: each.created_at,
        likesCount: each.likes_count,
        postDetails: {
          caption: each.post_details.caption,
          imageUrl: each.post_details.image_url,
        },
        postId: each.post_id,
        profilePic: each.profile_pic,
        userId: each.user_id,
        userName: each.user_name,
      }))

      this.setState({
        searchList: updatedData,
        apiStatus: apiConstantStatus.search,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiConstantStatus.failure,
      })
    }
  }

  getPostDetails = async () => {
    this.setState({
      apiStatus: apiConstantStatus.in_progress,
    })
    const {searchInput} = this.state
    console.log(searchInput)
    const usersPostApiUrl = 'https://apis.ccbp.in/insta-share/posts'

    const jwtToken = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(usersPostApiUrl, option)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedData = data.posts.map(each => ({
        comments: each.comments.map(item => ({
          comment: item.comment,
          userName: item.user_name,
        })),
        createdAt: each.created_at,
        likesCount: each.likes_count,
        postDetails: {
          caption: each.post_details.caption,
          imageUrl: each.post_details.image_url,
        },
        postId: each.post_id,
        profilePic: each.profile_pic,
        userId: each.user_id,
        userName: each.user_name,
      }))

      this.setState({
        postDetails: updatedData,
        apiStatus: apiConstantStatus.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiConstantStatus.failure,
      })
    }
  }

  renderSearch = () => {
    const {searchList} = this.state
    if (searchList.length === 0) {
      return (
        <div className="no-search-container">
          <img
            src="https://res.cloudinary.com/dewzkraqq/image/upload/v1684219584/Group_atx2s4.png"
            alt="no search found"
            className="no-search-img"
          />
          <h1 className="no-search-head">Search Not Found</h1>
          <p className="no-search-des">Try different keyword or search again</p>
        </div>
      )
    }
    return (
      <div>
        <h1>Search Results</h1>
        <ul>
          {searchList.map(each => (
            <PostItems itemDetails={each} key={each.postId} />
          ))}
        </ul>
      </div>
    )
  }

  renderSuccess = () => {
    const {postDetails} = this.state

    return (
      <ul>
        {postDetails.map(each => (
          <PostItems itemDetails={each} key={each.postId} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://res.cloudinary.com/dewzkraqq/image/upload/v1683945695/Pathpath_gdzdyw.png"
        alt="no result"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button">Try again</button>
    </div>
  )

  renderLoading = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderPostItems = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderSuccess()
      case apiConstantStatus.search:
        return this.renderSearch()
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
        <Header searchFunction={this.searchInputFunction} />
        <div className="below-container">
          <UsersStories />
          {this.renderPostItems()}
        </div>
      </div>
    )
  }
}

export default Home
