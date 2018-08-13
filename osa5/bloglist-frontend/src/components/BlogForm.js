import React from 'react'
import Blog from './Blog'
import Button from './Button'
import NewBlogField from './NewBlogField'

const BlogForm = ({username, handleLogout, handleChange, title, author, url, handleCreate, blogs}) => {
    return(
      <div>
        <h2>blogs</h2>
        
        <p>{username} logged in
        <Button onClick = {handleLogout} 
                content = 'logout'
                noDiv = 'true'/>
        </p>

        <NewBlogField titleState = 'title' 
                        titleValue = {title} 
                        titleOnChange = {handleChange}
                      authorState = 'author' 
                        authorValue = {author} 
                        authorOnChange = {handleChange}
                      urlState = 'url' 
                        urlValue = {url} 
                        urlOnChange = {handleChange}
                      
                      createClick = {handleCreate}
        />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        
      </div>
    )
}

export default BlogForm