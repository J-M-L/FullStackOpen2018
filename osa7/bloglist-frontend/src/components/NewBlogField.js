import React from 'react'
import ImputField from './InputField'
import { connect } from 'react-redux'
import { changeTitle, changeAuthor, changeUrl, addBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const handleChange = (event, dispatcher) => {
  dispatcher(event.target.value)
}

const createBlog = (event, props) => {
  event.preventDefault()
  const newBlog = {
    title: event.target.title.value,
    author: event.target.author.value,
    url: event.target.url.value
  }
  props.addBlog(newBlog, props.userInfo)
  props.notify(`a new blog '${newBlog.title}' by ${newBlog.author} added`)   
}

const NewBlogField = (props) => {
    return(
      <div>
        <h1>Create New</h1>
        <form onSubmit = {e => createBlog(e, props)}>
          <ImputField name = 'title'
                      type = 'text'
                      onChange = {e=> handleChange(e, props.changeTitle)}
          />
          <ImputField name = 'author'
                      type = 'text'
                      onChange = {e=> handleChange(e, props.changeAuthor)}
          />
          <ImputField name = 'url'
                      type = 'text'
                      onChange = {e=> handleChange(e, props.changeUrl)}
          />
          <button type="submit">create</button>   
        </form>     
        <br/>
      </div>
    )
}

const mapStateToProps = (state) => {
  return{
    blogInfo : state.blogInfo,
    userInfo : state.user
  }
}

const mapDispatchToProps = {
  changeTitle,
  changeAuthor,
  changeUrl,
  addBlog,
  notify
}

const ConnectedNewBlogField = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBlogField)

export default ConnectedNewBlogField