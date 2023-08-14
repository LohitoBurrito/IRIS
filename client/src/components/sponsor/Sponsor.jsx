import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { SponsorCollectionRef, SponsorPackageCollectionRef } from '../../firebase/Firebase'
import { getDocs } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import './sponsor.css'


function SponsorImage({url, link}) {
  return (
    <a href={link} target="_blank" style={{ cursor: "pointer" }}><img href={link} className="sponsorImage" src={url}/></a>
  )
}

function Sponsor() {

  const [sponsor, setSponsor] = useState([]);
  const [sponsorPackage, setSponsorPackage] = useState("")
  const [paragraph_1, setParagraph_1] = useState("") 
  const [paragraph_2, setParagraph_2] = useState("") 
  
  useEffect(() => {

    const getSponsors = async () => {
      const data = await getDocs(SponsorCollectionRef)
      const dataUpdated = data.docs.map((doc) => ({...doc.data()})).sort((a, b) =>  a.order - b.order )
      setSponsor(dataUpdated)
    }

    const getSponsorsPackage = async () => {
      const data = await getDocs(SponsorPackageCollectionRef)
      const dataUpdated = data.docs.map((doc) => ({...doc.data()}))[0]

      setSponsorPackage(dataUpdated.link)
      setParagraph_1(dataUpdated.Paragraph_1)
      setParagraph_2(dataUpdated.Paragraph_2)
    }

    getSponsors()
    getSponsorsPackage()
    
  },[]);


  return (
    <div className='sponsor'>
      <Navbar/>
      <h1>Sponsor Us:</h1>
      <h3><a href={sponsorPackage}>Sponsor Packet</a></h3>
      <p className='bruh'>
        {paragraph_1}
      </p>
      <p className='bruh'>
        {paragraph_2}
      </p>
      <br/><br/><br/>
      <h2>Star Sponsors</h2>
      <div className='sponsorCards'>
        {
          sponsor.map((val) => {
            if (val.sponsorType === "star") {
              return (
                <>
                  <SponsorImage url={ val.image } link={ val.link }/>
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