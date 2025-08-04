import React from 'react'
import { Outlet } from 'react-router-dom'

const EmployerLayout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Outlet/>
    </div>
  )
}

export default EmployerLayout
