import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'

export const Body = () => {
  return (
    
    <div data-theme="dark" className="min-h-screen">
    <NavBar/>
   <Outlet/>
   </div>
 
  )
}
