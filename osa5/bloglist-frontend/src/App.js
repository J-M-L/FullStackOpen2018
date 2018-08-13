import React from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      notification: null,
      title: '',
      author: '',
      url: '',
      loginVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      //blogService.setToken(user.Token)
      this.setState({username: '', password: '', user, notification: null})
    }catch(exception) {
      this.setState({
        notification: 'käyttäjätunnus tai salasana virheellinen',
      })
    }   
    setTimeout(() => {
      this.setState({notification: null})
    }, 5000)
  }

  logout = (event) => {
    event.preventDefault()
    console.log(`user ${this.state.user.name} is logging out`)
    this.setState({user: null})
    window.localStorage.removeItem('loggedBlogappUser')
  }

  addBlog = (event) => {
    event.preventDefault()
    
    const newObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      likes: 0
    }
      blogService
      .create(newObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          notification: `a new blog '${this.state.title}' by ${this.state.author} added`,
          title: '',
          author: '',
          url: ''
        }) 
      }) 
      .catch(exception => {
        this.setState({
          notification: `error trying to add a new blog '${this.state.title}' by ${this.state.author}`,
        }) 
      })        

      setTimeout(() => {
        this.setState({notification: null})
      }, 5000)
  }

  handleFieldChange = (event) => {
    let change = {}
    change[event.target.name] = event.target.value

    this.setState(change)      
  }

  render() {
    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    )
    

    const blogForm = () => (
      <BlogForm 
        username={this.state.username}
        handleLogout={this.logout}
        handleChange={this.handleFieldChange}
        title={this.state.title}
        author={this.state.author}
        url={this.state.url}
        handleCreate={this.addBlog}
        blogs={this.state.blogs}
      />
    )

    return(
      <div>        
        <Notification message={this.state.notification} />

        {this.state.user === null ?
          loginForm() :
          blogForm()
        }

      </div>
    )  
  }  
}

export default App;
