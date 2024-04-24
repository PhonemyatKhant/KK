'use client'

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    viewOutOfStock: true,
    brand: "",
    category: "",
    price: 0,
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggleOOS: (state, action) => {
            const viewOOS = action.payload
            state.viewOutOfStock = viewOOS
        },
        toggleBrand: (state, action) => {
            const brand = action.payload
            state.brand === brand ? "" : state.brand = brand
        },
        toggleCategory: (state, action) => {
            const category = action.payload
            state.category === category ? "" : state.category = category
        },
        resetFilter: (state) => {
            state.brand = ""
            state.category = ""
        }

    }

})
export const { toggleOOS, toggleBrand, toggleCategory, resetFilter } = filterSlice.actions
export default filterSlice.reducer