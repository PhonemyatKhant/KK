'use client'

import { configureStore } from "@reduxjs/toolkit"
import cartSLiceReducer from "./slices/cartSlice"
import pageSliceReducter from "./slices/pageSlice"
import filterSliceReducer from "./slices/filterSlice"

const store = configureStore({
    reducer: {
        cart: cartSLiceReducer,
        pagination: pageSliceReducter,
        filter: filterSliceReducer,
    }
})
export default store