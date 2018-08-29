import React from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import MenuBar from './components/MenuBar'
import SingleBlogView from './components/SingleBlogView'
import SingleUserList from './components/SingleUserList'
import UserList from './components/UserList'

import Notification from './components/Notification'
import blogService from './services/blogs'

import { notify } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { changeUser } from './reducers/userReducer'
import { blogInitialization, voteBlog, removeBlog, addNewComment } from './reducers/blogReducer'
import { userInitialization } from './reducers/userReducer'

import { BrowserRouter as Router,  Route, Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginVisible: false
    }
  }

  componentDidMount() {
    this.props.blogInitialization()
    this.props.userInitialization()

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      this.props.changeUser(user)
      blogService.setToken(user.token)
    }
  }

  userById = (id) =>
    this.props.userInfo.users.find(a => a.id === id)

  blogById = (id) =>
    this.props.blogInfo.blogs.find(b => b.id === id)


  render() {
    return(
      <Container>
        <Router>
          <div>
            <Notification />
            <h2>blog APP</h2>
            <MenuBar userInfo={this.props.userInfo} logoutHandler={this.props.changeUser} />
            <LoginForm />
            <WrappedLink text="create new" destination="/"/>
            {this.props.userInfo.user !== null ?
              <div>
                <Route exact path="/" render={() => <BlogForm  />}/>
                <Route exact path="/users" render={() => <UserList usersList={this.props.userInfo.users}  />}/>
                <Route exact path="/users/:id" render={({ match }) =>
                  <SingleUserList user={this.userById(match.params.id)}  />}/>
                <Route exact path="/blogs/:id" render={(({ match, history }) =>
                  <SingleBlogView blog={this.blogById(match.params.id)} props={this.props} history={history}/>)} />
              </div>
              : <div></div>
            }
          </div>
        </Router>
      </Container>
    )
  }
}

const WrappedLink = ({ text, destination }) => {
  return(
    <button>
      <Link style={{ display:'block' }} to={destination}>{text}</Link>
    </button>
  )
}

const mapStateToProps = (state) => {
  return{
    userInfo : state.user,
    blogInfo : state.blogInfo
  }
}

const mapDispatchToProps = {
  notify,
  changeUser,
  blogInitialization,
  userInitialization,
  voteBlog,
  removeBlog,
  addNewComment
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
