import React from 'react'
import { Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const UserList = ({ usersList }) => (
  <div>
    <h2>users</h2>
    <Table striped>
      <Table.Body>
        <Table.Row>
          <Table.Cell></Table.Cell>
          <Table.Cell>blogs added</Table.Cell>
        </Table.Row>
        {usersList.map(user =>
          <Table.Row key={user.id}>
            <Table.Cell>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </Table.Cell>
            <Table.Cell>
              {user.blogs.length}
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
)

UserList.propTypes = {
  usersList : PropTypes.func.isRequired
}

export default UserList