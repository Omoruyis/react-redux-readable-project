import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { removePost, updatePost, addPost, fetchPost, incrementPost, decreasePost } from '../actions/posts'
import Modal from 'react-modal'

class Posts extends Component {
    state= {
      openModal: false,
      currentPost: {}
    }

    update = (type, query) => {
      this.setState((state) => ({
        currentPost: {
          ...state.currentPost,
          [type]: query,
        }
      }))
    }

    componentDidMount() {
      this.props.fetchPost()
    }

    editButton = (post) => {
      this.setState(() => ({
        currentPost: post,
        openModal: true
      }))
    }

    submitUpdate = (data) => {
      this.closePostModal()
      this.props.updatePost(data)
    }

    closePostModal = () => this.setState(() => ({ openModal: false }))

    render() {
      const { openModal, currentPost } = this.state
      const { posts, addPost, fetchPost, removePost, updatePost, incrementPost, decreasePost } = this.props
      const yes = posts.length > 0
        return (
          <div className="comment-section">
              {yes ? posts.map(post => (
                <div className="comment">
                  <h2>{post.title}</h2>  <button className="ed" onClick={() => this.editButton(post)}>ed</button> <button className="ed" onClick={() => removePost(post.id)}>del</button>
                  <p>{post.body}</p>
                  <p>{post.author}</p>
                  <p><button onClick={() => incrementPost(post)}>up</button> <button onClick={() => decreasePost(post)}>do</button> <span>{post.voteScore}</span> <span className="no">2 comments</span></p>        
                </div>

                )) : <div></div>}

              <Modal
                  className='modal'
                  overlayClassName='overlay'
                  isOpen={openModal}
                  onRequestClose={this.closePostModal}
                >
          <div className="create-post">
            <input placeholder="Title" type="text" className="input" value={currentPost.title} onChange={(e) => this.update('title', e.target.value)}></input>
            <input placeholder="Author" type="text" className="input" value={currentPost.author} onChange={(e) => this.update('author', e.target.value)}></input>
            <select className="input" value={currentPost.category} onChange={(e) => this.update('category', e.target.value)}>
              <option disabled>Choose</option>
              <option>react</option>
              <option>redux</option>
              <option>react-redux</option>
            </select>
            <input placeholder="Body" type="text" className="input" value={currentPost.body} onChange={(e) => this.update('body', e.target.value)}></input>
            <input type="submit" className="submit" onClick={() => this.submitUpdate(currentPost)}></input>
          </div>
                </Modal>

          </div>
        )
    }
}

function mapStateToProps({postList}) {
    const obj = Object.keys(postList)
    let arr
    if (obj.length > 0) {
      arr = obj.map(key => postList[key])
      return {
        posts: arr
      }
    } else {
      return {
        posts: []
      }
    }
  }

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data)),
    fetchPost: (data) => dispatch(fetchPost()),
    updatePost: (data) => dispatch(updatePost(data)),
    incrementPost: (data) => dispatch(incrementPost(data)),
    decreasePost: (data) => dispatch(decreasePost(data)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts)