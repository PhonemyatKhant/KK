'use client'

import { createSlice } from "@reduxjs/toolkit"


const initialState = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem("cartItems")) : { cartItems: [] }

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

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

            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price *item.quantity, 0))
            
            //calculate shipping price // if over 10000 = free else 1000ks
            state.shippingPrice = addDecimals(state.itemsPrice > 5000 ? 0 : 1000)
            //calculate tax price 15% tax
            state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2))
            //calculate total price
            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2)
            localStorage.setItem('cartItems', JSON.stringify(state))
        }
    }

})
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer