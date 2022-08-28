import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const changedBlog = action.payload
      return state.map(a => a.id !== changedBlog.id ? a : changedBlog)
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
})

export const { appendBlog, updateBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const newBlog = getState().blogs.find(n => n.id === id)
    const changedBlog = {
      ...newBlog,
      likes: newBlog.likes + 1
    }
    const responseBlog = await blogService.update(id, changedBlog)
    dispatch(updateBlog(responseBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    await blogService.remove(id)
    dispatch(setBlogs(getState().blogs.filter(b => b.id !== id)))
  }
}
export default blogSlice.reducer
