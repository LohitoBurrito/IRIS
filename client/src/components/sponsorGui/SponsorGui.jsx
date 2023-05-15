import React from 'react'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import './sponsorGui.css'

const link = process.env.REACT_APP_API_URL;

function SponsorGui() {
    const [filename, uploadFilename] = useState("");
    const [filedata, setFileData] = useState("");
    const [title, changeTitle] = useState('');
    const [weblink, setWeblink] = useState('');
    const [deleteTitle, updateDeleteTitle] = useState('');
    const [sponsorType, changeSponsorType] = useState("star");

    const [allSponsors, setAllSponsors] = useState([]);

    const [updateTitle, setUpdateTitle] = useState('');
    const [updateLink, setUpdateLink] = useState('');
    const [updateSponsorType, setUpdateSponsorType] = useState('');
    const [updateFilename, setUpdateFilename] = useState('');
    const [updateFiledata, setUpdateFiledata] = useState('');

    useEffect(() => {
        Axios.get(link + "/api/get/getSponsors").then((response) => { setAllSponsors(response.data) })
    })

    const updateFile = (e) => {
        if (updateFiledata === '') {
            Axios.put(link + '/api/put/updateSponsorData', JSON.stringify({
                title: updateTitle,
                weblink: updateLink,
                sponsorType: updateSponsorType,
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } else {
            e.preventDefault();
            const formData = new FormData();
            console.log(updateFiledata)
            console.log(updateFilename)

            formData.append('filename', updateFilename);
            formData.append('filedata', updateFiledata);
            formData.append('title', updateTitle);
            formData.append('weblink', updateLink);
            formData.append('sponsorType', updateSponsorType);
            
            Axios.put(link + "/api/put/updateSponsorData", formData , {
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    const postFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('filename', filename);
        formData.append('filedata', filedata);
        formData.append('title', title);
        formData.append('weblink', weblink);
        formData.append('sponsorType', sponsorType);
        
        Axios.post(link + "/api/post/addNewSponsor", formData , {
            headers : {
                'Content-Type': 'multipart/form-data'
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
                    <input type="text" placeholder='enter sponsor website url' value={ weblink } onChange={(e) => {setWeblink(e.target.value)}}/>
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
                    <select id="comboA" onChange={(e) => {
                        updateDeleteTitle(e.target.value)
                    }}>
                        <option disabled selected value="disabled">Choose Sponsor to be deleted</option>
                        {
                            allSponsors.map((val) => {
                                return (
                                    <option value={val.title}>{val.title}</option>
                                )
                            })
                        }
                    </select>
                    <br/><br/>
                    <button className='deleteMember'>Delete Sponsor</button>
                </form>
                <form onSubmit = { updateFile }>
                    <select id="comboA" onChange={(e) => {
                        setUpdateTitle(e.target.value)
                    }}>
                        <option disabled selected value="disabled">Choose Sponsor to be updated</option>
                        {
                            allSponsors.map((val) => {
                                return (
                                    <option value={val.title}>{val.title}</option>
                                )
                            })
                        }
                    </select>
                    <br/><br/>
                    <input type="text" placeholder='enter sponsor website url' value={ updateLink } onChange={(e) => {setUpdateLink(e.target.value)}}/>
                    <br/><br/>
                    <select name="sponsorType" id="sponsorType" onChange={(e) => {
                        setUpdateSponsorType(e.target.value);
                    }}>
                        <option disabled selected value="disabled">Choose Sponsor Type</option>
                        <option value="star">Star</option>
                        <option value="planet">Planet</option>
                    </select>
                    <input id="file-upload" type="file" onChange={(e) => {
                        setUpdateFilename(e.target.files[0]);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setUpdateFiledata(reader.result)
                        }
                        reader.readAsDataURL(e.target.files[0]);
                    }}/>                     
                    <br/><br/>
                    <button className='deleteMember'>Update Sponsor</button>
                </form>
            </div>
        </div>
    )
}

export default SponsorGui