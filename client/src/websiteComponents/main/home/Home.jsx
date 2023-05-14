import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'
import './home.css'

const link = process.env.REACT_APP_API_URL;


function Event() {
  const [demos, setDemos] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get(link + "/api/get/demos").then((response) => { setDemos(response.data) })
    Axios.get(link + "/api/get/teamEvent").then((response) => { setEvents(response.data) })
  },[])

  return (
    <div className='event'>
    <h1>Upcoming Events</h1>
    <p>A full calendar is available on our <Link className="link" to="/calendar">calendar</Link> page.</p>
    <div className="eventDates">
      <div className="eventContainer">
        <h2>Team Meetings:</h2>
        <p>All meets posted on <Link className="link" to="/calendar">calendar</Link></p>
      </div>
      <div className="eventContainer">
        <h2>Team Events:</h2>
        {
          events.map((val) => {
            return (
              <>
                <h3>{val.eventTitle}</h3>
                <h4>{val.eventDesc}</h4>
              </>
            )
          })
        } 
      </div>
      <div className="eventContainer">
        <h2>Demos and Outreach:</h2>
          {
            demos.map((val) => {
              return (
                <>
                  <h3 className='homepageTitle'>{val.demosTitle}</h3>
                  <h4 className='homepageDescription'>{val.demosDesc}</h4>
                </>
              )
            })
          }
      </div>
    </div>
    </div>
  )
}

function AboutUs() {
  const [aboutUs, setAboutUs] = useState("");

  useEffect(() => {
    Axios.get(link + "/api/get/aboutUs").then((response) => { setAboutUs(response.data[0].aboutUsDesc) })
  },[])

  return (
    <div id="about" className='aboutUs'>
      <h1>Who we are</h1>
      <p>{aboutUs}</p>
    </div>
  )
}

function TeamGlance() {
  const [teamGlanceData, setTeamGlanceData] = useState([])
  const [url, setUrl] = useState("")

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  useEffect(() => {
    Axios.get(link + "/api/get/teamGlance").then((response) => {
      setTeamGlanceData(response.data[0]);
      const base64 = arrayBufferToBase64(response.data[0].image.data.data);
      setUrl("data:image/png;base64," + base64);
    })
  },[])


  return (
    <div className='teamGlance'>
      <h1>Our Team at a Glance</h1>
      <div className='teamGlanceContainer'>
        <div className='teamGlanceImage' style={{
          width: "400px",
          height: "400px",
          backgroundImage: "url(" + url + ")",
          backgroundSize: "contain",
          borderRadius: "200px",
          backgroundPositionX: teamGlanceData.x + "px",
          backgroundPositionY: teamGlanceData.y + "px",
          backgroundSize: teamGlanceData.zoom + "%",            
        }}>
        </div> 
        <div className='teamGlanceText'>
          <p>Years As A Team: {teamGlanceData.Years}</p><br/>
          <p>Members: {teamGlanceData.Member}</p><br/>
          <p>Mentors: {teamGlanceData.Mentor}</p><br/>
        </div>
      </div>
    </div>
  )
}

function Hero() {

  const val = screen.width > 650 ? (
    <>
      <h2>WE</h2>
      <ul>
        <li><span>ARE IRIS</span></li>
        <li><span>BUILD ROVERS</span></li>
      </ul>
    </>
  ) : (<><h2 style={{ color: "#3d3c3d" }}>WE</h2><h2 style={{ color: "#3d3c3d" }}>ARE IRIS</h2></>)

  return (
    <>
      <div className='hero'>
        <div className='heroContainer'>
          <div className='animation'>
            { val }
          </div>
          <p>Illinois Robotics in Space based in Urbana Champaign, Illinois</p>
          <a href="#about">Learn More</a>
        </div>
      </div> 
      <div className='imageSlideAnim'></div>
      <div className='imageSlideAnim2'></div>
      <div className='imageSlideAnim3'></div>
    </>
  )
}

function Home() {
  return (
    <div className='Home'>
      <Hero/>
      <AboutUs/>
      <TeamGlance/>
      <Event/>
    </div>
  )
}

export default Home