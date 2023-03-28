import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import './join.css'

function Join() {
  var count = 0;
  return (
    <div className='join'>
      <Navbar/>
      <h1>Join</h1>
      <hr/>
      <br/><br/>
      <div className='QandA'>
        <div className='QandAcontainer'>
          <p className='FAQ'>FAQ</p>
        </div>
      </div>
      <br/><br/>
      <Footer/>
    </div>
  )
}

export default Join