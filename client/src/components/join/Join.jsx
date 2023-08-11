import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { useState, useEffect } from 'react'
import { joinParagraphCollectionRef, FAQCollectionRef} from '../../firebase/Firebase' 
import { getDocs } from 'firebase/firestore'
import './join.css'


function Join() {
  const [joinContent, setJoinContent] = useState("");
  const [faq, setFAQ] = useState([]);

  const val1 = screen.width > 650 ? 'QandA' : 'QandA650'
  const val2 = screen.width > 650 ? 'Question' : 'Question650' 
  const val3 = screen.width > 650 ? 'Answer' : 'Answer650'
  const val4 = screen.width > 650 ? 'QandAcontainer' : 'QandAcontainer650'


  useEffect(() => {

    const getJoin = async () => {
      const data = await getDocs(joinParagraphCollectionRef)
      setJoinContent(data.docs.map((doc) => ({...doc.data()}))[0].Join_Paragraph)
    }

    const getFAQ = async () => {
      const data = await getDocs(FAQCollectionRef)
      const dataUpdated = data.docs.map((doc) => ({...doc.data()})).sort((a, b) =>  a.Order - b.Order )
      console.log(dataUpdated)
      setFAQ(dataUpdated)
    }

    getJoin()
    getFAQ()
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
              return (
                <>
                  <p className={val2}>{value.Order}. {value.Question}</p>
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