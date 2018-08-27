import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const MenuBar = ({userInfo, logoutHandler}) => (
    <Menu inverted>
      <Menu.Item link>
        <Link to="/">Blogs</Link>
      </Menu.Item>
      <Menu.Item link>
        <Link to="/users">Users</Link>
      </Menu.Item>
      <Menu.Item>
        <MenuBarLoginInfo userInfo={userInfo} logoutHandler={logoutHandler}/>
      </Menu.Item>    
    </Menu>
  )
  
  const MenuBarLoginInfo = ({userInfo, logoutHandler}) => {
    if(userInfo !== undefined){
      if(userInfo.user){
        return(
          <div>
              <i>{userInfo.user.username} logged in</i>
              <button onClick = {e => handleLogout(e, logoutHandler)} >
                  logout
              </button>            
            </div>
        )
      }
    }
    return(
      <i>Please log in</i>
    )
  }
  
  const handleLogout = (event, logoutHandler) => {
    event.preventDefault()
    logoutHandler(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

export default MenuBar