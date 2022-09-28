import React from 'react'
import './Header.css'
import { NavLink, Link } from 'react-router-dom'
import { RiHome2Line } from 'react-icons/ri'
import { TbBrandMessenger } from 'react-icons/tb'
import { BiMessageSquareAdd, BiSearch } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { searchUser } from '../../store/slices/searchSlice/searchSlice'
import { logOut, selectUsers } from '../../store/slices/users/usersSlice'



const Header = () => {
  const dispatch = useDispatch()
  const { initialUser } = useSelector(selectUsers)

  return (
    <div className='header'>
      <NavLink to='/news'>
        <div className='header-logo'>
          <img alt='logo' src='https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png' />
        </div>
      </NavLink>
      <div className='header-search'>
        <BiSearch color='grey' size='21px' className='search-icon' /><input onChange={(e) => dispatch(searchUser(e.target.value))} type='text' placeholder='Поиск' />
      </div>
      <div className='header-links'>
        <NavLink to='/news'><RiHome2Line size='25px' /></NavLink>
        <NavLink to='/news/messenges'><TbBrandMessenger size='25px' /></NavLink>
        <NavLink to='/news/add-img'><BiMessageSquareAdd size='25px' /></NavLink>
        <NavLink to='/news/profile'>
          <img className='profile-img' alt='profile-img' src='https://www.whatsappimages.in/wp-content/uploads/2021/07/Top-HD-sad-quotes-for-whatsapp-status-in-hindi-Pics-Images-Download-Free.gif' />
        </NavLink>
        <Link className='log' to='/' onClick={() => dispatch(logOut())}>Log Out</Link>

      </div>
    </div>
  )
}

export default Header