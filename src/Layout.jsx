import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <header> <Header/> </header>
      <main> <Outlet/> </main>
      
    </div>
  )
}
