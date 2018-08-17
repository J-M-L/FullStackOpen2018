import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { newNotification, removeNotification } from '../reducers/notificationReducer'


class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    const notification = `you added a new anecdote '${content}'`
    this.props.store.dispatch(
      anecdoteCreation(content)
    )
    this.props.store.dispatch(
      newNotification(notification)
    )
    setTimeout(() => {
      this.props.store.dispatch(
        removeNotification()
      )
    }, 5000)

    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
