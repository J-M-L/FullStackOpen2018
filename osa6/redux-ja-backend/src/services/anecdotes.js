import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, { content, votes: 0 })
  return response.data
}

const incrementVote = async (newObject) => {

  const newUrl = url + '/' + newObject.id
  const response = await axios.put(newUrl, newObject)
  return response.data
}
export default { getAll, createNew, incrementVote }
