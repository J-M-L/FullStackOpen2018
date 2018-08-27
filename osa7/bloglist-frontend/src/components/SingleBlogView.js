import React from 'react'
import CommentsView from './CommentsView'

const SingleBlogView = ({blog, props, history}) => {
  if(blog){
    return(
      <div>
        <h2>{blog.title}</h2>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button id={blog.title} onClick={e => handleLike(e, props)}>like</button>
        </div>
        <div>
          <a>added by {blog.user ? blog.user.name : 'unknown'}</a>
        </div>
        {deleteButtonEnable(blog, props) 
        ? <button id={blog.title} onClick={e => handleDelete(e, props, history) }>delete</button>
        : <div></div>
        }
        <CommentsView blog={blog} props={props} />
      </div>
    )
  }  
  return(
    <div></div>
  )
}

const deleteButtonEnable = (blog, props) => {
  if(blog.user){
    const blogUser = blog.user.username
    const loggedUser = props.userInfo.user.username  
  
    return blogUser === loggedUser ? true : false
  }
  return true
}

const handleDelete = (event, props, history) => {
  event.preventDefault()
  const blog = props.blogInfo.blogs.find(b => b.title === event.target.id)
  props.removeBlog(blog)  
  props.notify(`Blogin '${blog.title}' poistaminen onnistui`)
  history.push('/')
}

const handleLike = (event, props) => {
  event.preventDefault()

  const blog = props.blogInfo.blogs.find(b => b.title === event.target.id)
  props.voteBlog(blog, props.userInfo)
  props.notify(`Blogi ${blog.title} päivitetty onnistuneesti`) 
}

export default SingleBlogView