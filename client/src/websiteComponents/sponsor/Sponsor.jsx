import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import './sponsor.css'

const link = process.env.REACT_APP_API_URL;

function SponsorImage({url}) {
  return (
    <img src={url}/>
  )
}

function Sponsor() {

  const [sponsor, setSponsor] = useState([]);
  
  useEffect(() => {
    Axios.get(link + "/api/get/getSponsors").then((response) => { 
      console.log(response.data);
      setSponsor(response.data);
    })
  },[]);

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

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
        {
          sponsor.map((val) => {
            const base64 = arrayBufferToBase64(val.filedata.data.data);
            console.log(base64);
            const url = 'data:image/png;base64,' + base64;
            if (val.sponsorType === "star") {
              return (
                <>
                  <SponsorImage url={ url }/>
                </>
              )
            } else {
              return (
                <></>
              )
            }
          })
        }
      </div>
      <h2>Planet Sponsors</h2>
      <div className='sponsorCards'>
        {
          sponsor.map((val) => {
            const base64 = arrayBufferToBase64(val.filedata.data.data);
            console.log(val.title)
            console.log(base64);
            const url = 'data:image/png;base64,' + base64;
            console.log(val.sponsorType)
            if (val.sponsorType === "planet") {
              return (
                <>
                  <SponsorImage url={ url }/>
                </>
              )
            } else {
              return (
                <></>
              )
            }
          })
        }
      </div>
      <br/>
      <Footer/>
    </div>
  )
}

export default Sponsor