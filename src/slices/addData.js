import {createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {urlServer} from'../url'
const initialState = {
    data:{},
    loading: ""
}
const UserApi =  urlServer +'/postNewrow';

const fetchaddNewrow = createAsyncThunk(
    'addnewrow',
    async (body) => {
        const res = await axios.post(UserApi, body)
        return res
    }
  )


export const addNewrowSlice = createSlice({
  name: 'AddNewrow',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchaddNewrow.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    }),
    builder.addCase(fetchaddNewrow.pending, (state, action) => {
        // Add user to the state array
        //state.tableData.push(action.payload)
      }),
      builder.addCase(fetchaddNewrow.rejected, (state, action) => {
        // Add user to the state array
        //state.tableData.push(action.payload)
      })

  },


})
// Action creators are generated for each case reducer function
export const { addNewrow } = addNewrowSlice.actions

export default addNewrowSlice.reducer