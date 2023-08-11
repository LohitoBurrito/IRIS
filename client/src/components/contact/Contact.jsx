import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { AiFillSlackSquare } from 'react-icons/ai'
import { BsInstagram, BsYoutube } from 'react-icons/bs'
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { useState, useEffect } from 'react'
import { contactCollectionRef } from '../../firebase/Firebase'
import { getDocs } from 'firebase/firestore'
import './contact.css'

function Contact() {
  const [links, setLinks] = useState("");

  useEffect(() => {
    const getContact = async () => {
      const data = await getDocs(contactCollectionRef)
      setLinks(data.docs.map((doc) => ({...doc.data()}))[0])
    }

    getContact()
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
            <h3><a target="_blank" href={links.Instagram}><BsInstagram className='socialLogo'/></a></h3>
            <h3><a target="_blank" href={links.Twitter}><FaTwitterSquare className='socialLogo'/></a></h3>
            <h3><a target="_blank" href={links.Youtube}><BsYoutube className='socialLogo'/></a></h3>
            <h3><a target="_blank" href={links.Facebook}><FaFacebookSquare className='socialLogo'/></a></h3>
          </div>
        </div>
      </div>
      <div className='slack'>
        <h3>Slack<a target="_blank" href={links.Slack}><AiFillSlackSquare className='slackLogo'/></a></h3>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact