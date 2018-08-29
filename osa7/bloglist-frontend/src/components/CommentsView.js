import React from 'react'
import { List, Form } from 'semantic-ui-react'

const handleCommentAdd = (event, blog, props) => {
  const newComment = event.target.comment.value
  props.addNewComment(blog, newComment, props.userInfo)
  event.target.comment.value = ''
  props.notify(`comment '${newComment}' added to blog '${blog.title}'`)
}

const CommentsView = ({ blog, props }) => {
  let i = 0
  if(blog.comments){
    return(
      <div>
        <h2>comments</h2>
        <div>
          <List bulleted>
            {blog.comments.map(comment =>
              <List.Item key={i++}>{comment}</List.Item>
            )}
          </List>
        </div>
        <div>
          <Form onSubmit={e => handleCommentAdd(e, blog, props)} >
            <Form.Field>
              <input name="comment" />
              <button type="submit">add comment</button>
            </Form.Field>

          </Form>
        </div>
      </div>)
  }
  return(
    <div>
      <h2>comments</h2>
    </div>
  )
}

export default CommentsView