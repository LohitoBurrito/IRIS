import React from 'react'
import { useState, useEffect } from 'react'
import './members.css'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Axios from 'axios'

const link = process.env.REACT_APP_API_URL;

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
    Axios.get(link + '/api/get/members').then(res => {
      setMembers(res.data);
    });
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
    <div className='members'>
      <Navbar/>
      <h1 className='memberHeader'>Members</h1>
      <hr/>
      <div className='membersContainer'>
        {
          members.map((val, key) => {
            const base64 = arrayBufferToBase64(val.image.data.data);
            console.log(base64);
            const url = 'data:image/png;base64,' + base64;
            return (
              <Card name={val.MemberName} role={val.JobTitle} picture={url} desc={val.Description} link={val.Linkedin} zoom={val.zoom} x={val.x} y={val.y}/>
            )
          })
        }
      </div>
      <Footer/>
    </div>
  )
}

export default Members