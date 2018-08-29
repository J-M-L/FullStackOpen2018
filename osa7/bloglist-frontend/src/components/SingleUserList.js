import React from 'react'
import { List } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const SingleUserList = ({ user }) => {
  if(user){
    return(
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>

        <List bulleted>
          {user.blogs.map(b =>
            <List.Item key={ b.id }>{ b.title }</List.Item>
          )}
        </List>
      </div>
    )
  }
  return(
    <div></div>
  )
}

SingleUserList.propTypes = {
  user : PropTypes.func.isRequired
}

export default SingleUserList