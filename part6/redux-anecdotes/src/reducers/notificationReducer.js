import { createSlice } from '@reduxjs/toolkit'

const initialState = 'initial notification'

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
    dispatch(setNotificationState(msg))
    setTimeout(() => {
      dispatch(removeNotificationState())
    }, duration)
  }
}

export default notificationSlice.reducer
