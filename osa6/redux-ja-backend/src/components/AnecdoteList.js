import React from 'react'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

const handleVote = (props, anecdote) => async () => {
  props.anecdoteVote(anecdote)
  props.notify(`you voted '${anecdote.content}'`, 1)
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
  notify
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
