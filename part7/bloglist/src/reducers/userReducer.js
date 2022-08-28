import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import usersService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  },
})

export const { setUser } = userSlice.actions

export const signinUser = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    usersService.setToken(user.token)

    dispatch(setUser(user))
  }
}

export default userSlice.reducer
