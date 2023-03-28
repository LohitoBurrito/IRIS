import React from 'react'
import { useState, useRef } from 'react'
import { BiHomeAlt } from 'react-icons/bi';
import { HiArrowSmRight, HiArrowSmLeft } from 'react-icons/hi'
import { FiMapPin } from 'react-icons/fi'
import { MdOutlineHandshake, MdOutlineEmail, MdBusinessCenter } from 'react-icons/md'
import { BsCalendarEvent, BsPeopleFill } from 'react-icons/bs'
import { RiRocket2Line } from 'react-icons/ri'
import './sidebar.css'

const sideBar1Dark = {
  height : '100vh',
  width : '17.5vw',
  backgroundColor : '#222624'
}
const sideBar2Dark = {
  height : '100vh',
  width : '7.75vw',
  backgroundColor : '#222624'
}
const sideBar3Dark = {
  width : '82.5vw',
  backgroundColor : '#161818',
  marginLeft: '17.5vw'
}
const sideBar4Dark = {
  width : '92.25vw',
  backgroundColor : '#161818',
  marginLeft: '7.75vw'
}

function Sidebar(props) {
  const [Page, setPage] = useState('Home');
  const [sideBarOpen, setSidebarOpen] = useState(sideBar1Dark);

  let arrow = useRef(<HiArrowSmLeft/>);
  let title = useRef('IRIS');
  let Home = useRef('Home');
  let Members = useRef('Members');
  let Outreach = useRef('Outreach');
  let Calendar = useRef('Calendar');
  let contact = useRef('Contact');
  let logOut = useRef('Log Out');
  let Join = useRef('Join');
  let Sponsor = useRef('Sponsor');

  let sidebarSetting = useRef(sideBar1Dark);

  function changePage(param) { 
    setPage(param); 
  }

  const changeSideBar = () => {
    if (sideBarOpen === sideBar1Dark) {
        arrow.current = <HiArrowSmRight/>;
        title.current = <RiRocket2Line/>
        Home.current = '';
        Members.current = '';
        Outreach.current = '';
        Calendar.current = '';
        contact.current = '';
        logOut.current = '';
        Join.current = '';
        Sponsor.current = '';
        setSidebarOpen(sideBar2Dark);
        props.changeStyle(sideBar4Dark);
    } else {
        arrow.current = <HiArrowSmLeft/>;
        title.current = 'IRIS'
        Home.current = 'Home';
        Members.current = 'Members';
        Outreach.current = 'Outreach';
        Calendar.current = 'Calendar';
        contact.current = 'Contact';
        logOut.current = 'Log Out';
        Join.current = 'Join';
        Sponsor.current = 'Sponsor';
        setSidebarOpen(sideBar1Dark);
        props.changeStyle(sideBar3Dark);
    }
  }
  

  return (
    <div className='Sidebar' style={ sideBarOpen }>
        <div className='logo'>
            <h1>{ title.current }</h1>
        </div>
        <div className='space'>

        </div>
        <div className='options'>
            <a href='#homeGui'><button className='Home' onClick={()=>{ changePage('Home'); }}><BiHomeAlt className='icon'/>{ Home.current }</button></a>
            <a href='#membersGui'><button className='Members' onClick={()=>{ changePage('Members') }}><BsPeopleFill className='icon'/>{ Members.current }</button></a>
            <a href='#outreachGui'><button className='Outreach' onClick={()=>{ changePage('Outreach') }}><FiMapPin className='icon'/>{ Outreach.current }</button></a>
            <a href='#calendarGui'><button className='Calendar' onClick={()=>{ changePage('Calendar') }}><BsCalendarEvent className='icon'/>{ Calendar.current }</button></a>
            <a href='#sponsorGui'><button className='Sponsors' onClick={()=>{ changePage('Sponsors') }}><MdBusinessCenter className='icon'/>{ Sponsor.current }</button></a>
            <a href='#contactGui'><button className='Contact' onClick={() => { changePage('Contact') }}><MdOutlineEmail className='icon'/>{ contact.current }</button></a>
            <a href='#joinGui'><button className='Join' onClick={() => { changePage('Join') }}><MdOutlineHandshake className='icon'/>{ Join.current }</button></a>
        </div>
        <div className='button'>
            <button className='SidebarShifter' onClick={ changeSideBar }>{ arrow.current }</button>
        </div>
    </div>
  )
}

export default Sidebar

/*
Notes: 
https://www.youtube.com/watch?v= + 'video id' gets the youtube video,
we can try linking it
*/