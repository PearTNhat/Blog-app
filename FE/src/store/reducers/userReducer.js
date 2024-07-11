import { createSlice } from '@reduxjs/toolkit'

const userFormLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const userInitialSlice = {
  userInfo: userFormLocalStorage
}
const userSlice = createSlice({
  name: 'user',
  initialState: userInitialSlice,
  reducers: {
    userChange: (state, action) => {
      state.userInfo = action.payload
    },
    userLogout: (state) => {
      state.userInfo = null
    }
  }
})

const userReducer = userSlice.reducer
const userActions = userSlice.actions

export { userReducer, userActions }
