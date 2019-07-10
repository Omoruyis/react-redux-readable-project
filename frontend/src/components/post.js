import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { addPost } from '../actions/posts'

class Post extends Component {
    state = {
      post: {}
    }

    addNew = (data) => {
      this.props.dispatch(addPost(data))
    }

    add = (type, val) => {
      this.setState((state) => ({
        post: {
          ...state.post,
          [type]: val
        }
      }))
    }


    render() {
        const { post } = this.state
        return (
          <div className="create-post">
            <input placeholder="Title" type="text" className="input" value={post.title} onChange={(e) => this.add('title', e.target.value)}></input>
            <input placeholder="Author" type="text" className="input" value={post.author} onChange={(e) => this.add('author', e.target.value)}></input>
            <select className="input" value={post.category} onChange={(e) => this.add('category', e.target.value)}>
              <option>Choose</option>
              <option>react</option>
              <option>redux</option>
              <option>react-redux</option>
            </select>
            <input placeholder="Body" type="text" className="input" value={post.body} onChange={(e) => this.add('body', e.target.value)}></input>
            <input type="submit" className="submit" onClick={() => {this.addNew(post)}}></input>
          </div>
        )
    }
}

export default connect()(Post)



