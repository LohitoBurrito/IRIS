import React from 'react'
import Axios from 'axios'
import { useState } from 'react'
import './membersGui.css'

const link = "https://illinoisroboticsinspacebackend.onrender.com";

function MembersGui() {
    const [name, setName] = useState("");
    const [deleteName, setDeleteName] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [linkedin, setLinkedin] = useState("");  
    const [x, setX] = useState("0");  
    const [y, setY] = useState("0");
    const [zoom, setZoom] = useState("100");   
    const [filename, setfilename] = useState("");
    const [fileData, setFileData] = useState(null);

    const submitMember = (e) => {
        console.log("add data");
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("file", fileData);
        formdata.append("filename", filename);
        formdata.append("memberName", name);
        formdata.append("role",jobTitle);
        formdata.append("description",desc);
        formdata.append("linkedinURL",linkedin);
        formdata.append("xPos", x);
        formdata.append("yPos", y);
        formdata.append("Zoom", zoom);
        console.log(filename);
        Axios.post(link + '/api/post/addMember', formdata, {
            headers: {
                "Content-Type":"multipart/form-data"
            }
        }).then(res2 => console.log(res2)).catch(err => console.log(err));
        
    }
    const deleteMember = (e) => {
        e.preventDefault();
        Axios.post(link + '/api/post/deleteMember', JSON.stringify({ 
            memberName: deleteName
        }), {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    return (
        <div className='membersGui' id='membersGui'>
            <h1 className="Title">Members</h1>
            <div className='forms2'>
                <form onSubmit={ submitMember }>
                    <input type="text" placeholder='enter full name here' onChange={(e) => {
                        setName(e.target.value);
                    }}/>
                    <br/><br/>
                    <input type="text" placeholder='enter role here' onChange={(e) => {
                        setJobTitle(e.target.value);
                    }}/>
                    <br/><br/>
                    <input type="text" placeholder='enter linkedin here' onChange={(e) => {
                        setLinkedin(e.target.value);
                    }}/>
                    <br/><br/>
                    <input id="file-upload" type="file" onChange={(e) => {
                        setfilename(e.target.files[0]);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setFileData(reader.result)
                            console.log(reader.result)
                        }
                        reader.readAsDataURL(e.target.files[0]);
                    }}/>
                    <br/><br/>
                    <input type="text" placeholder='zoom (intial: 100)' onChange={(e) => {
                        setZoom(e.target.value);
                    }}/>
                    <br/><br/>
                    <input type="text" placeholder='moveX (- left/ + right) (initial: 0)' onChange={(e) => {
                        setX(e.target.value);
                    }}/>
                    <br/><br/>
                    <input type="text" placeholder='moveY (- down/ + up) (initial: 0)' onChange={(e) => {
                        setY(e.target.value * -1);
                    }}/>                
                    <br/><br/>
                    <textarea placeholder='enter description here' onChange={(e) => {
                        setDesc(e.target.value);
                    }}></textarea>
                    <br/><br/>
                    <button className='addMember'>Add Member</button>
                </form>
                <div className='membersPreview'>
                <div className="cards">
                    <div className='pictureContainer'>
                        <div className='pictureContainer2' style={{
                            width: "150px",
                            height: "100%",
                            backgroundSize: zoom + "%",
                            marginTop: "20px",
                            borderRadius: "100px",
                            backgroundPosition: x + "px" + " " + y + "px",
                            backgroundImage: "url(" + fileData + ")",
                            
                        }}>
                        </div>
                    </div>
                    <h1 className='name'>{name}</h1>
                    <div className='roleContainer'>
                        <em>{jobTitle}</em>
                    </div>
                    <br/><br/>
                    <p>{desc}</p>
                    <a href={linkedin}>linkedin</a>
                    </div>
                </div>
                <br/><br/><br/><br/>
                <form onSubmit={ deleteMember }>
                    <input type="text" placeholder='enter full name here' value={deleteName} onChange={(e) => {setDeleteName(e.target.value)}}/>
                    <br/><br/>
                    <button className='deleteMember'>Delete Member</button>
                </form>
            </div>
        </div>
    )
}

export default MembersGui