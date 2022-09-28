import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function () {
        const usersResponse= await axios.get('https://jsonplaceholder.typicode.com/users')
        const usersData = usersResponse.data

        const postsRespone = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=500')
        const postsData = postsRespone.data


        const data = usersData.map(user => ({
            id:user.id,
            email:user.email.toLowerCase(),
            username:user.username.toLowerCase(),
            name:user.name,
            password: user.address.city.toLowerCase(),
            about:user.company.catchPhrase,
            messages:[],
            posts:postsData.filter(post => post.albumId === user.id).map(post => ({
                id: post.id,
                userName: post.title.slice(0, post.title.indexOf(' ')),
                disc: post.title.slice(post.title.indexOf(' ') + 1),
                img: post.url,
                comments:[]
                
                                    
    
            }))
        }))
 
        return data
    }
)