import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from '../Header/Header'

function HeaderWrapper() {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}

export default HeaderWrapper