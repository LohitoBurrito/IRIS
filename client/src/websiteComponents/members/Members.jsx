import React from 'react'
import './members.css'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import members from '../../data/members.json'



function Card({name, role, picture, desc, link, zoom, x, y}) {
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

function Members() {
  return (
    <div className='members'>
      <Navbar/>
      <h1 className='memberHeader'>Members</h1>
      <hr/>
      <div className='membersContainer'>
        {
          members.map(member => {
            return (
              <Card key={member.memberName} name={member.memberName} role={member.role} picture={member.fileData} desc={member.desc} link={member.linkedin} zoom={member.zoom} x={member.x} y= {member.y}/>
            )
          })
        }
      </div>
      <Footer/>
    </div>
  )
}

export default Members