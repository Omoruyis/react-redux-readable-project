import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { fetchComments, removeComment, updateComment, addComment, incrementComment, decreaseComment } from '../actions/comments'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import Comment from './comment'
import * as api from '../utils/commentsAPI'


class Comments extends Component {
    state = {
        openModal: false,
        currentComment: {}
    }

    componentDidMount() {
        this.props.fetchComments(this.props.currentParent.id)
    }

    editButton = (comment) => {
        this.setState(() => ({
          currentComment: comment,
          openModal: true
        }))
    }

    update = (type, query) => {
        this.setState((state) => ({
          currentComment: {
            ...state.currentComment,
            [type]: query,
          }
        }))
      }

    submitUpdate = (data) => {
        this.closeCommentModal()
        this.props.updateComment(data)
      }

    closeCommentModal = () => this.setState(() => ({ openModal: false }))

    render() {
        api.getAllComments("8xf0y6ziyjabvozdd253nd").then(res => console.log(res))
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const d = new Date(this.props.currentParent.timestamp)
        const month = d.getMonth()
        const { openModal, currentComment } = this.state
        const { currentParent, comments, removeComment, incrementComment, decreaseComment } = this.props
        return (
            <div className="content">
                {!currentParent ? <div></div> : <div>
                <Link to='/'>
                  <a><p className="backHome">Home</p></a>
               </Link>
               <h1 className="commentsHead">Post</h1>
               <div className="comment">
                <h2>{currentParent.title}</h2> 
                  <p>{currentParent.body}</p>
                  <p>{currentParent.author}</p>
                  <p>{`${d.getDate()} ${months[month]} ${d.getFullYear()}`}</p>
               </div>
                </div>}

                {!comments ? <div></div> : <h1 className="commentsHead">Comments</h1>}
                {!comments ? <div></div> : comments.filter(comment => comment.parentId === currentParent.id).map(comment => (
                <div className="comment">
                  <h2>{comment.body}</h2>  <button className="ed" onClick={() => this.editButton(comment)}>ed</button> <button className="ed" onClick={() => removeComment(comment.id)}>del</button>
                  <p>{comment.author}</p>
                  <p><button onClick={() => incrementComment(comment)}>up</button> <button onClick={() => decreaseComment(comment)}>do</button> <span>{comment.voteScore}</span></p>        
                </div>

                ))}

                {!currentParent ? <div></div> : 
                <Comment 
                parentId={currentParent.id}
                />
                }

                <Modal
                  className='modal'
                  overlayClassName='overlay'
                  isOpen={openModal}
                  onRequestClose={this.closeCommentModal}
                >
          <div className="create-Comment">
            <input placeholder="Author" type="text" className="input" value={currentComment.author} onChange={(e) => this.update('author', e.target.value)}></input>
            <input placeholder="Body" type="text" className="input" value={currentComment.body} onChange={(e) => this.update('body', e.target.value)}></input>
            <input type="submit" className="submit" onClick={() => this.submitUpdate(currentComment)}></input>
          </div>
                </Modal>
            </div>
        )
    }
}



function mapStateToProps({commentList}) {
    const obj = Object.keys(commentList)
    let arr
    if (obj.length > 0) {
      arr = obj.map(key => commentList[key])
      return {
        comments: arr,
      }
    } else {
      return {
        comments: [],
      }
    }
  }

  function mapDispatchToProps (dispatch) {
    return {
      addComment: (data) => dispatch(addComment(data)),
      removeComment: (data) => dispatch(removeComment(data)),
      fetchComments: (data) => dispatch(fetchComments(data)),
      updateComment: (data) => dispatch(updateComment(data)),
      incrementComment: (data) => dispatch(incrementComment(data)),
      decreaseComment: (data) => dispatch(decreaseComment(data)),
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(Comments)