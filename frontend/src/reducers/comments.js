import {
    CREATE_COMMENT,
    REMOVE_COMMENT,
    UPDATE_COMMENT,
    ALL_COMMENTS,
    fetchcomments,
    INCREASE_COMMENT_SCORE, 
    DECREASE_COMMENT_SCORE
} from '../actions/comments'
import * as commentsAPI from '../utils/commentsAPI'


function commentList (state = {}, action) {
    const { id, parentId, body, author, voteScore, parentDeleted, split } = action
    switch(action.type) {
        case CREATE_COMMENT : 
            commentsAPI.createComment(action.comment)

            return {
                ...state,
                [action.comment.id]: action.comment
            }
        case REMOVE_COMMENT : 
            delete state[id]
            commentsAPI.removeComment(id)
            
            return {
                ...state,
            }
        case UPDATE_COMMENT :
            commentsAPI.editComment(action.comment)
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        case ALL_COMMENTS :
            return {
                ...state,
                ...split,
            }
        case INCREASE_COMMENT_SCORE :
            commentsAPI.counter(action.comment)
            delete state[action.comment.option]
            return {
                ...state,
                [action.comment.id]: {
                    ...action.comment,
                    [action.comment.voteScore]: action.comment.voteScore++
                }
            }
        case DECREASE_COMMENT_SCORE :
            commentsAPI.counter(action.comment)
            delete state[action.comment.option]
            return {
                ...state,
                [action.comment.id]: {
                    ...action.comment,
                    [action.comment.voteScore]: action.comment.voteScore--
                }
            }
        default : 
            return state
    }
}

export default commentList
