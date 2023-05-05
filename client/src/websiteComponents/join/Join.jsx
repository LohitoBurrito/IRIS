import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import './join.css'

const link = "https://illinoisroboticsinspacebackend.onrender.com";
//const link = "http://localhost:4000"

function Join() {
  var count = 0;
  const [joinContent, setJoinContent] = useState("");
  const [faq, setFAQ] = useState([]);

  useEffect(() => {
    Axios.get(link + "/api/get/getContent").then((response) => { setJoinContent(response.data[0].Content) })
    Axios.get(link + "/api/get/getFAQ").then((response) => { setFAQ(response.data) })
  },[])

  return (
    <div className='join'>
      <Navbar/>
      <h1>Join</h1>
      <hr/>
      <br/><br/>
      <p className='content'>{ joinContent }</p>
      <br/><br/>
      <div className='QandA'>
        <div className='QandAcontainer'>
          <p className='FAQ'>FAQ</p><br/><br/><br/>
          {
            faq.map((value) => {
              count++;
              console.log(value);
              return (
                <>
                  <p className='Question'>{count}. {value.Question}</p>
                  <br/>
                  <p className='Answer'>{value.Answer}</p>
                  <br/>
                  <br/>
                </>
              )
            })
          }
        </div>
      </div>
      <br/><br/>
      <Footer/>
    </div>
  )
}

export default Join