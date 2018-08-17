import React from 'react'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { newNotification, removeNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const currentStore = this.props.store.getState()
    const currentFilter = currentStore.contentFilter
    const anecdotes = currentStore.anecdotes.filter(a => a.content.toUpperCase().includes(currentFilter.toUpperCase()))
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.store.dispatch(anecdoteVote(anecdote.id))
                const notification = `you voted '${anecdote.content}'`
                this.props.store.dispatch(newNotification(notification))

                setTimeout(() => {
                  this.props.store.dispatch(
                    removeNotification()
                  )
                }, 5000)
              }}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
