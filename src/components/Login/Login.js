import React, { useEffect } from 'react'
import './Login.css'
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {  selectUsers, setInitialUser } from '../../store/slices/users/usersSlice';
import {  fetchUsers } from '../../store/slices/users/usersAPI';
import { useNavigate } from 'react-router-dom';




const Login = () => {

  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  // console.log(users.initialUser);
  const navigate = useNavigate()


  useEffect(() => {
    if(!users.data.length){
      dispatch(fetchUsers())
    }
  },[])

  useEffect(()=> {
    if(users.initialUser.id){
      navigate('/news/profile')
    }
  },[users.initialUser])

  const validationSchema = yup.object().shape({
    login: yup.string().typeError('petq e lini tox').required('partadir e'),
    password: yup.string().typeError('petq e lini tox').required('partadir e')
  })



  return (
    <Formik
      initialValues={{
        login:'',
        password:''
      }}

      onSubmit={(values ,{resetForm}) => {
        dispatch(setInitialUser({
          login:values.login,
          password:values.password
        }))
        resetForm()
      }}

      validateOnBlur

      validationSchema={validationSchema}

    >

      {
        ({ values, errors, dirty, handleBlur, handleChange, touched, isValid, handleSubmit }) => (

          <form className="logForm" onSubmit={handleSubmit}>
            <div className='login'>
              <div className='login-block'>
                <div className='login-logo'>
                  <img alt='logo' src='https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png' />
                </div>
                <div className='login-reg'>
                  <input placeholder='Телефон, имя пользователя или эл.адрес' className="logInp2"
                    type={'text'}
                    name={'login'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.login}
                  />
                  {touched.login && errors.login && <p>{errors.login}</p>}


                  <input placeholder="Пароль" className="passInp2"
                    type={'password'}
                    name={'password'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {touched.password && errors.password && <p>{errors.password}</p>}




                  <button className="login-btn"
                    type="submit"
                    disabled={!isValid && !dirty}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </form>
        )
      }


    </Formik>
  )

}

export default Login