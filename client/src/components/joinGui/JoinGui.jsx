import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import './joinGui.css'

const link = "http://localhost:4000";
//const link = "https://illinoisroboticsinspacebackend.onrender.com";

function JoinGui() {
    const [content, setContent] = useState("");
    const [question, setQuestion] = useState("");
    const [delQuestion, setDelQuestion] = useState("");

    const config =  {
        'Content-Type': 'application/json'
    }

    const changeDesc = (e) => {
        e.preventDefault();
        Axios.post(link + '/api/post/addJoin', JSON.stringify({ content: content }),  {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res2 => console.log(res2))
        .catch(err => console.log(err));
    }
    const addQuestion = (e) => {
        e.preventDefault();
        Axios.post(link + '/api/post/addQuestion', JSON.stringify({ question: question }), {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res2 => console.log(res2))
        .catch(err => console.log(err));
    }
    const deleteQuestion = (e) => {
        e.preventDefault();
        Axios.post(link + '/api/post/deleteQuestion', JSON.stringify({ question: delQuestion }), {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res2 => console.log(res2))
        .catch(err => console.log(err));
    }


    return (
        <div className='joinGui' id="joinGui">
            <h1>Join</h1>
            <form onSubmit={ changeDesc }>
                <textarea placeholder='enter content here' value={ content } onChange={(e) => {setContent(e.target.value)}}></textarea>
                <br/><br/>
                <button>Submit Join Content</button>
            </form>
            <form onSubmit={ addQuestion }> 
                <textarea placeholder='enter question here to be added' value={ question } onChange={(e) => {setQuestion(e.target.value)}}></textarea>
                <br/><br/>
                <button>Submit Question</button>
            </form>
            <form onSubmit={ deleteQuestion }> 
                <textarea placeholder='enter question here to be deleted' value={ delQuestion } onChange={(e) => {setDelQuestion(e.target.value)}}></textarea>
                <br/><br/>
                <button>Delete Question</button>
            </form>
        </div>
    )
}

export default JoinGui