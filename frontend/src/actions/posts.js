import uuid from 'uuid'
import * as postsAPI from '../utils/postsAPI'

export const CREATE_POST = 'CREATE_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const ALL_POSTS = "ALL_POSTS";
export const INCREASE_SCORE = 'INCREASE_SCORE'
export const DECREASE_SCORE = 'DECREASE_SCORE'


export const addPost = ({ title, body, author, category }) => {
    return {
        type: CREATE_POST,
        post: {
            id: uuid(),
            timestamp: Date.now(),
            title,
            body,
            author,
            category,
            voteScore: 0,
            deleted: false,
            commentCount: 0
        }
    }
}

export const removePost = (id) => {
    return {
        type: REMOVE_POST,
        id,
    }
}

export const incrementPost = ({ id, title, body, author, category, voteScore, deleted, commentCount }) => {
    return {
        type: INCREASE_SCORE,
        post: {
            id,
            timestamp: Date.now(),
            title,
            body,
            author,
            category,
            voteScore,
            deleted,
            commentCount,
            option: 'upVote'
        }
    }
}

export const decreasePost = ({ id, title, body, author, category, voteScore, deleted, commentCount }) => {
    return {
        type: DECREASE_SCORE,
        post: {
            id,
            timestamp: Date.now(),
            title,
            body,
            author,
            category,
            voteScore,
            deleted,
            commentCount,
            option: 'downVote'
        }
    }
}

export const updatePost = ({ id, title, body, author, category }) => {
    return {
        type: UPDATE_POST,
        post: {
            id,
            timestamp: Date.now(),
            title,
            body,
            author,
            category,
            voteScore: 1,
            deleted: false,
            commentCount: 0
        }
    }
}



export const displayPost = posts => {
    const split = posts.reduce((total, post) => {
        total[post.id] = post 
        return total
    }, {})
    return {
        type: ALL_POSTS,
        split,
    }
}


export const fetchPost = () => dispatch => (
  postsAPI
      .getAllPosts()
      .then(posts => {
        dispatch(displayPost(posts))
        console.log('thankful')
      })
);





