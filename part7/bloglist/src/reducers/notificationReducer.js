import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeoutID = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationState(state, action) {
      return action.payload
    },
    removeNotificationState() {
      return null
    },
  },
})

export const { setNotificationState, removeNotificationState } = notificationSlice.actions

export const setNotification = (message, isError, duration) => {
  return async (dispatch) => {
    if (timeoutID !== null) {
      clearTimeout(timeoutID)
      timeoutID = null
    }
    dispatch(setNotificationState({ message, isError }))
    timeoutID = setTimeout(() => {
      dispatch(removeNotificationState())
      timeoutID = null
    }, duration)
  }
}

export default notificationSlice.reducer
