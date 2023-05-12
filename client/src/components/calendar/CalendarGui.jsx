import React from 'react'
import Axios from 'axios'
import { useState } from 'react'
import './calendarGui.css'

const calendarLink = "https://calendar.google.com/calendar/u/0/r?cid=aXJpcy51aXVjQGdtYWlsLmNvbQ"
const link = process.env.REACT_APP_API_URL

function CalendarGui() {
  const [calendar, setCalendar] = useState("https://calendar.google.com/calendar/u/0/embed?=aXJpcy51aXVjQGdtYWlsLmNvbQ");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(link + "/api/post/setCalendar", JSON.stringify({val: calendar}), {
      headers: {
        'Content-Type': 'application/json',
      }   
    });
  }
  

  return (
    <div className='calendarGui' id='calendarGui'>
        <h1>Calendar</h1>
        <div className='forms2'>
            <form onSubmit={ handleSubmit }>
                <input type="text" 
                       className='format' 
                       placeholder='enter calendar link'
                       onChange={(e) => {setCalendar(e.target.value)}}
                />
                <br/><br/>
                <button className='deleteMember'>Submit Calendar</button>
            </form>
        </div>
    </div>
  )
}

export default CalendarGui