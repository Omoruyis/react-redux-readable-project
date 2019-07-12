const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const getAllComments = (id) =>
fetch(`${api}/posts/${id}/comments`, { headers })
  .then(res => res.json())
  .then(data => data)

export const createComment = (body) =>
fetch(`${api}/comments`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())

export const removeComment = (id) =>
fetch(`${api}/comments/${id}`, { method: 'DELETE', headers })
  .then(res => res.json())
  .then(data => data.contact)

  
export const counter = (body) =>
fetch(`${api}/comments/${body.id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())

export const editComment = (body) =>
fetch(`${api}/comments/${body.id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())

  