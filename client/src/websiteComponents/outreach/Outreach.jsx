import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import './outreach.css'

const link = "https://illinoisroboticsinspacebackend.onrender.com";
//const link = "http://localhost:4000"

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
    <div className='card2'>
      <div className='descriptionBoxR'>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <div className='imageBox' style={{
          width: 500 + "px",
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
  var count = 0;
  const [outreach, setOutreach] = useState([]);

  useEffect(() => {
    Axios.get(link + "/api/get/getOutreach").then((response) => {
      console.log(response.data);
      setOutreach(response.data)
    })
  },[]);


  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <div className='outreach'>
      <Navbar/>
      <h1>Outreach</h1>
      <hr/>
      <div className='allCards'>
        {
          outreach.map((val) => {
            count++;
            if (count % 2 == 0) {

            }
            const base64 = arrayBufferToBase64(val.image.data.data);
            console.log(base64);
            const url = 'data:image/png;base64,' + base64;
            if (count % 2 == 0) {
              return (
                <OutreachCardR title={val.Title} desc={val.Description} picture={url} x={val.x} y={val.y} zoom={val.zoom} width={val.width}/>
              )
            } else {
              return (
                <OutreachCardL title={val.Title} desc={val.Description} picture={url} x={val.x} y={val.y} zoom={val.zoom} width={val.width}/>
              )
            }
          })
        }
      </div>
      <Footer/>
    </div>
  )
}

export default Outreach