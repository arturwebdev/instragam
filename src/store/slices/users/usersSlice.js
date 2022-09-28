import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAPI";

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        initialUser: {},
        isLogin: false
    },
    reducers: {
        setInitialUser(state, { payload }) {
            if (state.data.some(el => (el.username === payload.login || el.email === payload.login) && el.password === payload.password)) {

                return {
                    ...state,
                    initialUser: state.data.find(el => (el => el.username === payload.login || el.email === payload.login) && el.password === payload.password)

                }

            }
            return state
        },
        sendMess(state, { payload }) {
            let currentAnswer = ''
            switch (payload.toLowerCase()) {
                case 'barev':
                    currentAnswer = 'Barev'
                    break;

                default:
                    currentAnswer = 'es dzez chem haskanum'
                    break;
            }

            const currentInitialUser = {
                ...state.initialUser,
                messages: [
                    ...state.initialUser.messages,
                    {
                        id: 'me' + new Date().getTime().toString(),
                        user: 'me',
                        txt: payload

                    },
                    {
                        id: 'you' + new Date().getTime().toString(),
                        user: 'you',
                        txt: currentAnswer

                    },

                ]
            }
            return {
                ...state,
                initialUser: currentInitialUser,
                data: [
                    ...state.data.map(user => {
                        if (user.id === state.initialUser.id) {
                            return currentInitialUser


                        } return user
                    })
                ]
            }
        },

        dellMess(state, { payload }) {
            // console.log(payload);
            const idx = state.initialUser.messages.findIndex(el => el.id === payload)
            const secId = state.initialUser.messages[idx + 1].id
            // console.log(payload, secId);
            return {
                ...state,
                initialUser: {
                    ...state.initialUser,
                    messages: [
                        ...state.initialUser.messages.filter(el => el.id !== payload).filter(el => el.id !== secId)
                    ]
                },
                data: [
                    state.data.map(el => {
                        if (el.id === state.initialUser.id) {
                            return {
                                ...state.initialUser,
                                messages: [
                                    ...state.initialUser.messages.filter(el => el.id !== payload).filter(el => el.id !== secId)

                                ]
                            }
                        }
                        return el
                    })
                ]

            }
        },
        logOut(state) {
            return {
                ...state,
                initialUser: {}
            }

        },
        addNewPostInProfile(state, { payload }) {
            return {
                ...state,
                initialUser: {
                    ...state.initialUser,
                    posts: [
                        payload,
                        ...state.initialUser.posts
                    ]
                },
                data: [
                    ...state.data.map(el => {
                        if (el.id === state.initialUser.id) {
                            return {
                                ...state.initialUser,
                                posts: [
                                    payload,
                                    ...state.initialUser.posts
                                ]
                            }
                        } return el
                    })
                ]
            }
        },
        deletePostInProfile(state, { payload }) {
            return {
                ...state,
                initialUser: {
                    ...state.initialUser,
                    posts: [
                        ...state.initialUser.posts.filter(el => el.id !== payload)
                    ]
                },
                data: [
                    ...state.data.map(el => {
                        if (el.id === state.initialUser.id) {
                            return {
                                ...state.initialUser,
                                posts: [
                                    ...state.initialUser.posts.filter(el => el.id !== payload)

                                ]
                            }
                        } return el
                    })


                ]
            }
        }

    },
    extraReducers: {
        [fetchUsers.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                data: payload
            }
        }
    }

})

export const selectUsers = state => state.users

export const { setInitialUser, sendMess, dellMess, logOut, addNewPostInProfile, deletePostInProfile } = usersSlice.actions

export const usersReducer = usersSlice.reducer