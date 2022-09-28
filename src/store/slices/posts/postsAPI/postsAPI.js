import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async function () {
        const responsePosts = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=100')
        const dataPosts = responsePosts.data

        const commentsRespone = await axios.get('https://jsonplaceholder.typicode.com/comments')
        const dataComm = commentsRespone.data 

        const data = dataPosts.map(post => ({
            id: post.id,
            userName: post.title.slice(0, post.title.indexOf(' ')),
            disc: post.title.slice(post.title.indexOf(' ') + 1),
            img: post.url,
            comments: dataComm.filter(comment => comment.postId === post.id)
                                .map(comment => ({
                                    id:comment.id,
                                    userName:comment.name.slice(0, comment.name.indexOf(' ')),
                                    body:comment.body
                                }))
                                

        }))

     
       
        // console.log(data);
        return data

    }
)


