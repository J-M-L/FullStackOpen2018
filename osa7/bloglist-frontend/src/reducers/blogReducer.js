import blogService from '../services/blogs'


export const changeTitle = (title) => {    
    return async (dispatcher) => {
        dispatcher({
            type:"CHANGE_TITLE",
            title
        })
    }
}
export const changeAuthor = (author) => {
    return async (dispatcher) => {
        dispatcher({
            type:"CHANGE_AUTHOR",
            author
        })
    }
}
export const changeUrl = (url) => {
    return async (dispatcher) => {
        dispatcher({
            type:"CHANGE_URL",
            url
        })
    }
}

export const addBlog = (blog, userInfo) => {      
    return async (dispatcher) => { 
        const newBlog = await blogService.create(blog)        
        newBlog.user = userInfo.users.find(u => u.id === newBlog.user)
        dispatcher({
            type:'ADD_BLOG',
            blog: newBlog
        }) 
        //this.props.notify(`a new blog '${this.state.title}' by ${this.state.author} added`) 
        //this.props.notify(`error trying to add a new blog '${this.state.title}' by ${this.state.author}`) 
    }
}

export const addNewComment = (blog, comment, userInfo) => {
    return async (dispatcher) => {       
        const newBlog = await blogService.addComment(blog, comment)
        newBlog.user = userInfo.users.find(u => u.id === newBlog.user)
        dispatcher({
            type:'ADD_COMMENT',
            blog: newBlog
        })
    }
}

export const removeBlog = (blog) => {
    return async (dispatcher) => {
        let result = window.confirm(`delete '${blog.title} by ${blog.author}?`);
        if(result){
            await blogService.deleteBlog(blog.id)

            dispatcher({
                type:'REMOVE_BLOG',
                blog
            })
            //this.props.notify(`Blogin '${blogInfo.title}' poistaminen onnistui`)  
            //this.props.notify(`Blogin poistaminen epäonnistui:`) 
        }
    }
}

export const voteBlog = (blog, userInfo) => {
    return async (dispatcher) => {
        let blogUpdate = {...blog}
        blogUpdate.likes++
        const updatedBlog = await blogService.update(blogUpdate)
        if(userInfo){
            updatedBlog.user = userInfo.users.find(u => u.id === updatedBlog.user)
        }
        dispatcher({
            type:'VOTE_BLOG',
            blog: updatedBlog
        })
    }
}

export const blogInitialization = () =>  {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type:'INIT_BLOGS',
            data: blogs
        })
    }
}


const blogCompare = (a, b) => {
    if(a.likes < b.likes){
      return 1
    }
    if(a.likes > b.likes){
      return -1
    }
    return 0  
  }

const blogReducer = (state = {blogs: []}, action) => {
    let oldState = {...state}

    switch(action.type){
        case 'CHANGE_TITLE':
            oldState.title = action.title
            return oldState
        
        case 'CHANGE_AUTHOR':
            oldState.author = action.author
            return oldState
        
        case 'CHANGE_URL':
            oldState.url = action.url
            return oldState
        
        case 'ADD_BLOG':            
            oldState.blogs = oldState.blogs.concat(action.blog)
            oldState.blogs = oldState.blogs.sort(blogCompare)
            return oldState   

        case 'REMOVE_BLOG':
            oldState.blogs = oldState.blogs.filter(b => b.id !== action.blog.id)
            return oldState

        case 'VOTE_BLOG':
            oldState.blogs = oldState.blogs.map(b => b.id !== action.blog.id ? b : action.blog)
            oldState.blogs = oldState.blogs.sort(blogCompare)
            return oldState
        
        case 'INIT_BLOGS':
            oldState.blogs = action.data
            oldState.blogs = oldState.blogs.sort(blogCompare)
            return oldState

        case 'ADD_COMMENT':
            oldState.blogs = oldState.blogs.map(b => b.id !== action.blog.id ? b : action.blog)
            return oldState
            
        default:
            return state
    }
}

export default blogReducer