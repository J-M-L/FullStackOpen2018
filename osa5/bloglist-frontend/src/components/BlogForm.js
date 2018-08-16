import React from 'react'
import Blog from './Blog'
import Button from './Button'
import NewBlogField from './NewBlogField'

const blogCompare = (a, b) => {
  if(a.likes < b.likes){
    return 1
  }
  if(a.likes > b.likes){
    return -1
  }
  return 0  
}


const BlogForm = ({username, handleLogout, handleChange, title, author, url, handleCreate, blogs, handleLike, handleDelete, loggedUser}) => {
  const sortedBlogs = blogs.sort(blogCompare)

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

        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} username={loggedUser} />
        )}
        
      </div>
    )
}

export default BlogForm