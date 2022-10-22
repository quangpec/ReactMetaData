import { configureStore } from '@reduxjs/toolkit'
import listTableReducer from './slices/listTable';
import viewTableReducer from './slices/viewTable';
export const store = configureStore({
  reducer: {
    listTable: listTableReducer,
    viewTable: viewTableReducer,
    updateNewrow: viewTableReducer,
    addnewRow: viewTableReducer

  },
})
