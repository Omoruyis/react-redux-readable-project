import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'

class Post extends Component {
  state = {
    post: {}
  }

  addNew = (data) => {
    const keys = Object.keys(data)
    if (data.title !== '' && data.author !== '' && data.category !== '' && data.body !== '' && keys.length !== 0) {
      this.props.dispatch(addPost(data))
    }
  }

  add = (type, val) => {
    this.setState((state) => ({
      post: {
        ...state.post,
        [type]: val
      }
    }))
  }

  remove = () => {
    this.setState((state) => ({
      post: {
        ...state.post,
        title: '',
        author: '',
        category: '',
        body: '',
      }
    }))
  }


  render() {
    const { post } = this.state
    return (
      <div className="create-post">
        <form>
          <input placeholder="Title" type="text" className="input" value={post.title} onChange={(e) => this.add('title', e.target.value)} required></input>
          <input placeholder="Author" type="text" className="input" value={post.author} onChange={(e) => this.add('author', e.target.value)} required></input>
          <select className="input" value={post.category} onChange={(e) => this.add('category', e.target.value)} required>
            <option>Choose</option>
            <option>react</option>
            <option>redux</option>
            <option>react-redux</option>
          </select>
          <input placeholder="Body" type="text" className="input" value={post.body} onChange={(e) => this.add('body', e.target.value)} required></input>
          <input type="submit" className="submit" onClick={(e) => {
            e.preventDefault()
            this.addNew(post)
            this.remove()
          }}></input>
        </form>
      </div>
    )
  }
}

export default connect()(Post)



