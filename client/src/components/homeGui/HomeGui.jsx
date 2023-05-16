import React from "react";
import Axios from 'axios'
import { useState, useEffect } from 'react'
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
    const [zoom, setZoom] = useState("");

    const [award, setAward] = useState("");
    const [delAward, setDelAward] = useState("");
    const [allAwards, setAllAwards] = useState([]);
    const [robot, setRobot] = useState("");
    const [robotX, setRobotX] = useState("");
    const [robotY, setRobotY] = useState("");
    const [robotZoom, setRobotZoom] = useState("");
    const [robotFilename, setRobotFilename] = useState("");
    const [robotFiledata, setRobotFiledata] = useState("");

    useEffect(() => {
      Axios.get(link + "/api/get/awards").then((response) => { setAllAwards(response.data) })
    })

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

    const handleSubmit7 = (e) => {
      e.preventDefault()
      Axios.post(link + "/api/post/addAward", JSON.stringify({ Award: award }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }

    const handleSubmit8 = (e) => {
      e.preventDefault()
      Axios.delete(link + '/api/delete/deleteAward/' + delAward);
    }

    const handleSubmit9 = (e) => {
      e.preventDefault()
      if (robotFiledata === '') {
        Axios.put(link + "/api/put/updateRobot", JSON.stringify({ 
          x: robotX,
          y: robotY,
          zoom: robotZoom,
          robotName: robot, 
        }), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } else {
        const formData = new FormData();
        formData.append("filename", robotFilename);
        formData.append("filedata", robotFiledata);
        formData.append("robotName", robot);
        formData.append("x", robotX);
        formData.append("y", robotY);
        formData.append("zoom", robotZoom);
        Axios.put(link + '/api/put/updateRobot', formData, {
          headers: {
            "Content-Type":"multipart/form-data"
          }
        }).then(res2 => console.log(res2)).catch(err => console.log(err));
      }
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
          <form onSubmit={ handleSubmit3 }>
            <input type="text" placeholder="enter event name" value={ teamEventName } onChange={(e) => {setVal3(e.target.value)}}/>
            <br/><br/>
            <textarea className="teamEventDesc" placeholder="enter new team event description here" type="text" value = { teamEventDesc } onChange={(e) => {setVal4(e.target.value)}}></textarea>
            <br/><br/>
            <button className="teamEventButton">Add new Team Event</button>
          </form>
          <br/><br/>
          <form onSubmit={ handleSubmit2 } style={{ height: "450px" }}>
            <br/><br/>
            <div className="glanceInput">
              <input id="glanceInputText" type="text" placeholder="Years as a team" onChange={(e) => { amountOfYears(e.target.value) }}></input>
              <input id="glanceInputText" type="text" placeholder="Members Amount" onChange={(e) => { amountOfMembers(e.target.value) }}></input>
              <input id="glanceInputText" type="text" placeholder="Mentors Amount" onChange={(e) => { amountOfMentors(e.target.value) }}></input>
              <input id="glanceInputText" type="text" placeholder="Set X (leave blank if you did not upload image)" onChange={(e) => { setX(e.target.value) }}></input>
              <input id="glanceInputText" type="text" placeholder="Set Y (leave blank if you did not upload image)" onChange={(e) => { setY(e.target.value) }}></input>
              <input id="glanceInputText" type="text" placeholder="Set Zoom (leave blank if you did not upload image)" onChange={(e) => { setZoom(e.target.value) }}></input>
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
          <div className="other_home_forms">
            <br/><br/>
            <form onSubmit={ handleSubmit7 }>
              <input placeholder="Award Name" type="text" onChange={(e) => {setAward(e.target.value)}}/>            
              <br/><br/>
              <button className="teamEventButton">Add new Award</button>
            </form>
            <form onSubmit={ handleSubmit8 }>
              <select id="comboA" onChange={(e) => {
                    setDelAward(e.target.value)
                }}>
                    <option disabled selected value="disabled">Choose award to be deleted</option>
                    {
                        allAwards.map((val) => {
                            return (
                                <option value={val.Award}>{val.Award}</option>
                            )
                        })
                    }
              </select>
              <br/><br/>
              <button className="teamEventButton">Delete Award</button>
            </form>
            <form onSubmit={ handleSubmit9 }>
              <input placeholder="Robot Name" type="text" onChange={(e) => {setRobot(e.target.value)}}/>
              <br/><br/>
              <input placeholder="Set X (leave blank if you did not upload image)" type="text" onChange={(e) => {setRobotX(e.target.value)}}/>
              <br/><br/>
              <input placeholder="Set Y (leave blank if you did not upload image)" type="text" onChange={(e) => {setRobotY(e.target.value)}}/>
              <br/><br/>
              <input placeholder="Set Zoom (leave blank if you did not upload image)" type="text" onChange={(e) => {setRobotZoom(e.target.value)}}/>
              <br/><br/>
              <input type="file" onChange={(e) => {
                setRobotFilename(e.target.files[0]);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setRobotFiledata(reader.result)
                }
                reader.readAsDataURL(e.target.files[0]);
              }}/>
              <br/><br/>
              <button className="teamEventButton">Create or Update Current Robot</button>
              <br/><br/>
            </form>
          </div>
          <div className="glanceImageOutputContainer">
            <div className="" style={{
              width: "400px",
              marginTop: "150px",
              height: "400px",
              marginRight: "100px",
              backgroundImage: "url(" + robotFiledata + ")",
              backgroundSize: "contain",
              borderRadius: "200px",
              backgroundPositionX: robotX + "px",
              backgroundPositionY: robotY + "px",
              backgroundSize: robotZoom + "%", 
              marginLeft: "45px",
              marginBottom: "50px" 
            }}>
            </div> 
          </div>
          <br/><br/>
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