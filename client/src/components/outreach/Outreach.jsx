import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { useState, useEffect } from 'react'
import { OutreachCollectionRef } from '../../firebase/Firebase'
import { getDocs } from 'firebase/firestore'
import './outreach.css'

function OutreachCardBase({title, desc}) {
  return (
    <div className='cardB'>
      <div className='descriptionBoxBase'>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  )
}

function OutreachCardL({title, desc, picture, x, y, zoom, width}) {
  return (
    <div className='cardO'>
      <div className='imageBox' style={{
          width: 500 + "px",
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
    <div className='card2'>
      <div className='descriptionBoxR'>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className='imageBox' style={{
          width: 500 + "px",
          backgroundPosition: x + "px" + " " + y + "px",
          backgroundImage: "url(" + picture + ")",
          backgroundSize: zoom + "%",
          border: "none"
      }}></div>
    </div>
  )
}

function Outreach() {
  var count = 0;
  const [outreach, setOutreach] = useState([]);

  useEffect(() => {
    const getOutreach = async () => {
      const data = await getDocs(OutreachCollectionRef)
      const dataUpdated = data.docs.map((doc) => ({...doc.data()})).sort((a, b) =>  a.order - b.order )
      setOutreach(dataUpdated)
    }

    getOutreach()
  },[]);


  if (screen.width >= 1250) {
    return (
      <div className='outreach'>
        <Navbar/>
        <h1>Outreach</h1>
        <hr/>
        <div className='allCards'>
          {
            outreach.map((val) => {
              count++;

              if (val.x === "") {
                return (
                  <OutreachCardBase title={val.Title} desc={val.Description}/>
                )
              } else if (count % 2 == 0) {
                return (
                  <OutreachCardR title={val.Title} desc={val.Description} picture={val.image} x={val.x} y={val.y} zoom={val.zoom} width={val.width}/>
                )
              } else {
                return (
                  <OutreachCardL title={val.Title} desc={val.Description} picture={val.image} x={val.x} y={val.y} zoom={val.zoom} width={val.width}/>
                )
              }
            })
          }
        </div>
        <Footer/>
      </div>
    )
  } else {
    return (
      <div className='outreach'>
        <Navbar/>
        <h1>Outreach</h1>
        <hr/>
        <div class="phone">
          {
            outreach.map((val) => {
              if (val.x === undefined) {
                console.log("image does not exist")
                return (
                  <div class="outreachContainer650">
                    <div class="title">
                      <h6 class="outreachHeader">{val.Title}</h6>
                    </div>
                    <div class="content">
                      <p id="outreachpara">{val.Description}</p>
                    </div>
                  </div>
                )
              } else {
                const base64 = arrayBufferToBase64(val.image.data.data);
                const url = 'data:image/png;base64,' + base64;
                return (
                  <div class="outreachContainer650">
                    <div class="imageContainer650">
                      <img id="outreachImage650" src={url}/>
                    </div>
                    <div class="title">
                      <h6 class="outreachHeader">{val.Title}</h6>
                    </div>
                    <div class="content">
                      <p id="outreachpara">{val.Description}</p>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Outreach