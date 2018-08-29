import React from 'react'
import NewBlogField from './NewBlogField'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const blogListStyle = {
  border: 'solid',
  borderWidth : 1,
  margin: '5px',
  padding: '5px'
}

const BlogForm = (props) => {
  return(
    <div>
      <NewBlogField />

      {props.blogInfo.blogs.map(blog =>
        <div key={blog.id} style={blogListStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )}

    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    userInfo : state.user,
    blogInfo : state.blogInfo
  }
}

const mapDispatcerToProps = {

}

const ConnectedBlogForm = connect(
  mapStateToProps,
  mapDispatcerToProps
)(BlogForm)

export default ConnectedBlogForm