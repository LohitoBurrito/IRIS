import React from 'react'
import './calendarGui.css'

function CalendarGui() {
  return (
    <div className='calendarGui' id='calendarGui'>
        <h1>Calendar</h1>
        <div className='forms2'>
            <form>
                <input type="text" className='format' placeholder='enter calendar here format: https://calendar.google.com/calendar/u/0/embed?=aXJpcy51aXVjQGdtYWlsLmNvbQ'/>
                <br/><br/>
                <button className='deleteMember'>Submit Calendar</button>
            </form>
        </div>
    </div>
  )
}

export default CalendarGui