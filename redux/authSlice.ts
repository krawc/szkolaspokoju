import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  loggedIn: boolean,
  user: {
    [key: string]: String
  },
  subscribed:  {
    [key: string]: String[]
  },
}

const initialState: AuthState = {
  loggedIn: false,
  user: {},
  subscribed: {}
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload
    },
    setUser: (state, action) => {
      console.log('ACTIONO')
      console.log(action)
      state.user = action.payload
    },
    setSubscribed: (state, action) => {
      console.log('ACTIONO')
      console.log(action)
      state.subscribed = action.payload
    }
  },
})

export const { setLoggedIn, setUser, setSubscribed } =
  authSlice.actions
export default authSlice.reducer
