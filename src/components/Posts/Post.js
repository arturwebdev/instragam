import React, { useRef } from 'react'
import './Post.css'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addComment } from '../../store/slices/posts/postsSlice'
import { selectUsers } from '../../store/slices/users/usersSlice'
import widthCommShow from '../../hoc/widthCommShow'
import { FaChevronDown } from "react-icons/fa"


const Post = widthCommShow(({ id, img, disc, comments, userName, show, toggleShow }) => {
    const formRef = useRef(null)

    const users = useSelector(selectUsers)

    const dispatch = useDispatch()

    const submitHendler = (e) => {
        e.preventDefault()
        // console.log(formRef.current[0].value);
        dispatch(addComment({
            id: id,
            body: formRef.current[0].value,
            userName: users.initialUser.username
        }))
        formRef.current[0].value = ''
    }



    return (
        <div className='post'>
            <div className='post-header'>
                <NavLink to='/profile'>
                    <img alt='post-author' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' />
                    <span>{userName}</span>
                </NavLink>
            </div>

            <img alt='post-img' src={img} />

            <div className='post-btns'>
                <AiOutlineHeart size='30px' className='heart-icon' />
                <FaRegComment size='28px' className='comment-icon' />
            </div>
            <div className='post-footer'>
                <div className='like-count'>
                    <b>315 отметок "Нравится"</b>

                </div>
                {disc}
                <div className='later'>
                    2 дня назад
                </div>
                <div style={{
                    maxHeight: show ? "800px" : "60px",
                    overflow: 'hidden',
                    transition: "max-height 1000ms ease"
                }}>
                    {
                        comments.map(comment => (
                            <div key={comment.id} className='description'>
                                <b>{comment.userName}</b> {comment.body}
                            </div>
                        ))
                    }
                </div>



                <div className='post-input'>
                    <form ref={formRef} onSubmit={submitHendler}>
                        <input onFocus={() => {
                            if (!show) {
                                toggleShow()
                            }
                        }} type='text' placeholder='Добавить комментарий...' />
                        <button>Опубликовать</button>
                    </form>
                </div>
            </div>
            <div className='clickShow' style={{
                transform: show ? "rotatex(180deg)" : "rotatex(0deg)",
                transition: "transform 1000ms ease "
            }}
                onClick={() => toggleShow()}>
                <FaChevronDown color="#000" size="25px" />

            </div>
        </div>
    )
})

export default Post