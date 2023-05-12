import React from 'react'
import Axios from 'axios'
import { useState } from 'react'
import './sponsorGui.css'

const link = process.env.REACT_APP_API_URL;

function SponsorGui() {
    const [filename, uploadFilename] = useState("");
    const [filedata, setFileData] = useState("");
    const [title, changeTitle] = useState('');
    const [deleteTitle, updateDeleteTitle] = useState('');
    const [sponsorType, changeSponsorType] = useState("star")

    const postFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('filename', filename);
        formData.append('filedata', filedata);
        formData.append('title', title);
        formData.append('sponsorType', sponsorType);
        
        Axios.post(link + "/api/post/addNewSponsor", formData , {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        
        Axios.post(link + "/api/post/addNewSponsor", JSON.stringify({yo: "hey"}), {
            headers : {
                'Content-Type': 'application/json'
            }
        });
        
        
    }

    const deleteFile = (e) => {
        e.preventDefault();
        Axios.delete(link + "/api/delete/deleteSponsor/" + deleteTitle)
    }

    return (
        <div className='sponsorGui' id='sponsorGui'>
            <h1>Sponsors</h1>
            <div className='forms2'>
                <form onSubmit={ postFile }>
                    <input type="text" placeholder='enter sponsor name' value={ title } onChange={(e) => {changeTitle(e.target.value)}}/>
                    <br/><br/>
                    <select name="sponsorType" id="sponsorType" onChange={(e) => {
                        changeSponsorType(e.target.value);
                    }}>
                        <option value="star">Star</option>
                        <option value="planet">Planet</option>
                    </select>
                    <input id="file-upload" type="file" onChange={(e) => {
                        uploadFilename(e.target.files[0]);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setFileData(reader.result)
                        }
                        reader.readAsDataURL(e.target.files[0]);
                    }}/>                
                    <br/><br/>
                    <button className='addMember'>Add Sponsor</button>
                </form>
                <form onSubmit = { deleteFile }>
                    <input type="text" placeholder='enter full sponsor name here' value={ deleteTitle } onChange={(e) => {updateDeleteTitle(e.target.value)}}/>
                    <br/><br/>
                    <button className='deleteMember'>Delete Sponsor</button>
                </form>
            </div>
        </div>
    )
}

export default SponsorGui