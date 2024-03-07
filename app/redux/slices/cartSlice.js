'use client'

import { updateCart } from "@/utils/cartUtils"
import { createSlice } from "@reduxjs/toolkit"


const initialState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem("cartItems")) : { cartItems: [] }



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existItem = state.cartItems.find(p => p._id === item._id)


            //replace the item replace quantity
            if (existItem) {
                state.cartItems = state.cartItems.map(p => p._id === existItem._id ? item : p)
            } else {
                state.cartItems = [...state.cartItems, item]
            }
            //calculate items price

            return updateCart(state)
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(p => p._id !== action.payload)
            return updateCart(state)
        }
    }

})
export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer