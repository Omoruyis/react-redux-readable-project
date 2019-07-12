import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import { addComment } from '../actions/comments'

class Comment extends Component {
    state = {
      comment: {
          parentId: this.props.parentId
      }
    }

    addNew = (data) => {
        console.log(data)
      this.props.dispatch(addComment(data))
    }

    add = (type, val) => {
      this.setState((state) => ({
        comment: {
          ...state.comment,
          [type]: val
        }
      }))
    }


    render() {
        const { comment } = this.state
        return (
          <div className="create-post">
            <input placeholder="Author" type="text" className="input" value={comment.author} onChange={(e) => this.add('author', e.target.value)}></input>
            <input placeholder="Body" type="text" className="input" value={comment.body} onChange={(e) => this.add('body', e.target.value)}></input>
            <input type="submit" className="submit" onClick={() => {this.addNew(comment)}}></input>
          </div>
        )
    }
}

export default connect()(Comment)



