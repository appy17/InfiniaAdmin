import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'

export default function App() {
  return (
    <div className='text-center'>
      <Routes>
        <Route path='/' element={<Navigate to ='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}
