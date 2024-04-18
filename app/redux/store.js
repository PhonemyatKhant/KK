'use client'

import { configureStore } from "@reduxjs/toolkit"
import cartSLiceReducer from "./slices/cartSlice"
import pageSliceReducter from "./slices/pageSlice"

const store = configureStore({
    reducer: {
        cart: cartSLiceReducer,
        pagination:pageSliceReducter,
    }
})
export default store