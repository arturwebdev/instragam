import { createSlice } from "@reduxjs/toolkit";

 export const searchSlice = createSlice ({
    name: 'search',
    initialState:{
        txt: ''
    },
    reducers: {
        searchUser(state, {payload}) {
            console.log('payload', payload)
            return {
                ...state,
                txt: payload
            }
        }
    },
    extraReducers: {

    }
})

export const selectSearch = state => state.search 

export const {searchUser} = searchSlice.actions

export const searchReducer = searchSlice.reducer


