import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import './joinGui.css'

const link = process.env.REACT_APP_API_URL;

function JoinGui() {
    const [content, setContent] = useState("");
    const [question, setQuestion] = useState("");
    const [delQuestion, setDelQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [allQuestions, setAllQuestions] = useState([]);

    const config =  {
        'Content-Type': 'application/json'
    }

    useEffect(() => {
        Axios.get(link + "/api/get/getFAQ").then((response) => { setAllQuestions(response.data) })
    })

    const changeDesc = (e) => {
        e.preventDefault();
        console.log("BRUH");
        Axios.put(link + '/api/put/setContent', JSON.stringify({ content: content }),  {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res2 => console.log(res2))
        .catch(err => console.log(err));
    }
    const addQuestion = (e) => {
        e.preventDefault();
        Axios.post(link + '/api/post/addQuestion', JSON.stringify({ question: question, answer: answer }), {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res2 => console.log(res2))
        .catch(err => console.log(err));
    }
    const deleteQuestion = (e) => {
        e.preventDefault();
        console.log(delQuestion)
        Axios.delete(link + '/api/post/deleteQuestion', {
            data: {
                message: delQuestion
            }
        })
        .then(res2 => console.log(res2))
        .catch(err => console.log(err));
    }


    return (
        <div className='joinGui' id="joinGui">
            <h1>Join</h1>
            <br/>
            <form onSubmit={ addQuestion }> 
                <textarea placeholder='enter question here to be added' value={ question } onChange={(e) => {setQuestion(e.target.value)}}></textarea>
                <br/><br/>
                <textarea placeholder='enter answer here to be added' value={ answer } onChange={(e) => {setAnswer(e.target.value)}}></textarea>
                <br/><br/>
                <button>Submit Question</button>
            </form>
            <form onSubmit={ changeDesc }>
                <textarea placeholder='enter content here' value={ content } onChange={(e) => {setContent(e.target.value)}}></textarea>
                <br/><br/>
                <button>Submit Join Content</button>
            </form>
            <form onSubmit={ deleteQuestion }> 
                    <select id="comboA" onChange={(e) => {
                        console.log(e.target.value)
                        setDelQuestion(e.target.value)
                    }}>
                        <option disabled selected value="disabled">Choose question to be deleted</option>
                        {
                            allQuestions.map((val) => {
                                return (
                                    <option value={val.Question}>{val.Question}</option>
                                )
                            })
                        }
                    </select>
                <br/><br/>
                <button>Delete Question</button>
            </form>
        </div>
    )
}

export default JoinGui