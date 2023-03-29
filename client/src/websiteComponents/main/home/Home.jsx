import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'
import './home.css'

function Event() {
  const [demos, setDemos] = useState("");
  const [events, setEvents] = useState("");

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

      </div>
      <div className="eventContainer">
        <h2>Demos and Outreach:</h2>

      </div>
    </div>
    </div>
  )
}

function AboutUs() {
  const [aboutUs, setAboutUs] = useState("");
  return (
    <div id="about" className='aboutUs' style={{
      paddingLeft:"20px",
      paddingRight:"20px"
    }}>
      <h1>Who we are</h1>

    </div>
  )
}

function TeamGlance() {
  return (
    <div className='teamGlance' style={{
      paddingLeft:"20px",
      paddingRight:"20px"
    }}>
      <h1>Our Team at a Glance</h1>
    </div>
  )
}

function Hero() {
  return (
    <div className='hero'>
      <div className='heroContainer'>
        <h1>WE ARE IRIS</h1>
        <br/><br/><br/>
        <p>Illinois Robotics in Space based in Urbana Champaign, Illinois</p>
        <br/><br/><br/><br/><br/>
        <a href="#about">Learn More</a>
      </div>
    </div>
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