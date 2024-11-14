import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User, UserForm } from '../../components/UserTable'

interface UserState {
  users: User[]
  isUserCreated: boolean | null
  isUserDeleted: boolean | null
  isUserUpdated: boolean | null
}

const initialState: UserState = {
  users: [],
  isUserCreated: null,
  isUserDeleted: null,
  isUserUpdated: null,
}

// Call API Actions
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers', // action name -> auto generate 3 status:
  // success: users/fetchUsers/fulfilled,
  // loading: users/fetchUsers/pending
  // error:   users/fetchUsers/error
  async () => {
    const res = await fetch('http://localhost:9000/users')
    return await res.json()
  }
)

export const createUser = createAsyncThunk(
  'users/createUser',
  async (payload: UserForm, thunkAPI) => {
    const res = await fetch('http://localhost:9000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    const data = await res.json()

    // Refetch if create new user successfully
    if (res.ok && data?.id) {
      thunkAPI.dispatch(fetchUsers())
    }
    return data
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',

  async (userId: number, thunkAPI) => {
    const res = await fetch(`http://localhost:9000/users/${userId}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      thunkAPI.dispatch(fetchUsers())
    }
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (payload: UserForm, thunkAPI) => {
    if (payload.id) {
      const res = await fetch(`http://localhost:9000/users/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (res.ok && data) {
        thunkAPI.dispatch(fetchUsers())
      }
      return data
    }
  }
)

export const userSlice = createSlice({
  name: 'users',
  initialState,
  // Actions that change internal state
  reducers: {
    resetUserCreationStatus: (state) => {
      state.isUserCreated = null
      state.isUserDeleted = null
      state.isUserUpdated = null
    },
  },
  // 2 cases of using extraReducers:
  // - Call API: using Redux Thunk (define action outside this slice)
  // - Listen actions from another slice
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isUserCreated = true
      })
      .addCase(createUser.rejected, (state) => {
        state.isUserCreated = false
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isUserDeleted = true
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isUserDeleted = false
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isUserUpdated = true
      })
      .addCase(updateUser.rejected, (state) => {
        state.isUserUpdated = false
      })
  },
})

// Action creators are generated for each case reducer function
export const { resetUserCreationStatus } = userSlice.actions

export default userSlice.reducer
