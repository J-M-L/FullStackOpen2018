import React from 'react'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { newNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'
import anecdoteService from '../services/anecdotes'

const handleVote = (props, anecdote) => async () => {
  props.anecdoteVote(anecdote.id)
  const notification = `you voted '${anecdote.content}'`

  let newObject = { ...anecdote }
  newObject.votes++
  const response = await anecdoteService.incrementVote(newObject)
  console.log(response)
  props.newNotification(notification)

  setTimeout(() => {
    props.removeNotification()
  }, 5000)
}

const AnecdoteList = (props) => (
  <div>
    <h2>Anecdotes</h2>
    <Filter />
    {props.anecdotesToShow.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleVote(props, anecdote)}>
            vote
          </button>
        </div>
      </div>
    )}
  </div>
)

const visibleAnecdotes = (anecdotes, currentFilter) => {
  return anecdotes.sort((a, b) => b.votes - a.votes).filter(a => a.content.toLowerCase().includes(currentFilter.toLowerCase()))
}

const mapStateToProps = (state) => {
  return{
    anecdotesToShow: visibleAnecdotes(state.anecdotes, state.contentFilter)
  }
}

const mapDispatchToProps = {
  anecdoteVote,
  newNotification,
  removeNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
