import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
   const anecdotes = useSelector(state => state.anecdotes)
   const filterStr = useSelector(state => state.filter)
   const dispatch = useDispatch()

   const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote.id))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
   }

   return (
      <div>
         {anecdotes.filter(a => a.content.toLowerCase().includes(filterStr.toLowerCase())).sort((a, b) => a.votes - b.votes).map(anecdote =>
            <div key={anecdote.id}>
               <div>
                  {anecdote.content}
               </div>
               <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
               </div>
            </div>
         )}
      </div>
   )
}

export default AnecdoteList