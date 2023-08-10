import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import './calendar.css'

const link = process.env.REACT_APP_API_URL;

function Calendar() {
  const [calendar, setCalendar] = useState("");

  useEffect(() => {
    Axios.get(link + "/api/get/getCalendar").then((response) => {
      console.log(response.data[0].CalendarLink)
      setCalendar(response.data[0].CalendarLink)
    });
  },[])

  return (
    <div className='calendar'>
      <Navbar/>
      <h1>Calendar</h1>
      <hr/>
      <div className='calendarContainer'>
        <iframe src={ calendar } style={{
          borderWidth:'0',
          paddingTop: '7.5vh',
          paddingBottom: '7.5vh'
        }} width={1000} height={710} frameBorder={0}></iframe>
      </div>
      <Footer/>
    </div>
  )
}

export default Calendar