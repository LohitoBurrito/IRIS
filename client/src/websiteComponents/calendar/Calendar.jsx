import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import calendarFile from '../../data/calendar.json'
import './calendar.css'

function Calendar() {
  return (
    <div className='calendar'>
      <Navbar/>
      <h1>Calendar</h1>
      <hr/>
      <div className='calendarContainer'>
        {
          calendarFile.map(calendar => {
            return (
              <iframe src={calendar.link} style={{
                borderWidth:'0',
                paddingTop: '7.5vh',
                paddingBottom: '7.5vh'
              }} width={1000} height={710} frameBorder={0}></iframe>
            )
          })
        }
      </div>
      <Footer/>
    </div>
  )
}

export default Calendar