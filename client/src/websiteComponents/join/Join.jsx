import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import './join.css'
import joinContent from '../../data/join/joinContent.json'
import questions from '../../data/join/questions.json'

function Join() {
  var count = 0;
  return (
    <div className='join'>
      <Navbar/>
      <h1>Join</h1>
      <hr/>
      {
        joinContent.map(content => {
          return (
            <p className='joinContent'>{content.content}</p>
          )
        })
      }
      <br/><br/>
      <div className='QandA'>
        <div className='QandAcontainer'>
          <p className='FAQ'>FAQ</p>
          {
            questions.map(question => {
              count++;
              return (
                <>
                  <p className='Questions'>{count}. {question.question}</p>
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