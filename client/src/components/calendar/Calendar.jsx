import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { useState, useEffect } from 'react'
import { getDocs } from 'firebase/firestore'
import { calendarCollectionRef } from '../../firebase/Firebase'
import './calendar.css'

function Calendar() {
  const [calendar, setCalendar] = useState("");

  useEffect(() => {
    const getCalendar = async () => {
      const data = await getDocs(calendarCollectionRef)
      setCalendar(data.docs.map((doc) => ({...doc.data()}))[0].Calendar_Link)
    }

    getCalendar()
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