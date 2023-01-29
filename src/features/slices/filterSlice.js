import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: '',
  colors: [],
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatus: (state, { payload }) => {
      state.status = payload
    },
    UpdateColor: (state, { payload }) => {
      let color = payload
      if (state.colors.includes(color)) {
        state.colors = state.colors.filter((item) => item !== color)
      } else {
        state.colors.push(color)
      }
    },
  },
})

export const { setStatus, UpdateColor } = filterSlice.actions

export default filterSlice.reducer
