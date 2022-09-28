import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'
import './Posts.css'
import { fetchPosts } from '../../store/slices/posts/postsAPI/postsAPI'
import { selectPosts } from '../../store/slices/posts/postsSlice'
import {  selectSearch } from '../../store/slices/searchSlice/searchSlice'
import { selectUsers } from '../../store/slices/users/usersSlice'
import { useNavigate } from 'react-router-dom'



const Posts = () => {
  const posts = useSelector(selectPosts)
  const search = useSelector(selectSearch)
  const {initialUser} = useSelector(selectUsers)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    if (!posts.data.length) {
      dispatch(fetchPosts())
    }
  }, [posts])

  useEffect(()=>{
    if(!initialUser.id){
      navigate('/')
    }
  },[initialUser.id])


  return (
    <div className='posts'>
      <div className='story-block'>
        <div className='story'>
          <img src='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80' alt='story-img' />
          <span>{'gevorg gevorgyan'}</span>
        </div>
        <div className='story'>
          <img src='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80' alt='story-img' />
          <span>gevorg gevorgyan</span>
        </div>
        <div className='story'>
          <img src='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80' alt='story-img' />
          <span>gevorg gevorgyan</span>
        </div>
        <div className='story'>
          <img src='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80' alt='story-img' />
          <span>gevorg gevorgyan</span>
        </div>
        <div className='story'>
          <img src='https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fHBlcnNvbnxlbnwwfHwwfHw%3D&w=1000&q=80' alt='story-img' />
          <span>gevorg gevorgyan</span>
        </div>
      </div>


      {
        posts.data.filter(post => post.userName.includes(search.txt)).map(post => <Post
          key={post.id}
          id={post.id}
          userName={post.userName}
          img={post.img}
          disc={post.disc}
          comments={post.comments}
          
        />)

      }
      {/* {
        profile.data.map(post => <Profile
           key={post.id}
           id={post.id}
           userName={post.userName}
           img={post.img}
           />)
      } */}

    </div>
  )
}

export default Posts