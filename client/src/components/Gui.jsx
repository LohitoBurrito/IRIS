import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import Sidebar from './sidebar/Sidebar'
import HomeGui from './homeGui/HomeGui'
import MembersGui from './membersGui/MembersGui'
import OutreachGui from './outreachGui/OutreachGui'
import CalendarGui from './calendar/CalendarGui'
import SponsorGui from './sponsorGui/SponsorGui'
import ContactGui from './contactGui/ContactGui'
import JoinGui from './joinGui/JoinGui'
import loggedInStatus from '../data/loggedIn.json'
import './gui.css'

const sideBar3Dark = {
  width : '82.5vw',
  backgroundColor : '#161818',
  marginLeft: '17.5vw'
}

function GuiPage() {
  const [contentStyle, setContentStyle] = useState(sideBar3Dark);

  return (
  <>
      <div className='gui'>
          <Sidebar changeStyle={(size) => {setContentStyle(size)}} />
          <div className='mainGui' style={ contentStyle }>
            <HomeGui/>
            <MembersGui/>
            <OutreachGui/>
            <CalendarGui/>
            <SponsorGui/>
            <ContactGui/>
            <JoinGui/>
          </div>
      </div>
  </>
)
}

function Gui() {
  const [password, changePassword] = useState("");

  const checkPassword = (e) => {
    e.preventDefault();
    Axios.post('https://illinoisroboticsinspacebackend.onrender.com/api/post/login', JSON.stringify({ password: password }), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res2 => console.log(res2))
    .catch(err => console.log(err));
  }

  return (
  <>
    {
      loggedInStatus.map(state => {
        if (!state.login) {
          return (
            <div className='loginPage'>
              <div className='loginContainer'>
                <h1>IRIS</h1>
                <form onSubmit={ checkPassword }>
                  <input type="text" placeholder='enter key word' value={password} onChange={(e) => {
                    changePassword(e.target.value);
                  }}/>
                  <br/><br/>
                  <button>Enter Password</button>
                </form>
              </div>
            </div>
          )
        } else {
          return (
            <GuiPage/>
          )
        }
      })
    }
  </>
  )
}

export default Gui