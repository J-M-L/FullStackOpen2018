export const anecdoteCreation = (content) => {
  return{
    type: 'CREATE',
    content
  }
}

export const anecdoteVote = (id) => {
  return{
    type: 'VOTE',
    id
  }
}

export const anecdoteInitialization = (data) => {
  return{
    type: 'INIT_ANECDOTES',
    data
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
