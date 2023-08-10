import React from 'react'
import Home from './home/Home'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import './main.css'


function Main() {
  return (
    <div className='Main'>
      <Navbar className='nav'/>
      <Home/>
      <Footer/>
    </div>
  )
}

export default Main