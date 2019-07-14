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
      const keys = Object.keys(data)
      if(data.author !== '' && data.body !== '' && keys.length !== 1) {
        this.props.dispatch(addComment(data))
      }
    }

    add = (type, val) => {
      this.setState((state) => ({
        comment: {
          ...state.comment,
          [type]: val
        }
      }))
    }

    remove = () => {
      this.setState((state) => ({
        comment: {
          ...state.comment,
          author: '',
          body: '', 
        }
      }))
    }



    render() {
        const { comment } = this.state
        return (
          <form>
            <div className="create-post">     
            <input placeholder="Author" type="text" className="input" value={comment.author} onChange={(e) => this.add('author', e.target.value)}></input>
            <input placeholder="Body" type="text" className="input" value={comment.body} onChange={(e) => this.add('body', e.target.value)}></input>
            <input type="submit" className="submit" onClick={(e) => {
              e.preventDefault()
              this.addNew(comment)
              this.remove()
            }}></input>
          </div>
          </form>
        )
    }
}

export default connect()(Comment)



