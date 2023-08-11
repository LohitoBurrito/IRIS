import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { HomePageCollectionRef } from '../../../firebase/Firebase';
import { getDocs } from 'firebase/firestore';
import './home.css'

function Event() {
  const [demos, setDemos] = useState([]);
  const [events, setEvents] = useState([]);

  const val1 = screen.width > 650 ? "eventContainer" : "eventContainerBlock"
  const val2 = screen.width > 650 ? "eventDates" : "eventDatesBlock"

  useEffect(() => {
    const getDemosEvents = async () => {
      const data = await getDocs(HomePageCollectionRef)
      const dataUpdated = data.docs.map((doc) => ({...doc.data()}))[0]
      setDemos(dataUpdated.Demos_And_Outreach)
      setEvents(dataUpdated.Team_Events)
    }

    getDemosEvents()
  },[])

  // h3 -> title
  // h4 -> description
  if (events !== undefined && events.length !== 0) {
    console.log(events.keys)
  }

  return (
    <div className='event'>
      <h1>Upcoming Events</h1>
      <p>A full calendar is available on our <Link className="link" to="/calendar">calendar</Link> page.</p>
      <div className={val2}>
        <div className={val1}>
          <h2>Team Meetings:</h2>
          <p>All meets posted on <Link className="link" to="/calendar">calendar</Link></p>
        </div>
        <div className={val1}>
          <h2>Team Events:</h2>
          {
            events.map((val) => {
              return (
                <>
                  <h3>{val.Title}</h3>
                  <h4>{val.Description}</h4>
                </>
              )
            })
          }
        </div>
        <div className={val1}>
          <h2>Demos and Outreach:</h2>
          {
            demos.map((val) => {
              return (
                <>
                  <h3>{val.Title}</h3>
                  <h4>{val.Description}</h4>
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
    const getAbout = async () => {
      const data = await getDocs(HomePageCollectionRef)
      setAboutUs(data.docs.map((doc) => ({...doc.data()}))[0].About)
    }

    getAbout()
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
  const date = new Date().getFullYear()

  useEffect(() => {
    const getTeamGlance = async () => {
      const data = await getDocs(HomePageCollectionRef)
      setTeamGlanceData(data.docs.map((doc) => ({...doc.data()}))[0])
    }

    getTeamGlance()
  },[])


  return (
    <div className='teamGlance'>
      <br/><br/>
      <h1>Our Team at a Glance</h1>
      <div className='teamGlanceContainer'>
        <div className='team_container_1'>
          <div className='teamGlanceImage' style={{
            width: "400px",
            height: "400px",
            backgroundImage: "url(" + teamGlanceData.Team_Image + ")",
            backgroundSize: "contain",
            borderRadius: "200px",
            backgroundPositionX: teamGlanceData.Team_Image_x + "px",
            backgroundPositionY: teamGlanceData.Team_Image_y + "px",
            backgroundSize: teamGlanceData.Team_Image_zoom + "%",   
            backgroundRepeat: "no-repeat"         
          }}>
          </div> 
          <div className='teamGlanceText'>
            <p>Years As A Team: {teamGlanceData.Years}</p><br/>
            <p>Members: {teamGlanceData.Members}</p><br/>
            <p>Mentors: {teamGlanceData.Mentors}</p><br/>
          </div>
        </div>
        <br/><br/><br/><br/>
        <div className='team_container_2'>
          <div className='teamGlanceText' style={{
            paddingTop: "75px",
            width: "400px",
            textAlign: "center"
          }}>
            <h2 style={{
              fontSize: "40px",
              fontWeight: "500"
            }}>{date} Season: </h2><br/>
            <p>Awards:</p><br/>
            {
              teamGlanceData.Awards !== undefined ?
              teamGlanceData.Awards.map((val) => {
                return (
                  <>
                    <p style={{
                      fontSize: "22.5px",
                      fontWeight: "300"
                    }}>{val}</p><br/>
                  </>
                )
              }) : <></>
            }
            <p>Robot: </p><br/>
            <p style={{
              fontSize: "22.5px",
              fontWeight: "300"
            }}>{teamGlanceData.Robot_Description}</p>
          </div>
          <div className='teamGlanceImage' style={{
            width: "400px",
            height: "400px",
            backgroundImage: "url(" + teamGlanceData.Robot_Image + ")",
            backgroundSize: "contain",
            borderRadius: "200px",
            backgroundPositionX: teamGlanceData.Robot_Image_x + "px",
            backgroundPositionY: teamGlanceData.Robot_Image_y + "px",
            backgroundSize: teamGlanceData.Robot_Image_zoom + "%",  
            backgroundRepeat: "no-repeat",
          }}>
          </div> 
        </div>
        <br/>
      </div>
    </div>
  )
}

function Hero() {

  const val = screen.width > 650 ? (
    <>
      <h2>WE</h2>
      <ul>
        <li><span>ARE INNOVATORS</span></li>
        <li><span>ARE LEADERS</span></li>
        <li><span>ARE FAMILY</span></li>
        <li><span>ARE A TEAM</span></li>
        <li><span>ARE IRIS</span></li>
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
      <div className='imageSlideAnim4'></div>
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