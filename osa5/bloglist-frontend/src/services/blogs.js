import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization' : token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const config = {
    headers: { 'Authorization' : token}
  }

  const updatedBlog = {
    user: newObject.user,
    likes: newObject.likes,
    author: newObject.author,
    title: newObject.title,
    url: newObject.url
  }

  const putUrl = baseUrl + '/' + newObject.id

  const response = await axios.put(putUrl,updatedBlog, config)

  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { 'Authorization' : token}
  }

  const delUrl = baseUrl + '/' + id
  
  const response = await axios.delete(delUrl, config)

  return response
}


export default { getAll, setToken, create, update, deleteBlog}