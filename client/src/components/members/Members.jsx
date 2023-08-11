import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { MembersCollectionRef } from '../../firebase/Firebase'
import { getDocs } from 'firebase/firestore'
import './members.css'

function Card({name, role, picture, desc, link, zoom, x, y}) {
  if (name === "Soumil Gupta") {
    console.log(picture)
  }
  return (
    <div className="cards">
      <div className='pictureContainer'>
      <div className='pictureContainer2' style={{
              width: "150px",
              height: "100%",
              backgroundSize: zoom + "%",
              marginTop: "20px",
              borderRadius: "100px",
              backgroundPosition:  x + "px" + " " + y + "px",
              backgroundImage: "url(" + picture + ")"
        }}>
        </div>
      </div>
      <h1>{name}</h1>
      <div className='roleContainer'>
        <em>{role}</em>
      </div>
      <br/><br/>
      <p>{desc}</p>
      <a href={link}>linkedin</a>
    </div>
  )
}

/*
  const base64 = btoa(String.fromCharCode(... new Uint8Array(singleData.image.data.data)));
  const url = 'data:image/png;base64,' + base64;
  return (
    <Card name={val.MemberName} role={val.JobTitle} picture={url} desc={val.Description} link={val.Linkedin} zoom={val.zoom} x={val.x} y={val.y}/>
  )

  <Card name={val.MemberName} role={val.JobTitle} picture={url} desc={val.Description} link={val.Linkedin} zoom={val.zoom} x={val.x} y={val.y}/>
*/

function Members() {
  const [members, setMembers] = useState([]);
  useEffect(() => {

    const getMembers = async () => {
      const data = await getDocs(MembersCollectionRef)
      const dataUpdated = data.docs.map((doc) => ({...doc.data()})).sort((a, b) =>  a.order - b.order )
      setMembers(dataUpdated)
    }

    getMembers()
    
  },[]);

  return (
    <div className='members'>
      <Navbar/>
      <h1 className='memberHeader'>Members</h1>
      <hr/>
      <div className='membersContainer'>
        {
          members.map((val) => {
            return (
              <Card name={val.MemberName} role={val.JobTitle} picture={val.image} desc={val.Description} link={val.Linkedin} zoom={val.zoom} x={val.x} y={val.y}/>
            )
          })
        }
      </div>
      <Footer/>
    </div>
  )
}

export default Members