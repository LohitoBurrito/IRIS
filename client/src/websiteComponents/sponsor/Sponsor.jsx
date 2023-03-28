import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import './sponsor.css'

function SponsorImage({url}) {
  return (
    <div className='sponsorImage' style={{
      backgroundImage: "url(" + url + ")",
      height: "200px",
      width: "200px",
      backgroundSize: "contain"
    }}></div>
  )
}

function Sponsor() {
  return (
    <div className='sponsor'>
      <Navbar/>
      <h1>Sponsor Us:</h1>
      <h3><a href="https://drive.google.com/file/d/1vxkaQB-io5pGporD5L91k8Sjy9NK8gvj/view">Sponsor Package</a></h3>
      <p className='bruh'>
      We have the talent. We have the passion. We need help from generous companies willing to support Illinois Robotics in Space as we build the best in autonomous and innovative mining robots.
      </p>
      <p className='bruh'>
      Interested in supporting our team? We’d love to talk to you! The best way to learn everything to know about sponsorship is through our Sponsorship Packet. Take a look, and contact us at iris.uiuc@gmail.com if you have any questions!
      </p>
      <br/><br/><br/>
      <h2>Star Sponsors</h2>
      <div className='sponsorCards'>

      </div>
      <h2>Planet Sponsors</h2>
      <div className='sponsorCards'>

      </div>
      <br/>
      <Footer/>
    </div>
  )
}

export default Sponsor