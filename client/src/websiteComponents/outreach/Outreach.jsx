import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import outreaches from '../../data/outreach.json'
import './outreach.css'

function OutreachCardL({title, desc, picture, x, y, zoom, width}) {
  return (
    <div className='cardO'>
      <div className='imageBox' style={{
          width: width + "px",
          height: "350px",
          backgroundPosition: x + "px" + " " + y + "px",
          backgroundImage: "url(" + picture + ")",
          backgroundSize: zoom + "%",
          border: "none"
        }}></div>
      <div className='descriptionBox'>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  )
}
function OutreachCardR({title, desc, picture, x, y, zoom, width}) {
  return (
    <div className='cardO'>
      <div className='descriptionBox'>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className='imageBox' style={{
          width: width + "px",
          height: "350px",
          backgroundPosition: x + "px" + " " + y + "px",
          backgroundImage: "url(" + picture + ")",
          backgroundSize: zoom + "%",
          border: "none"
      }}></div>
    </div>
  )
}

function Outreach() {
  return (
    <div className='outreach'>
      <Navbar/>
      <h1>Outreach</h1>
      <hr/>
      <div className='allCards'>
        {
          outreaches.map(outreach => {
            return (
              <OutreachCardL key={outreach.title} title={outreach.title} desc={outreach.desc} picture={outreach.fileData} x={outreach.x} y={outreach.y} zoom={outreach.zoom} width={outreach.width}/>
            )
          })
        }
      </div>
      <Footer/>
    </div>
  )
}

export default Outreach