import uuid from 'uuid'
import * as commentsAPI from '../utils/commentsAPI'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const ALL_COMMENTS = "ALL_COMMENTS";
export const INCREASE_COMMENT_SCORE = 'INCREASE_COMMENT_SCORE'
export const DECREASE_COMMENT_SCORE = 'DECREASE_COMMENT_SCORE'


export const addComment = ({ parentId, body, author }) => {
    return {
        type: CREATE_COMMENT,
        comment: {
            id: uuid(),
            parentId, 
            timestamp: Date.now(),
            body,
            author,
            voteScore: 0,
            deleted: false,
            parentDeleted: false
        }
    }
}

export const removeComment = (id) => {
    return {
        type: REMOVE_COMMENT,
        id,
    }
}

export const incrementComment = ({ id, parentId, body, author, voteScore, deleted, parentDeleted }) => {
    return {
        type: INCREASE_COMMENT_SCORE,
        comment: {
            id,
            parentId,
            timestamp: Date.now(),
            body,
            author,
            voteScore,
            deleted,
            parentDeleted,
            option: 'upVote'
        }
    }
}

export const decreaseComment = ({ id, parentId, body, author, voteScore, deleted, parentDeleted }) => {
    return {
        type: DECREASE_COMMENT_SCORE,
        comment: {
            id,
            parentId,
            timestamp: Date.now(),
            body,
            author,
            voteScore,
            deleted,
            parentDeleted,
            option: 'downVote'
        }
    }
}

export const updateComment = ({ id, parentId, body, author, voteScore, parentDeleted }) => {
    return {
        type: UPDATE_COMMENT,
        comment: {
            id,
            parentId,
            timestamp: Date.now(),
            body,
            author,
            voteScore,
            deleted: false,
            parentDeleted,
        }
    }
}



export const displayComments = comments => {
    const split = comments.reduce((total, comment) => {
        total[comment.id] = comment 
        return total
    }, {})
    return {
        type: ALL_COMMENTS,
        split,
    }
}


export const fetchComments = (id) => dispatch => (
  commentsAPI
      .getAllComments(id)
      .then(comments => {
        dispatch(displayComments(comments))
        console.log('thankful')
      })
);





