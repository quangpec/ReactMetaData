import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: ''
}

export const listTableSlice = createSlice({
  name: 'listTable',
  initialState,
  reducers: {
    updateTable: (state,action) => {
        state.data = {...action.payload}
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateTable } = listTableSlice.actions

export default listTableSlice.reducer