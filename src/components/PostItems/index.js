import {Component} from 'react'

import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

import './index.css'

class PostItems extends Component {
  state = {
    isLike: false,
  }

  componentDidMount() {
    this.postLikeStatus()
  }

  postLikeStatus = async () => {
    const {itemDetails} = this.props
    const {postId} = itemDetails
    const jwtToken = Cookies.get('jwt_token')
    const postApiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
    }

    const response = await fetch(postApiUrl, option)
    const data = await response.json()
    console.log(data)
  }

  onClickLike = () => {
    const {isLike} = this.state
    this.setState({
      isLike: !isLike,
    })
  }

  onClickDislike = () => {
    const {isLike} = this.state
    this.setState({
      isLike: !isLike,
    })
  }

  render() {
    const {isLike} = this.state
    const {itemDetails} = this.props
    const {
      postDetails,
      profilePic,
      userName,
      likesCount,
      comments,
      createdAt,
      userId,
    } = itemDetails
    return (
      <li className="user-post-list-item">
        <Link to={`/users/${userId}`} className="profile-link">
          <div className="profile-section">
            <div className="image-container">
              <img
                src={profilePic}
                alt="post author profile"
                className="profile-pic"
              />
            </div>
            <p className="profile-user-name">{userName}</p>
          </div>
        </Link>
        <img src={postDetails.imageUrl} alt="post" className="profile-post" />
        <div className="post-detail-and-stats-container">
          <div>
            {!isLike ? (
              <button
                type="button"
                onClick={this.onClickLike}
                className="user-post-button"
              >
                <BsHeart size={20} color="#262626" />
              </button>
            ) : (
              <button
                type="button"
                onClick={this.onClickDislike}
                className="user-post-button"
              >
                <FcLike size={20} color="red" />
              </button>
            )}

            <FaRegComment size={20} color="#475569" />

            <BiShareAlt size={20} color="475569" />
          </div>
          <p className="likes">{isLike ? likesCount + 1 : likesCount} likes</p>
          <p className="caption">{postDetails.caption}</p>
          {comments.map(comment => (
            <p key={comment.userId} className="comments">
              <span className="commented-user">{comment.userName} </span>
              <span className="user-comment">{comment.comment}</span>
            </p>
          ))}
          <p className="created-date">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default PostItems
