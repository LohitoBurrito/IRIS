import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import './contactGui.css'

function ContactGui() {
    const [youtube, changeYoutube] = useState("");
    const [instagram, changeInstagram] = useState("");
    const [slack, changeSlack] = useState("");
    const [twitter, changeTwitter] = useState("");
    const [gmail, changeGmail] = useState("");
    const [facebook, changeFacebook] = useState("");

    const uploadInstagram = (e) => {
        e.preventDefault();
        Axios.post("https://illinoisroboticsinspacebackend.onrender.com/api/post/instagram", JSON.stringify({ 
            link: instagram,
          }), {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    const uploadYoutube = (e) => {
        e.preventDefault();
        Axios.post("https://illinoisroboticsinspacebackend.onrender.com/api/post/youtube", JSON.stringify({ 
            link: youtube,
          }), {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    const uploadTwitter = (e) => {
        e.preventDefault();
        Axios.post("https://illinoisroboticsinspacebackend.onrender.com/api/post/twitter", JSON.stringify({ 
            link: twitter,
          }), {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    const uploadFacebook = (e) => {
        e.preventDefault();
        Axios.post("https://illinoisroboticsinspacebackend.onrender.com/api/post/facebook", JSON.stringify({ 
            link: facebook,
          }), {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    const uploadGmail = (e) => {
        e.preventDefault();
        Axios.post("https://illinoisroboticsinspacebackend.onrender.com/api/post/gmail", JSON.stringify({ 
            link: gmail,
          }), {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    const uploadSlack = (e) => {
        e.preventDefault();
        Axios.post("https://illinoisroboticsinspacebackend.onrender.com/api/post/slack", JSON.stringify({ 
            link: slack,
          }), {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    return (
        <div className='contactGui' id='contactGui'>
            <h1>Contact</h1>
            <div className='forms2'>
                <form onSubmit={ uploadInstagram }>
                    <input type="text" placeholder='enter instagram link' value={instagram} onChange={(e) => {changeInstagram(e.target.value)}}/>
                    <br/><br/>
                    <button className='deleteMember'>Change Instagram</button>
                </form>
                <form onSubmit={ uploadTwitter }>
                    <input type="text" placeholder='enter twitter link' value={twitter} onChange={(e) => {changeTwitter(e.target.value)}}/>
                    <br/><br/>
                    <button className='deleteMember'>Change Twitter</button>
                </form>
                <form onSubmit={ uploadYoutube }>
                    <input type="text" placeholder='enter youtube link' value={youtube} onChange={(e) => {changeYoutube(e.target.value)}}/>
                    <br/><br/>
                    <button className='deleteMember'>Change Youtube</button>
                </form>
                <form onSubmit={ uploadFacebook }>
                    <input type="text" placeholder='enter facebook link' value={facebook} onChange={(e) => {changeFacebook(e.target.value)}}/>
                    <br/><br/>
                    <button className='deleteMember'>Change Facebooks</button>
                </form>
                <form onSubmit={ uploadGmail }>
                    <input type="text" placeholder='enter email address' value={gmail} onChange={(e) => {changeGmail(e.target.value)}}/>
                    <br/><br/>
                    <button className='deleteMember'>Change Email Address</button>
                </form>
                <form onSubmit={ uploadSlack }>
                    <input type="text" placeholder='enter slack link' value={slack} onChange={(e) => {changeSlack(e.target.value)}}/>
                    <br/><br/>
                    <button className='deleteMember'>Change Slack</button>
                </form>
            </div>
        </div>
    )
}

export default ContactGui