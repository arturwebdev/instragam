import React, { useEffect, useRef } from 'react'
import './AddImg.css'
import { GrGallery } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPostInProfile, selectUsers } from '../../store/slices/users/usersSlice'
import { useNavigate } from 'react-router-dom'
import { addnewPost } from '../../store/slices/posts/postsSlice'

const AddImg = () => {
  const { initialUser } = useSelector(selectUsers)
  const navigate = useNavigate()
  const formRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!initialUser.id) {
      navigate('/')
    }
  }, [initialUser.id])

  const submitHandler = (e) => {
    e.preventDefault()
    if (formRef.current[0].value) {
      const newPost = {

        id: new Date().getTime().toString(),
        userName: initialUser.username,
        disc: formRef.current[1].value,
        img: formRef.current[0].value,
        comments: []
      }
      dispatch(addnewPost(newPost))
      dispatch(addNewPostInProfile(newPost))
      navigate('/news')
    }

    formRef.current[0].value = ''
    formRef.current[1].value = ''
  }

  return (
    <div className='add-img'>
      <h1>Создание публикации</h1>
      <GrGallery size='60px' className='gall-icon' />


      <form ref={formRef} onSubmit={submitHandler} className='add'>
        <input className='inp1' placeholder='src'></input>
        <input className='inp2' placeholder='disc'></input>
        <button>Выбрать файл </button>
      </form>

    </div>
  )
}

export default AddImg