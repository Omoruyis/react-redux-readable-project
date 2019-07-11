import { combineReducers } from 'redux'
import postList from './posts'
import commentList from './comments'


export default combineReducers({
    postList,
    commentList
})