import React from 'react'
import PropTypes from 'prop-types'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="blogInfo">
      {blog.title} {blog.author}
    </div>
    <div className="blogLikes">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

SimpleBlog.propTypes = {
  blog : PropTypes.func.isRequired,
}

export default SimpleBlog