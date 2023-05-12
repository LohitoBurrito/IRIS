import React from "react";
import Axios from 'axios'
import { useState } from 'react'
import './homeGui.css'

const link = process.env.REACT_APP_API_URL;

function HomeGui() {
    const [newAboutUs, setVal] = useState("");
    const [teamEventName, setVal3] = useState("");
    const [teamEventDesc, setVal4] = useState("");
    const [demosName, setVal5] = useState("");
    const [demosDesc, setVal6] = useState("");
    const [eventNameDel, setVal7] = useState("");
    const [demosNameDel, setVal8] = useState("");

    const [mentor, amountOfMentors] = useState("");
    const [members, amountOfMembers] = useState("");
    const [years, amountOfYears] = useState("");
    const [filename, setFilename] = useState("");
    const [filedata, setFiledata] = useState("");
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [zoom, setZoom] = useState("100");

    const handleSubmit2 = (e) => {
      e.preventDefault();
      // Post Request to Our Team at a Glance
      const formData = new FormData();
      formData.append("mentor", mentor);
      formData.append("members", members);
      formData.append("years", years);
      formData.append("filename", filename);
      formData.append("filedata", filedata);
      formData.append("x", x);
      formData.append("y", y);
      formData.append("zoom", zoom);
      
      Axios.put(link + '/api/post/teamGlance', formData, {
        headers: {
          "Content-Type":"multipart/form-data"
        }
      }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      // Post Request to About Us
      Axios.put(link + '/api/put/editAboutUs', JSON.stringify({ Id: newAboutUs }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const handleSubmit3 = (e) => {
      e.preventDefault();
      // Post Request to Team Event
      Axios.post(link + '/api/post/addTeamEvent', JSON.stringify({ 
        title: teamEventName,
        desc: teamEventDesc
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
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
      })
    }

    const handleSubmit5 = (e) => {
      e.preventDefault();
      // Post Request to Team Event
      Axios.delete(link + '/api/delete/deleteTeamEvent/' + eventNameDel);
    }
    const handleSubmit6 = (e) => {
      e.preventDefault();
      // Post Request to Team Event
      Axios.delete(link + '/api/delete/deleteDemos/' + demosNameDel);
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
          <form onSubmit={ handleSubmit2 } style={{ height: "450px" }}>
            <div className="glanceInput">
              <input id="glanceInputText" type="text" placeholder="Years as a team" onChange={(e) => { amountOfYears(e.target.value) }}></input>
              <input id="glanceInputText" type="text" placeholder="Members Amount" onChange={(e) => { amountOfMembers(e.target.value) }}></input>
              <input id="glanceInputText" type="text" placeholder="Mentors Amount" onChange={(e) => { amountOfMentors(e.target.value) }}></input>
              <input id="glanceInputText" type="text" placeholder="Set x" onChange={(e) => { setX(e.target.value) }}></input>
              <input id="glanceInputText" type="text" placeholder="Set Y" onChange={(e) => { setY(e.target.value) }}></input>
              <input id="glanceInputText" type="text" placeholder="Set Zoom" onChange={(e) => { setZoom(e.target.value) }}></input>
              <input type = "file" style={{ marginBottom: "50px" }} onChange={(e) => {
                setFilename(e.target.files[0]);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFiledata(reader.result)
                }
                reader.readAsDataURL(e.target.files[0]);
              }}></input>
            </div>
            <button className="glanceButton">Submit Our Team at a Glance</button>
          </form>
          <div className="glanceImageOutputContainer">
              <div className="" style={{
                width: "400px",
                height: "400px",
                marginRight: "100px",
                backgroundImage: "url(" + filedata + ")",
                backgroundSize: "contain",
                borderRadius: "200px",
                backgroundPositionX: x + "px",
                backgroundPositionY: y + "px",
                backgroundSize: zoom + "%", 
                marginLeft: "45px",
                marginBottom: "50px" 
              }}>
              </div> 
            </div>
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