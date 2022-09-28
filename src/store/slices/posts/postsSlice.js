import { createSlice, } from "@reduxjs/toolkit";
import { fetchPosts } from "./postsAPI/postsAPI";


const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: []
    },
    reducers: {
        addComment(state, { payload }) {
            return {
                ...state,
                data: [
                    ...state.data.map(post => {
                        if (post.id === payload.id) {
                            return {
                                ...post,
                                comments: [
                                    ...post.comments,
                                    {
                                        id: new Date().getTime().toString(),
                                        body: payload.body,
                                        userName: payload.userName
                                    }
                                ]
                            }
                        }
                        return post
                    })
                ]
            }
        },
        addnewPost(state, { payload }) {
            return {
                ...state,
                data: [
                    payload,
                    ...state.data
                ]
            }
        },
        deletePost(state, { payload }) {
            return {
                ...state,
                data: [
                    ...state.data.filter(el => el.id !== payload)
                ]
            }
        },


    },
    extraReducers: {
        [fetchPosts.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                data: payload
            }
        }
    }
})

export const selectPosts = state => state.posts

export const { addComment, addnewPost, deletePost } = postsSlice.actions

export const postsReducer = postsSlice.reducer