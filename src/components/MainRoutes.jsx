import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import Hero from './Home/Hero'
import Dashoboard from './Dashoboard'
import Blog from './Home/Blog'
import About from './Home/About'
import AboutMiddle from './Home/AboutMiddle'
import AboutLast from './Home/AboutLast'
import Brand from './Home/Brand'
import Event from './Home/Event'

const MainRoutes = ({ onLogout }) => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Dashoboard />} />
      <Route path="/hero" element={<Hero />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/about" element={<About />} />
      <Route path="/aboutmiddle" element={<AboutMiddle />} />
      <Route path="/aboutlast" element={<AboutLast />} />
      <Route path="/brand" element={<Brand />} />
      <Route path="/event" element={<Event />} />
    </Routes>
  );
};

export default MainRoutes
