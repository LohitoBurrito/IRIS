import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { AiFillHeart, AiFillSlackSquare } from 'react-icons/ai'
import { BsInstagram, BsYoutube } from 'react-icons/bs'
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import './contact.css'

function Contact() {
  return (
    <div className='contact'>
      <Navbar/>
      <h1>Contact</h1>
      <div className='contactContainer'>
        <div className='email'>
          <h2>Email</h2>
          <div className='emailContainer'>
            <h3><a href="mailto:iris.uiuc@gmail.com"><SiGmail className='emailLogo'/></a></h3>
          </div>
        </div>
        <div className='socials'>
          <h2>Socials</h2>
          <div className='socialsContainer'>
            <h3><a href="https://www.instagram.com/iris.uiuc/"><BsInstagram className='socialLogo'/></a></h3>
            <h3><a href="https://twitter.com/iris_uiuc?lang=en"><FaTwitterSquare className='socialLogo'/></a></h3>
            <h3><a href="https://www.youtube.com/@IRISUIUC"><BsYoutube className='socialLogo'/></a></h3>
            <h3><a href="https://www.facebook.com/IllinoisRoboticsInSpace/"><FaFacebookSquare className='socialLogo'/></a></h3>
          </div>
        </div>
      </div>
      <div className='slack'>
        <h3>Slack<a href="https://iris-uiuc.slack.com/join/shared_invite/zt-1r33m7evb-1sgTXDfNzTNUrLR5SuFgjg#/shared-invite/email"><AiFillSlackSquare className='slackLogo'/></a></h3>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact