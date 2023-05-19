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

  onClickLike = async () => {
    const {isLike} = this.state
    this.setState({
      isLike: !isLike,
    })

    const {itemDetails} = this.props

    const {postId} = itemDetails.post_id
    const jwtToken = Cookies.get('jwt_token')
    const PostLikeAPIURL = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const likeStatus = {like_status: true}

    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(likeStatus),
    }

    const response = await fetch(PostLikeAPIURL, option)
    const data = await response.json()
    console.log(data)
  }

  onClickDisLike = async () => {
    const {isLike} = this.state
    this.setState({
      isLike: !isLike,
    })
    const {itemDetails} = this.props

    const {postId} = itemDetails.post_id
    const jwtToken = Cookies.get('jwt_token')
    const PostLikeAPIURL = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const likeStatus = {like_status: false}

    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify(likeStatus),
    }

    const response = await fetch(PostLikeAPIURL, option)
    const data = await response.json()
    console.log(data)
  }

  render() {
    const {isLike} = this.state
    const {itemDetails} = this.props

    return (
      <li className="user-post-list-item">
        <div className="profile-section">
          <div className="image-container">
            <img
              src={itemDetails.profile_pic}
              alt="post author profile"
              className="profile-pic"
            />
          </div>
          <Link to={`/users/${itemDetails.user_id}`} className="profile-link">
            <p className="profile-user-name">{itemDetails.user_name}</p>
          </Link>
        </div>

        <img
          src={itemDetails.post_details.image_url}
          alt="post"
          className="profile-post"
        />
        <div className="post-detail-and-stats-container">
          <div>
            {!isLike ? (
              <button
                type="button"
                onClick={this.onClickLike}
                className="user-post-button"
              >
                <BsHeart size={20} />
              </button>
            ) : (
              <button
                type="button"
                onClick={this.onClickDisLike}
                className="user-post-button"
              >
                <FcLike size={20} />
              </button>
            )}

            <FaRegComment size={22} color="#475569" className="comment-btn" />

            <BiShareAlt size={22} color="#475569" />
          </div>
          <p className="likes">
            {isLike ? itemDetails.likes_count + 1 : itemDetails.likes_count}
            likes
          </p>
          <p className="caption">{itemDetails.post_details.caption}</p>
          {itemDetails.comments.map(comment => (
            <div key={comment.userId} className="comments">
              <span className="commented-user">{comment.userName} </span>
              <p className="user-comment">{comment.comment}</p>
            </div>
          ))}
          <p className="created-date">{itemDetails.created_at}</p>
        </div>
      </li>
    )
  }
}

export default PostItems
