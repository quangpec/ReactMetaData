import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    newRow:{},
    data: {}

}
 
export const viewTableSlice = createSlice({
  name: 'viewTable',
  initialState,
  reducers: {
    showTable: (state,action) => {
        state.data = {...action.payload}
    },
    updateNewrow : (state, action)=> {
      state.newRow = {...action.payload};
    },
    addnewRow: (state,action)=>{
      state.data.data.push(action.payload)
    }

  },
  

})
// Action creators are generated for each case reducer function
export const {showTable,updateNewrow,addnewRow } = viewTableSlice.actions

export default viewTableSlice.reducer