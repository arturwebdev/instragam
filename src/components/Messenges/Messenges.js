import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { dellMess, selectUsers, sendMess, usersReducer } from '../../store/slices/users/usersSlice'
import './Messenges.css'







const messageStyle = {
  me: {
    backgroundColor: 'blue',
    color: 'white',
    display: 'flex',
    boxShadow: '2px 2px 2px blue',
    justifyContent: 'end',
    marginRight: '10px',

  },

  you: {
    backgroundColor: 'black',
    color: 'white',
    boxShadow: '2px 2px 2px black',
    display: 'flex',
    justifyContent: 'start',
    marginLeft: '10px',


  }
}




const Messenges = () => {
  const { initialUser } = useSelector(selectUsers)
  // console.log(initialUser);

  const navigate = useNavigate()

  useEffect(() => {
    if (!initialUser.id) {
      navigate('/')
    }
    // console.log(initialUser.id);
  }, [initialUser.id])


  const formRef = useRef(null)
  const dispatch = useDispatch()



  const submitHandler = (e) => {
    e.preventDefault()
    if (formRef.current[0].value) {
      dispatch(sendMess(formRef.current[0].value))
    }
    formRef.current[0].value = ''
  }
  // console.log(initialUser);
  return (
    <div className='mess'>
      <div className='mess-header'>
        <img alt='img' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
        <span>{initialUser.username}</span>
      </div>
      <div className='mess-disp'>
        {
          initialUser.messages?.map(message => (
            <p className='mess' key={message.id} style={messageStyle[message.user]}>{message.txt} { message.user === 'me' && <span onClick={() => dispatch(dellMess(message.id))} className='dell'>X</span>}</p>
          ))
        }

      </div>

      <div >
        <form ref={formRef} onSubmit={submitHandler} className='mess-input'>
          <input type='text' placeholder='Напишите сообщение...' />
          <button>Отправить</button>
        </form>
      </div>


    </div>
  )
}

export default Messenges