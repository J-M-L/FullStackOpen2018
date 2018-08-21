import anecdoteService from '../services/anecdotes'

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type:'CREATE',
      content: newAnecdote
    })
  }
}
export const anecdoteVote = (anecdote) => {
  return async (dispatch) => {
    let newObject = { ...anecdote }
    newObject.votes++
    const response = await anecdoteService.incrementVote(newObject)

    dispatch({
      type: 'VOTE',
      id: response.id
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (store = [], action) => {
  const old = store.filter(a => a.id !==action.id)
  const voted = store.find(a => a.id === action.id)

  switch(action.type){
  case 'VOTE':
    return [...old, { ...voted, votes: voted.votes+1 } ]

  case 'CREATE':
    return [...store, { content: action.content.content, votes: action.content.votes, id: action.content.id }]

  case 'INIT_ANECDOTES':
    return action.data

  default:
    return store
  }
}

export default reducer
