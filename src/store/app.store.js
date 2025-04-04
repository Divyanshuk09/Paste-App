import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from '../features/pasteSlice'
const store = configureStore({
    reducer:{
        paste:pasteReducer,
    }
})

export {store}