'use client'

import { configureStore } from "@reduxjs/toolkit"
import cartSLiceReducer from "./slices/cartSlice"

const store = configureStore({
    reducer: {
        cart: cartSLiceReducer,
    }
})
export default store