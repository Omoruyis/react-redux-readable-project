const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}
  
  export const getAllCategories = () =>
    fetch(`${api}/categories`, { headers })
      .then(res => res.json())
      .then(data => data)

  export const getByCategories = (category) =>
    fetch(`${api}/:categories/posts`, { headers })
      .then(res => res.json())
      .then(data => data)

  export const getAllPosts = () =>
    fetch(`${api}/posts`, { headers })
      .then(res => res.json())
      .then(data => data)

  export const createPost = (body) =>
    fetch(`${api}/posts`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())

  export const getPost = (post) =>
    fetch(`${api}/posts/${post.id}`, { headers })
      .then(res => res.json())
      .then(data => data)
  
  // export const removePost = (id) =>
  //   fetch(`${api}/posts/${id}`, { method: 'DELETE', headers })
  //     .then(res => res.json())
  //     .then(data => data.contact)

  export const removePost = (id) =>
  fetch(`${api}/posts/${id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data)
      
  export const counter = (body) =>
    fetch(`${api}/posts/${body.id}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())

  export const editPost = (body) =>
    fetch(`${api}/posts/${body.id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
  
