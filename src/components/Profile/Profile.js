import React, { useEffect } from 'react'
import './Profile.css'
import { IoAppsSharp } from 'react-icons/io5'
import { deletePostInProfile, selectUsers, setUserExists } from '../../store/slices/users/usersSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost } from '../../store/slices/posts/postsSlice'



const Profile = () => {
  const { initialUser } = useSelector(selectUsers)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!initialUser.id) {
      navigate('/')
    }
  }, [initialUser.id])

  return (
    <div className='profile'>
      <div className='profile-container'>
        <div className='profile-header'>
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt='img' className='prof-img' />
          <div className='prof-info'>
            <div className='prof-nickname'>
              {initialUser.username}
            </div>
            <div className='prof-followers'>
              <span><b>3</b> публикации</span>
              <span><b>342</b> подписчика</span>
              <span><b>78</b> подписок</span>
            </div>
            <div className='prof-name'>
              <span><b>{initialUser.name}</b></span>
              <span>{initialUser.about}</span>
            </div>
          </div>
        </div>
        <div className='public'>
          <div className='public-header'>
            <div>
              <IoAppsSharp className='app-icon' />публикации
            </div>
          </div>
          <div className='public-gallery'>
            {
              initialUser.posts?.map(post => (
                <div key={post.id} className='delldiv'><button onClick={() => { dispatch(deletePostInProfile(post.id)); dispatch(deletePost(post.id)) }} className='btndellpost'>X</button><img src={post.img} alt='img' /></div>

              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile