'use state'

import { createSlice } from "@reduxjs/toolkit"

const pagination = { page: 1 }

const pageSlice = createSlice({
    name: 'pagination',
    initialState: pagination,
    reducers: {
        increasePage: (state, action) => {

            if (state.page !== action.payload) {
                state.page += 1
            }
        },
        decreasePage: (state, action) => {
            if (state.page !== 1) {
                state.page -= 1

            }
        },
        setPage: (state, action) => {
            state.page = action.payload

        },
        loadPage:(state,action)=>{
            state.page = action.payload
        }
    }
})
export const { increasePage, decreasePage, setPage } = pageSlice.actions
export default pageSlice.reducer