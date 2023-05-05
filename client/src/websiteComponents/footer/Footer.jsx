import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
import { AiFillHeart } from 'react-icons/ai'
import { BsInstagram, BsYoutube } from 'react-icons/bs'
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import Axios from 'axios'

const link = "https://illinoisroboticsinspacebackend.onrender.com";

function Footer() {
  const [links, setLinks] = useState("");

  useEffect(() => {
    Axios.get(link + "/api/get/contactData").then((response) => { 
      console.log(response.data[0]);
      setLinks(response.data[0]);
    })
  },[])

  return (
    <div className='footer'>
        <div className='footerBox'>
          <div className='logoBox'>
            <Link className='logo' to="/main">IRIS</Link>
          </div>
          <div className='socials'>
            <div className='socialsContainer'>
              <a href={links.Instagram}><BsInstagram/></a>
            </div>
            <div className='socialsContainer'>
              <a href={links.Facebook}><FaFacebookSquare/></a>
            </div>
            <div className='socialsContainer'>
              <a href={links.Twitter}><FaTwitterSquare/></a>
            </div>
            <div className='socialsContainer'>
              <a href={links.Youtube}><BsYoutube/></a>
            </div>
          </div>
          <div className='copyright'>
            <p className='para'>2023 © Illinois Robotics in Space</p>
            <p className='para'>Made with <AiFillHeart/> in Urbana Champaign, IL</p>
          </div>          
        </div>
    </div>
  )
}

export default Footer