import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import './join.css'

const link = process.env.REACT_APP_API_URL;

function Join() {
  var count = 0;
  const [joinContent, setJoinContent] = useState("");
  const [faq, setFAQ] = useState([]);

  const val1 = screen.width > 650 ? 'QandA' : 'QandA650'
  const val2 = screen.width > 650 ? 'Question' : 'Question650' 
  const val3 = screen.width > 650 ? 'Answer' : 'Answer650'
  const val4 = screen.width > 650 ? 'QandAcontainer' : 'QandAcontainer650'


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
      <div className={val1}>
        <div className={val4}>
          <p className='FAQ'>FAQ</p><br/><br/><br/>
          {
            faq.map((value) => {
              count++;
              console.log(value);
              return (
                <>
                  <p className={val2}>{count}. {value.Question}</p>
                  <br/>
                  <p className={val3}>{value.Answer}</p>
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