import React from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import MainRoutes from './components/MainRoutes'

export default function App() {
  return (
    <div>
     <Navbar />
     <div className='flex'>
     <Sidebar />
     <div className='mt-24 ml-[230px]'>
     <MainRoutes />
     </div>
     </div>
    </div>
  )
}
