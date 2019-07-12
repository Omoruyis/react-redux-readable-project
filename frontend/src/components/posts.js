import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { removePost, updatePost, addPost, fetchPost, incrementPost, decreasePost } from '../actions/posts'
import Modal from 'react-modal'
import Post from './post'
import Nav from './nav'
import { Link } from 'react-router-dom'


class Posts extends Component {
    state= {
      openModal: false,
      currentPost: {}, 
      currentCategory: '', 
      sortMethod: '',
    }

    changeCategory = (data) => {
      this.setState(() => ({currentCategory: data}))
    }

    changeSort = (data) => {
      this.setState(() => ({sortMethod: data}))
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
      const { openModal, currentPost, currentCategory, sortMethod, } = this.state
      const { posts, removePost, incrementPost, decreasePost,  originalPosts, displayComment } = this.props
      const yes = posts.length > 0
      console.log(this.props)
        return (
          <div>
            <Nav />
            <div className="content">
              <div className="categories">
                <button className="category" onClick={() => this.changeCategory('react')}>React</button>
                <button className="category" onClick={() => this.changeCategory('redux')}>Redux</button>
                <button className="category" onClick={() => this.changeCategory('react-redux')}>React-Redux</button>
              </div>
              <div className="all">
                <button className="showAll" onClick={() => this.changeCategory('')}>Show all</button>
              </div>
              <div className="select">
                <select className="select-item" onChange={(e) => this.changeSort(e.target.value)}>
                  <option value="">Default</option>
                  <option value="shtl">Highest to lowest voteScore</option>
                  <option value="slth">Lowest to highest voteScore</option>
                  <option value="tlth">Lowest time to highest time</option>
                  <option value="thtl">Highest time to lowest time</option>
                </select>
              </div>
            <div className="comment-section">
              {(yes && currentCategory && sortMethod) ? posts.filter(post => post.category===currentCategory).sort((a, b) => {
                  if(sortMethod === 'shtl') {
                    a = a.voteScore
                    b = b.voteScore 
                    if(a < b) {
                      return 1
                    } else {
                      return -1
                    }
                  } else if(sortMethod === 'slth') {
                    a = a.voteScore
                    b = b.voteScore 
                    if(a > b) {
                      return 1
                    } else {
                      return -1
                    }
                  } else if(sortMethod === 'tlth') { 
                    a = a.timestamp
                    b = b.timestamp
                    if(a > b) {
                      return 1
                    } else {
                      return -1
                    }
                  } else if(sortMethod === 'thtl') {
                    a = a.timestamp
                    b = b.timestamp
                    if(a < b) {
                      return 1
                    } else {
                      return -1
                    }
                  } else if(sortMethod === 'normal') {
                    return 0
                  }
                }).map(post => (
                <div className="comment">
                  <h2>{post.title}</h2>  <button className="ed" onClick={() => this.editButton(post)}>ed</button> <button className="ed" onClick={() => removePost(post.id)}>del</button>
                  <p>{post.body}</p>
                  <p>{post.author}</p>
                  <p><button onClick={() => incrementPost(post)}>up</button> <button onClick={() => decreasePost(post)}>do</button> <span>{post.voteScore}</span> <Link to='/comments'>
                  <button onClick={() => displayComment(post)}><span className="no">{post.commentCount} comment</span></button>
                  </Link></p>        
                </div>

                )) : <div></div>}

               {(yes && !currentCategory && sortMethod) ? posts.sort((a, b) => {
                  if(sortMethod === 'shtl') {
                    a = a.voteScore
                    b = b.voteScore 
                    if(a < b) {
                      return 1
                    } else {
                      return -1
                    }
                  } else if(sortMethod === 'slth') {
                    a = a.voteScore
                    b = b.voteScore 
                    console.log('slth')
                    if(a > b) {
                      return 1
                    } else {
                      return -1
                    }
                  } else if(sortMethod === 'tlth') { 
                    a = a.timestamp
                    b = b.timestamp
                    console.log('tlth')
                    if(a > b) {
                      return 1
                    } else {
                      return -1
                    }
                  } else if(sortMethod === 'thtl') {
                    a = a.timestamp
                    b = b.timestamp
                    console.log('thtl')
                    if(a < b) {
                      return 1
                    } else {
                      return -1
                    }
                  } else if(sortMethod === 'normal'){
                    return 0
                  }
                }).map(post => (
                <div className="comment">
                  <h2>{post.title}</h2>  <button className="ed" onClick={() => this.editButton(post)}>ed</button> <button className="ed" onClick={() => removePost(post.id)}>del</button>
                  <p>{post.body}</p>
                  <p>{post.author}</p>
                  <p><button onClick={() => incrementPost(post)}>up</button> <button onClick={() => decreasePost(post)}>do</button> <span>{post.voteScore}</span> <Link to='/comments'>
                  <button onClick={() => displayComment(post)}><span className="no">{post.commentCount} comment</span></button>  
                  </Link></p>        
                </div>

                )) : <div></div>}




              {(yes && currentCategory && !sortMethod) ? originalPosts.filter(post => post.category===currentCategory).map(post => (
                <div className="comment">
                  <h2>{post.title}</h2>  <button className="ed" onClick={() => this.editButton(post)}>ed</button> <button className="ed" onClick={() => removePost(post.id)}>del</button>
                  <p>{post.body}</p>
                  <p>{post.author}</p>
                  <p><button onClick={() => incrementPost(post)}>up</button> <button onClick={() => decreasePost(post)}>do</button> <span>{post.voteScore}</span> <Link to='/comments'>
                  <button onClick={() => displayComment(post)}><span className="no">{post.commentCount} comment</span></button>
                  </Link></p>        
                </div>

                )) : <div></div>}    


                {(yes && !currentCategory && !sortMethod) ? originalPosts.map(post => (
                <div className="comment">
                  <h2>{post.title}</h2>  <button className="ed" onClick={() => this.editButton(post)}>ed</button> <button className="ed" onClick={() => removePost(post.id)}>del</button>
                  <p>{post.body}</p>
                  <p>{post.author}</p>
                  <p><button onClick={() => incrementPost(post)}>up</button> <button onClick={() => decreasePost(post)}>do</button> <span>{post.voteScore}</span> <Link to='/comments'>
                  <button onClick={() => displayComment(post)}><span className="no">{post.commentCount} comment</span></button>
                  </Link></p>        
                </div>

                )) : <div></div>}   
              </div> 

                <Post />

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
        </div>
        )
    }
}

function mapStateToProps({postList}) {
    const obj = Object.keys(postList)
    let arr
    let newarr
    if (obj.length > 0) {
      arr = obj.map(key => postList[key])
      newarr = obj.map(key => postList[key])
      return {
        posts: arr,
        originalPosts: newarr
      }
    } else {
      return {
        posts: [],
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