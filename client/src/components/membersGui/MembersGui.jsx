import React from 'react'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import './membersGui.css'

const link = process.env.REACT_APP_API_URL;

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

    const [allMembers, setAllMembers] = useState([]) 
    const [updateName, setUpdateName] = useState("")
    const [updateNewName, setUpdateNewName] = useState("")
    const [updateJobTitle, setUpdateJobTitle] = useState("");
    const [updateDesc, setUpdateDesc] = useState("");
    const [updateLinkedin, setUpdateLinkedin] = useState("");  
    const [updateX, setUpdateX] = useState("0");  
    const [updateY, setUpdateY] = useState("0");
    const [updateZoom, setUpdateZoom] = useState("100");   
    const [updateFilename, setUpdateFilename] = useState("");
    const [updateFileData, setUpdateFileData] = useState(null);

    useEffect(() => {
        Axios.get(link + "/api/get/members").then((response) => { setAllMembers(response.data)} )
    })

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
                "Content-Type": "multipart/form-data"
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

    const updateMember = (e) => {
        e.preventDefault();
        setUpdateName(updateNewName);
        if (updateFileData === null) {
            console.log("got here")
            Axios.put(link + "/api/put/updateMember", JSON.stringify({
                oldName: updateName,
                newName: updateNewName,
                jobTitle: updateJobTitle,
                linkedin: updateLinkedin,
                desc: updateDesc,
                x: updateX,
                y: updateY,
                zoom: updateZoom
            }), {
                headers: {
                  'Content-Type': 'application/json'
                }
            })
        } else {
            const formdata = new FormData();
            formdata.append("filedata", updateFileData);
            formdata.append("filename", updateFilename);
            formdata.append("oldName", updateName);
            formdata.append("newName", updateNewName);
            formdata.append("jobTitle", updateJobTitle);
            formdata.append("linkedin", updateLinkedin);
            formdata.append("desc", updateDesc);
            formdata.append("x", updateX);
            formdata.append("y", updateY);
            formdata.append("zoom", updateZoom);
            console.log(updateFilename);
            Axios.put(link + "/api/put/updateMember", formdata, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res2 => console.log(res2)).catch(err => console.log(err))
        }
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
                    <input id="members-file-upload" type="file" onChange={(e) => {
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


                <form onSubmit={ updateMember }>
                    <select id="comboA" onChange={(e) => {
                        console.log(e.target.value)
                        setUpdateName(e.target.value)
                    }}>
                        <option disabled selected value="disabled">Choose member to be updated</option>
                        {
                            allMembers.map((val) => {
                                return (
                                    <option value={val.MemberName}>{val.MemberName}</option>
                                )
                            })
                        }
                    </select>
                    <br/><br/>
                    <input type="text" placeholder='enter new name here' onChange={(e) => {
                        setUpdateNewName(e.target.value);
                    }}/>
                    <br/><br/>
                    <input type="text" placeholder='enter new role here' onChange={(e) => {
                        setUpdateJobTitle(e.target.value);
                    }}/>
                    <br/><br/>
                    <input type="text" placeholder='enter new linkedin here' onChange={(e) => {
                        setUpdateLinkedin(e.target.value);
                    }}/>
                    <br/><br/>
                    <input id="members-file-upload" type="file" onChange={(e) => {
                        setUpdateFilename(e.target.files[0]);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setUpdateFileData(reader.result)
                            console.log(reader.result)
                        }
                        reader.readAsDataURL(e.target.files[0]);
                    }}/>
                    <br/><br/>
                    <input type="text" placeholder='new zoom (intial: 100)' onChange={(e) => {
                        setUpdateZoom(e.target.value);
                    }}/>
                    <br/><br/>
                    <input type="text" placeholder='new moveX (- left/ + right) (initial: 0)' onChange={(e) => {
                        setUpdateX(e.target.value);
                    }}/>
                    <br/><br/>
                    <input type="text" placeholder='new moveY (- down/ + up) (initial: 0)' onChange={(e) => {
                        setUpdateY(e.target.value * -1);
                    }}/>                
                    <br/><br/>
                    <textarea placeholder='enter new description here' onChange={(e) => {
                        setUpdateDesc(e.target.value);
                    }}></textarea>
                    <br/><br/>
                    <button className='addMember'>Update Member</button>
                </form>
                <div className='membersPreview'>
                <div className="cards">
                    <div className='pictureContainer'>
                        <div className='pictureContainer2' style={{
                            width: "150px",
                            height: "100%",
                            backgroundSize: updateZoom + "%",
                            marginTop: "20px",
                            borderRadius: "100px",
                            backgroundPosition: updateX + "px" + " " + updateY + "px",
                            backgroundImage: "url(" + updateFileData + ")",
                            
                        }}>
                        </div>
                    </div>
                    <h1 className='name'>{updateNewName}</h1>
                    <div className='roleContainer'>
                        <em>{updateJobTitle}</em>
                    </div>
                    <br/><br/>
                    <p>{updateDesc}</p>
                    <a href={updateLinkedin}>linkedin</a>
                    </div>
                </div>


                <br/><br/><br/><br/>
                <form onSubmit={ deleteMember }>
                    <select id="comboA" onChange={(e) => {
                        console.log(e.target.value)
                        setDeleteName(e.target.value)
                    }}>
                        <option disabled selected value="disabled">Choose member to be updated</option>
                        {
                            allMembers.map((val) => {
                                return (
                                    <option value={val.MemberName}>{val.MemberName}</option>
                                )
                            })
                        }
                    </select>
                    <br/><br/>
                    <button className='deleteMember'>Delete Member</button>
                </form>
            </div>
        </div>
    )
}

export default MembersGui