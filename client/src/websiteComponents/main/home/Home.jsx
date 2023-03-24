import React from 'react'
import { Link } from 'react-router-dom'
import teamEvents from '../../../data/teamEvents.json'
import demos from '../../../data/demos.json'
import aboutUs from '../../../data/aboutUs.json'
import teamGlance from '../../../data/ourTeamAtAGlance.json'
import './home.css'


function Event() {
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
            teamEvents.map(teamEvent => {
              return (
                <div style={{
                  marginBottom:"20px"
                }}>
                  <h3>{teamEvent.title}</h3>
                  <p className='changeText'>{teamEvent.desc}</p>
                </div>
              )
            })
          }
      </div>
      <div className="eventContainer">
        <h2>Demos and Outreach:</h2>
        {
          demos.map(demo => {
            return (
              <>
                <h3>{demo.title}</h3>
                <p className='changeText'>{demo.desc}</p>
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
  return (
    <div id="about" className='aboutUs' style={{
      paddingLeft:"20px",
      paddingRight:"20px"
    }}>
      <h1>Who we are</h1>
      {
        aboutUs.map(text => {
          return (
            <p style={{
              textAlign: "center",
              fontSize: "30px",
              marginTop: "20px",
              fontWeight: "300",
              color: "#3d3c3d"
            }}>{text.desc}</p>
          )
        })
      }
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
      {
        teamGlance.map(text => {
          return (
            <p style={{
              textAlign: "center",
              fontSize: "30px",
              marginTop: "20px",
              fontWeight: "300",
              color: "#3d3c3d"
            }}>{text.desc}</p>
          )
        })
      }
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