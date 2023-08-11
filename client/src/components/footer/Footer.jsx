import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillHeart } from 'react-icons/ai'
import { BsInstagram, BsYoutube } from 'react-icons/bs'
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { contactCollectionRef } from '../../firebase/Firebase'
import { getDocs } from 'firebase/firestore'
import './footer.css'

function Footer() {
  const [links, setLinks] = useState("");

  useEffect(() => {
    const getContact = async () => {
      const data = await getDocs(contactCollectionRef)
      setLinks(data.docs.map((doc) => ({...doc.data()}))[0])
    }

    getContact()
  },[])

  return (
    <div className='footer'>
        <div className='footerBox'>
          <div className='footerBox2'>
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
          </div>         
        </div>
        <div className='copyright'>
          <p className='para'>2023 © Illinois Robotics in Space</p>
          <p className='para'>Made with <AiFillHeart/> in Urbana Champaign, IL</p>
        </div> 
    </div>
  )
}

export default Footer