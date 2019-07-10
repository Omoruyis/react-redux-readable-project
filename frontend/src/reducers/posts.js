import {
    CREATE_POST,
    REMOVE_POST,
    UPDATE_POST,
    ALL_POSTS,
    fetchPosts,
    INCREASE_SCORE, 
    DECREASE_SCORE
} from '../actions/posts'
import * as postsAPI from '../utils/postsAPI'



function postList (state = {}, action) {
    const { id, title, body, author, category, split } = action

    switch (action.type) {
        case CREATE_POST : 
            postsAPI.createPost(action.post)

            return {
                ...state,
                [action.post.id]: action.post
            }
        case REMOVE_POST : 
            
            delete state[id]
            console.log(id)
            postsAPI.removePost(id)
            
            return {
                ...state,
            }
        case UPDATE_POST :
            postsAPI.editPost(action.post)
            return {
                ...state,
                [action.post.id]: action.post
            }
        case ALL_POSTS :
            return {
                ...state,
                ...split,
            }
        case INCREASE_SCORE :
            postsAPI.counter(action.post)
            delete state[action.post.option]
            return {
                ...state,
                [action.post.id]: {
                    ...action.post,
                    [action.post.voteScore]: action.post.voteScore++
                }
            }
        case DECREASE_SCORE :
            postsAPI.counter(action.post)
            delete state[action.post.option]
            return {
                ...state,
                [action.post.id]: {
                    ...action.post,
                    [action.post.voteScore]: action.post.voteScore--
                }
            }
        default : 
            return state
    }
}

export default postList

