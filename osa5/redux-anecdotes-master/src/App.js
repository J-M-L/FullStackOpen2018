import React from 'react';


class App extends React.Component {

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anectodeInput.value
    
    this.props.store.dispatch({ 
      type: 'ADD_NEW',
      content: content
    })

    event.target.anectodeInput.value = ''
  }

  addVote = (id) => () => {
    this.props.store.dispatch({
      type: 'INCREMENT',
      id: id
    })

  }

  render() {
    const anecdotes = this.props.store.getState()
    const sortedAnecdotes = anecdotes.sort(anectodeCompare)

    return (
      <div>
        <h2>Anecdotes</h2>
        {sortedAnecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.addVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anectodeInput"/></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

const anectodeCompare = (a, b) => {
  if(a.votes < b.votes){
    return 1
  }
  if(a.votes > b.votes){
    return -1
  }
  return 0  
}


export default App