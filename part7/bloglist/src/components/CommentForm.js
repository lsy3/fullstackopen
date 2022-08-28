import blogService from '../services/blogs'

import { Form, Button } from 'react-bootstrap'

const CommentForm = ({ blogID, addCommentHandler }) => {
  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value

    const newComment = await blogService.addComment(blogID, comment)
    addCommentHandler(newComment)
  }

  return (
    <Form onSubmit={addComment}>
      <Form.Control name="comment" />
      <Button type="submit">add comment</Button>
    </Form>
  )
}

export default CommentForm