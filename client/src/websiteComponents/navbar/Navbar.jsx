import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { RiArrowRightCircleLine } from 'react-icons/ri'
import './navbar.css'

const arrow = {
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "900",
    color: "white",
    fontFamily: "'Josefin Sans', sans-serif",
    transform: "translateY(3px)"
}

function Navbar(props) {
    return (
        <div className='navbar'>
            <div className='left'>
                <Link className="logo" to="/main">IRIS</Link>
            </div>
            <div className='right'>
                <Link className="navlink" to="/main">HOME</Link>
                <Link className="navlink" to="/main#about">ABOUT</Link>
                <Link className="navlink" to="/members">MEMBERS</Link>
                <Link className="navlink" to="/outreach">OUTREACH</Link>
                <Link className="navlink" to="/calendar">CALENDAR</Link>
                <Link className="navlink" to="/contact">CONTACT</Link>
                <Link className="navlink" to="/sponsor">SPONSORS</Link>   
                <Link className='navlink' to="/gui">GUI</Link>
                <Link className="navlink" id="fill" to="/join">JOIN <RiArrowRightCircleLine style={ arrow }/></Link> 
            </div>                             
        </div>
    )
}

export default Navbar