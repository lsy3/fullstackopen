import { createSlice } from '@reduxjs/toolkit'

const initialState = 'initial notification'
let timeoutID = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationState(state, action) {
      return action.payload
    },
    removeNotificationState(state, action) {
      return null
    },
  },
})

export const { setNotificationState, removeNotificationState } = notificationSlice.actions

export const setNotification = (msg, duration) => {
  return async (dispatch) => {
    if (timeoutID !== null) {
      clearTimeout(timeoutID)
      timeoutID = null
    }
    dispatch(setNotificationState(msg))
    timeoutID = setTimeout(() => {
      dispatch(removeNotificationState())
      timeoutID = null
    }, duration)
  }
}

export default notificationSlice.reducer
