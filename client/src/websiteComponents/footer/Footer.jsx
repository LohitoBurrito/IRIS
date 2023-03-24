import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
import { AiFillHeart } from 'react-icons/ai'
import { BsInstagram, BsYoutube } from 'react-icons/bs'
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa'

function Footer() {
  return (
    <div className='footer'>
        <div className='footerBox'>
          <div className='logoBox'>
            <Link className='logo' to="/main">IRIS</Link>
          </div>
          <div className='socials'>
            <div className='socialsContainer'>
              <a href="https://www.instagram.com/iris.uiuc/"><BsInstagram/></a>
            </div>
            <div className='socialsContainer'>
              <a href="https://www.facebook.com/IllinoisRoboticsInSpace/"><FaFacebookSquare/></a>
            </div>
            <div className='socialsContainer'>
              <a href="https://twitter.com/iris_uiuc?lang=en"><FaTwitterSquare/></a>
            </div>
            <div className='socialsContainer'>
              <a href="https://www.youtube.com/@IRISUIUC"><BsYoutube/></a>
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