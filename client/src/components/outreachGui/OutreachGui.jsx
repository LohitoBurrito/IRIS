import React from 'react'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import './outreachGui.css'

const link = process.env.REACT_APP_API_URL;

function OutreachGui() {
    const [desc, setDesc] = useState("");
    const [title, setTitle] = useState("");
    const [filename, setFileName] = useState("");
    const [x, setX] = useState("0");
    const [y, setY] = useState("0");
    const [zoom, setZoom] = useState("100");
    const [deleteTitle, setDeleteTitle] = useState("");
    const [filedata, setFileData] = useState("");
    const [imageSize, setImageSize] = useState(0);
    const [textClass, setTextClass] = useState("descriptionBoxWide");

    const [allOutreach, setAllOutreach] = useState([]);
    const [oldOutreachTitle, setOldOutreachTitle] = useState("")
    const [updateDesc, setUpdateDesc] = useState("");
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateFilename, setUpdateFileName] = useState("");
    const [updateX, setUpdateX] = useState("0");
    const [updateY, setUpdateY] = useState("0");
    const [updateZoom, setUpdateZoom] = useState("100");
    const [updateDeleteTitle, setUpdateDeleteTitle] = useState("");
    const [updateFiledata, setUpdateFileData] = useState("");
    const [updateImageSize, setUpdateImageSize] = useState(0);
    const [updateTextClass, setUpdateTextClass] = useState("descriptionBoxWide");

    const addOutreach = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        if (filedata !== "") {
            formdata.append("filename", filename);
            formdata.append("filedata", filedata)
            formdata.append("title", title);
            formdata.append("desc", desc);
            formdata.append("x", x);
            formdata.append("y", y);
            formdata.append("zoom", zoom);
            Axios.post(link + '/api/post/addOutreach', formdata, {
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            }).then(res2 => console.log(res2)).catch(err => console.log(err));
        } else {
            Axios.post(link + '/api/post/addOutreach', JSON.stringify({
                desc: desc,
                title: title
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    useEffect(() => {
        Axios.get(link + "/api/get/getOutreach").then((response) => { setAllOutreach(response.data) });
    })

    const deleteOutreach = (e) => {
        e.preventDefault();
        Axios.delete(link + '/api/delete/deleteOutreach/' + deleteTitle);
    }

    const updateOutreach = (e) => {
        e.preventDefault()
        setOldOutreachTitle(updateTitle);
        if (updateFiledata === '') {
            Axios.put(link + "/api/put/updateOutreach", JSON.stringify({
                desc: updateDesc,
                newTitle: updateTitle,
                oldTitle: oldOutreachTitle
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            const formdata = new FormData();
            formdata.append("filename", updateFilename);
            formdata.append("filedata", updateFiledata)
            formdata.append("newTitle", updateTitle);
            formdata.append("oldTitle", oldOutreachTitle)
            formdata.append("desc", updateDesc);
            formdata.append("x", updateX);
            formdata.append("y", updateY);
            formdata.append("zoom", updateZoom);
            Axios.put(link + '/api/put/updateOutreach', formdata, {
                headers: {
                    "Content-Type":"multipart/form-data"
                }
            }).then(res2 => console.log(res2)).catch(err => console.log(err));
        }
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
                            setTextClass("descriptionBox");
                            setImageSize(500);
                            setFileData(reader.result);
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
                    <textarea placeholder='enter outreach description here' onChange={(e) => {
                        setDesc(e.target.value);
                    }}></textarea>
                    <br/><br/>
                    <button className='addMember'>Add Outreach</button>
                </form>
                <br/><br/>
                <div className='cardO'>
                    <div className='imageBox' style={{
                        width: imageSize + "px",
                        height: "100%",
                        backgroundPosition: x + "px" + " " + y + "px",
                        backgroundImage: "url(" + filedata + ")",
                        backgroundSize: zoom + "%",
                        border: "none",
                    }}></div>
                    <div className={textClass}>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                    </div>
                </div>




                <form onSubmit={ updateOutreach }>
                    <select id="comboA" onChange={(e) => {
                        console.log(e.target.value)
                        setOldOutreachTitle(e.target.value)
                    }}>
                        <option disabled selected value="disabled">Choose outreach to be updated</option>
                        {
                            allOutreach.map((val) => {
                                return (
                                    <option value={val.Title}>{val.Title}</option>
                                )
                            })
                        }
                    </select>
                    <br/><br/>
                    <input type="text" placeholder='enter new outreach event title' onChange={(e) => {
                        setUpdateTitle(e.target.value);
                    }}/>
                    <br/><br/>
                    <input className="damn" id="file-upload" type="file" onChange={(e) => {
                        setUpdateFileName(e.target.files[0]);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setUpdateTextClass("descriptionBox");
                            setUpdateImageSize(500);
                            setUpdateFileData(reader.result);
                        }
                        reader.readAsDataURL(e.target.files[0]);
                    }}/>
                    <br/><br/>
                    <input type="text" placeholder='zoom (intial: 100)' onChange={(e) => {
                        setUpdateZoom(e.target.value);
                    }}/>                    
                    <br/><br/>
                    <input type="text" placeholder='moveX (- left/ + right) (initial: 0)' onChange={(e) => {
                        setUpdateX(e.target.value);
                    }}/>                    
                    <br/><br/>
                    <input type="text" placeholder='moveY (- down/ + up) (initial: 0)' onChange={(e) => {
                        setUpdateY(e.target.value * -1);
                    }}/>                                 
                    <br/><br/>
                    <textarea placeholder='enter outreach description here' onChange={(e) => {
                        setUpdateDesc(e.target.value);
                    }}></textarea>
                    <br/><br/>
                    <button className='addMember'>Update Outreach</button>
                </form>
                <br/><br/>
                <div className='cardO'>
                    <div className='imageBox' style={{
                        width: updateImageSize + "px",
                        height: "100%",
                        backgroundPosition: updateX + "px" + " " + updateY + "px",
                        backgroundImage: "url(" + updateFiledata + ")",
                        backgroundSize: updateZoom + "%",
                        border: "none",
                    }}></div>
                    <div className={updateTextClass}>
                        <h3>{updateTitle}</h3>
                        <p>{updateDesc}</p>
                    </div>
                </div>    




                <form onSubmit={deleteOutreach}>
                    <select id="comboA" onChange={(e) => {
                        console.log(e.target.value)
                        setDeleteTitle(e.target.value)
                    }}>
                        <option disabled selected value="disabled">Choose outreach to be deleted</option>
                        {
                            allOutreach.map((val) => {
                                return (
                                    <option value={val.Title}>{val.Title}</option>
                                )
                            })
                        }
                    </select>
                    <br/><br/>
                    <button className='deleteMember'>Delete Outreach</button>
                </form>
            </div>
        </div>
    )
}

export default OutreachGui