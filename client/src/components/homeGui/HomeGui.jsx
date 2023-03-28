import React from "react";
import Axios from 'axios'
import { useState } from 'react'
import './homeGui.css'

const link = "http://localhost:4000";
//const link = "https://illinoisroboticsinspacebackend.onrender.com";

function HomeGui() {
    const [newAboutUs, setVal] = useState("");
    const [newTeamGlance, setVal2] = useState("");
    const [teamEventName, setVal3] = useState("");
    const [teamEventDesc, setVal4] = useState("");
    const [demosName, setVal5] = useState("");
    const [demosDesc, setVal6] = useState("");
    const [eventNameDel, setVal7] = useState("");
    const [demosNameDel, setVal8] = useState("");


  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Post Request to About Us
      Axios.post(link + '/api/post/about', JSON.stringify({ Id: newAboutUs }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }
  
    const handleSubmit2 = (e) => {
      e.preventDefault();
      // Post Request to Our Team at a Glance
      Axios.post(link + '/api/post/teamGlance', JSON.stringify({ Id: newTeamGlance }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    const handleSubmit3 = (e) => {
      e.preventDefault();
      // Post Request to Team Event
      Axios.post(link + '/api/post/addteamEvents', JSON.stringify({ 
        title: teamEventName,
        desc: teamEventDesc
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    const handleSubmit4 = (e) => {
      e.preventDefault();
      // Post Request to Team Event
      Axios.post(link + '/api/post/addDemos', JSON.stringify({ 
        title: demosName,
        desc: demosDesc
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    const handleSubmit5 = (e) => {
      e.preventDefault();
      // Post Request to Team Event
      Axios.post(link + '/api/post/deleteteamEvents', JSON.stringify({ 
        title: eventNameDel,
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }
    const handleSubmit6 = (e) => {
      e.preventDefault();
      // Post Request to Team Event
      Axios.post(link + '/api/post/deleteDemosOutreach', JSON.stringify({ 
        title: demosNameDel,
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    return (
      <div className='homeGui' id='homeGui'>
        <h1>Home Gui</h1>
        <div className='forms'>
          <form onSubmit={ handleSubmit }>
            <textarea className="aboutInput" placeholder="enter about us here" type="text" value = {newAboutUs} onChange={(e) => {setVal(e.target.value)}}></textarea>
            <br/><br/>
            <button className="aboutButton">Submit About Us</button>
          </form>
          <form onSubmit={ handleSubmit2 }>
            <textarea className="glanceInput" placeholder="enter our team at a glance here" type="text" value = { newTeamGlance } onChange={(e) => {setVal2(e.target.value)}}></textarea>
            <br/><br/>
            <button className="glanceButton">Submit Our Team at a Glance</button>
          </form>
          <form onSubmit={ handleSubmit3 }>
            <input type="text" placeholder="enter event name" value={ teamEventName } onChange={(e) => {setVal3(e.target.value)}}/>
            <br/><br/>
            <textarea className="teamEventDesc" placeholder="enter new team event description here" type="text" value = { teamEventDesc } onChange={(e) => {setVal4(e.target.value)}}></textarea>
            <br/><br/>
            <button className="teamEventButton">Add new Team Event</button>
          </form>
          <form onSubmit={ handleSubmit4 }>
            <input type="text" placeholder="enter demo/outreach name" value={ demosName } onChange={(e) => {setVal5(e.target.value)}}/>
            <br/><br/>
            <textarea className="teamEventDesc" placeholder="enter new demo/outreach description here" type="text" value = { demosDesc } onChange={(e) => {setVal6(e.target.value)}}></textarea>
            <br/><br/>
            <button className="teamEventButton">Add new Demos and Outreach</button>
          </form>
          <form onSubmit={ handleSubmit5 }>
            <input type="text" placeholder="enter event name" value={ eventNameDel } onChange={(e) => {setVal7(e.target.value)}}/>
            <br/><br/>
            <button className="deleteEventButton">Delete Event</button>
          </form>
          <form onSubmit={ handleSubmit6 }>
            <input type="text" placeholder="enter demo/outreach name" value={ demosNameDel } onChange={(e) => {setVal8(e.target.value)}}/>
            <br/><br/>
            <button className="deleteEventButton">Delete demo/outreach</button>
          </form>
        </div>
      </div>
    )
  }

  export default HomeGui