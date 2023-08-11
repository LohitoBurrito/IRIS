import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { SponsorCollectionRef, SponsorPackageCollectionRef } from '../../firebase/Firebase'
import { getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import './sponsor.css'


function SponsorImage({url}) {
  return (
    <img className="sponsorImage" src={url}/>
  )
}

function Sponsor() {

  const [sponsor, setSponsor] = useState([]);
  const [sponsorPackage, setSponsorPackage] = useState("")
  
  useEffect(() => {

    const getSponsors = async () => {
      const data = await getDocs(SponsorCollectionRef)
      const dataUpdated = data.docs.map((doc) => ({...doc.data()})).sort((a, b) =>  a.order - b.order )
      setSponsor(dataUpdated)
    }

    const getSponsorsPackage = async () => {
      const data = await getDocs(SponsorPackageCollectionRef)
      const dataUpdated = data.docs.map((doc) => ({...doc.data()}))[0].link
      setSponsorPackage(dataUpdated)
    }

    getSponsors()
    getSponsorsPackage()
    
  },[]);


  return (
    <div className='sponsor'>
      <Navbar/>
      <h1>Sponsor Us:</h1>
      <h3><a href={sponsorPackage}>Sponsor Package</a></h3>
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
            if (val.sponsorType === "star") {
              return (
                <>
                  <SponsorImage url={ val.image }/>
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
            if (val.sponsorType === "planet") {
              return (
                <>
                  <SponsorImage url={ val.image }/>
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