import React from 'react'
import { List } from 'semantic-ui-react'

const SingleUserList = ({user}) => {
    if(user){
      return(
        <div>
          <h2>{user.name}</h2>
          <h3>Added blogs</h3>
          
          <List bulleted>
            {user.blogs.map(b => 
              <List.Item>{b.title}</List.Item>
            )}
          </List>
        </div>
      )
    }
    return(
      <div></div>
    )  
}

export default SingleUserList