import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { AiFillHeart, AiFillSlackSquare } from 'react-icons/ai'
import { BsInstagram, BsYoutube } from 'react-icons/bs'
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import './contact.css'

const link = "https://illinoisroboticsinspacebackend.onrender.com";

function Contact() {
  const [links, setLinks] = useState("");

  useEffect(() => {
    Axios.get(link + "/api/get/contactData").then((response) => { 
      console.log(response.data[0]);
      setLinks(response.data[0]);
    })
  },[])

  return (
    <div className='contact'>
      <Navbar/>
      <h1>Contact</h1>
      <div className='contactContainer'>
        <div className='email'>
          <h2>Email</h2>
          <div className='emailContainer'>
            <h3><a href={"mailto:" + links.Gmail}><SiGmail className='emailLogo'/></a></h3>
          </div>
        </div>
        <div className='socials'>
          <h2>Socials</h2>
          <div className='socialsContainer'>
            <h3><a href={links.Instagram}><BsInstagram className='socialLogo'/></a></h3>
            <h3><a href={links.Twitter}><FaTwitterSquare className='socialLogo'/></a></h3>
            <h3><a href={links.Youtube}><BsYoutube className='socialLogo'/></a></h3>
            <h3><a href={links.Facebook}><FaFacebookSquare className='socialLogo'/></a></h3>
          </div>
        </div>
      </div>
      <div className='slack'>
        <h3>Slack<a href={links.Slack}><AiFillSlackSquare className='slackLogo'/></a></h3>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact