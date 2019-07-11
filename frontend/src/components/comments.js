import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
//import { removePost, updatePost, addPost, fetchPost, incrementPost, decreasePost } from '../actions/posts'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import { join } from 'path';


class Comments extends Component {
    render() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const d = new Date(this.props.currentParent.timestamp)
        const month = d.getMonth()
        const { currentParent } = this.props
        console.log(this.props.currentParent)
        return (
            <div className="content">
                {!currentParent ? <div></div> : <div>
                    <Link to='/'>
                <button>Home</button>
               </Link>
               <div className="comment">
                <h2>{currentParent.title}</h2> 
                  <p>{currentParent.body}</p>
                  <p>{currentParent.author}</p>
                  <p>{`${d.getDate()} ${months[month]} ${d.getFullYear()}`}</p>
               </div>
                </div>}
            </div>
        )
    }
}


//closeCommentModal = () => this.setState(() => ({ showCommentModal: false }))

{/* <Modal
className='modal'
overlayClassName='overlay'
isOpen={showCommentModal}
onRequestClose={this.closeCommentModal}
>
{console.log(currentParent)}
</Modal> */}

export default connect()(Comments)