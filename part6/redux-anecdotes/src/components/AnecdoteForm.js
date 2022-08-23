// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    props.createAnecdote(content)
    props.setNotification(`you created ${content}`, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const ConnectedAnecdoteForm = connect(null, {
  createAnecdote,
  setNotification
})(AnecdoteForm)

export default ConnectedAnecdoteForm