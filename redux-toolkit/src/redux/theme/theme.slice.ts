import { createSlice } from '@reduxjs/toolkit'

interface ThemeState {
  isDarkMode: boolean
}

const initialState: ThemeState = {
  isDarkMode: true,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
