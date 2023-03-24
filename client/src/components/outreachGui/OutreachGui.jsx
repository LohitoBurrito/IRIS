import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import './outreachGui.css'

function OutreachGui() {
    const [desc, setDesc] = useState("");
    const [title, setTitle] = useState("");
    const [filedata, setFileData] = useState(null);
    const [filename, setFileName] = useState("");
    const [x, setX] = useState("0");
    const [y, setY] = useState("0");
    const [zoom, setZoom] = useState("100");
    const [width, setWidth] = useState("500");
    const [deleteTitle, setDeleteTitle] = useState("");

    const addOutreach = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("file", filename);
        formdata.append("title", title);
        formdata.append("desc", desc);
        formdata.append("x", x);
        formdata.append("y", y);
        formdata.append("zoom", zoom);
        formdata.append("width", width);
        formdata.append("filename", "images/" + filename.name)
        Axios.post('https://illinoisroboticsinspacebackend.onrender.com/api/post/addOutreach', formdata, {
            headers: {
                "Content-Type":"multipart/form-data"
            }
        }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    const deleteOutreach = (e) => {
        e.preventDefault();
        Axios.post('https://illinoisroboticsinspacebackend.onrender.com/api/post/deleteOutreach', JSON.stringify({ 
            outreachTitle: deleteTitle
        }), {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(res2 => console.log(res2)).catch(err => console.log(err));
    }

    return (
        <div className='outreachGui' id='outreachGui'>
            <h1>Outreach</h1>
            <div className='forms2'>
                <form onSubmit={addOutreach}>
                    <input type="text" placeholder='enter outreach event title' onChange={(e) => {
                        setTitle(e.target.value);
                    }}/>
                    <br/><br/>
                    <input className="damn" id="file-upload" type="file" onChange={(e) => {
                        setFileName(e.target.files[0]);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setFileData(reader.result)
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
                    <input type="text" placeholder='set image width (initial: 500)' onChange={(e) => {
                        setWidth(e.target.value);
                    }}/>                
                    <br/><br/>
                    <textarea placeholder='enter outreach description here' onChange={(e) => {
                        setDesc(e.target.value);
                    }}></textarea>
                    <br/><br/>
                    <button className='addMember'>Add Outreach</button>
                </form>
                <br/><br/>
                <div className='cardO'>
                    <div className='imageBox' style={{
                        width: width + "px",
                        height: "350px",
                        backgroundPosition: x + "px" + " " + y + "px",
                        backgroundImage: "url(" + filedata + ")",
                        backgroundSize: zoom + "%",
                        border: "none"
                    }}></div>
                    <div className='descriptionBox'>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                    </div>
                </div>
                <form onSubmit={deleteOutreach}>
                    <input type="text" placeholder='enter outreach event title' value={deleteTitle} onChange={(e)=> {
                        setDeleteTitle(e.target.value);
                    }}/>
                    <br/><br/>
                    <button className='deleteMember'>Delete Outreach</button>
                </form>
            </div>
        </div>
    )
}

export default OutreachGui