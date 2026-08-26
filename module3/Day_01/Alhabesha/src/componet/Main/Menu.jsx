import React from 'react'
import Main from './Menu/Main'
import SideBar from './SideBar/SideBar'
import './Manu.css'


function Menu() {
  return (
    <div className='main'>
        <Main/>
        <SideBar/>
    </div>
  )
}

export default Menu