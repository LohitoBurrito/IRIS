import React from 'react'
import { useState, useEffect } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { RiArrowRightCircleLine } from 'react-icons/ri'
import { HiMenu } from 'react-icons/hi'
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
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [minimizeNav, setMinimizeNav] = useState(window.innerWidth < 1015 ? true : false);
    const [openNavbar, setOpenNavbar] = useState("menubarClose"); 
    const [menuFixed, setMenuFixed] = useState("menu");
    const [navbar, setNavbar] = useState("navbar2");

    useEffect(() => {
        function handleResize() {
          console.log(window.innerWidth)
          setScreenWidth(window.innerWidth);
          if (window.innerWidth < 1015) {
            console.log("minimize nav")
            setMinimizeNav(true)
          } else {
            console.log("dont minimize nav")
            setMinimizeNav(false)
          }
        }
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    if (!minimizeNav) {
        return (
            <div className="navbar">
                <Link className="left" to="/main"></Link>
                <div className='right'>
                    <Link className="navlink" to="/main">HOME</Link>
                    <Link className="navlink" to="/main#about">ABOUT</Link>
                    <Link className="navlink" to="/members">MEMBERS</Link>
                    <Link className="navlink" to="/outreach">OUTREACH</Link>
                    <Link className="navlink" to="/calendar">CALENDAR</Link>
                    <Link className="navlink" to="/contact">CONTACT</Link>
                    <Link className="navlink" to="/sponsor">SPONSORS</Link>   
                    <Link className="navlink" id="fill" to="/join">JOIN <RiArrowRightCircleLine style={ arrow }/></Link> 
                </div>                             
            </div>
        )
    } else {
        return (
            <>
                <div className={navbar}>
                    <Link className="left" to="/main"></Link>
                    <HiMenu className={menuFixed} onClick={() => {
                        console.log("hey")
                        if (openNavbar === "menubarOpen") {
                            setOpenNavbar("menubarClose")
                            setMenuFixed("menu")
                            setNavbar("navbar2")
                        } else {
                            setOpenNavbar("menubarOpen")
                            setMenuFixed("menuFixed")
                            setNavbar("navbar3")
                        }
                    }}/>
                </div>          
                <div className={openNavbar}>
                    <Link className="navlink" to="/main">HOME</Link>
                    <Link className="navlink" onClick={() => setOpenNavbar("menubarClose")} to="/main#about">ABOUT</Link>
                    <Link className="navlink" to="/members">MEMBERS</Link>
                    <Link className="navlink" to="/outreach">OUTREACH</Link>
                    <Link className="navlink" to="/calendar">CALENDAR</Link>
                    <Link className="navlink" to="/contact">CONTACT</Link>
                    <Link className="navlink" to="/sponsor">SPONSORS</Link>   
                    <Link className="navlink" to="/join">JOIN</Link> 
                </div>
            </>
        )
    }
}

export default Navbar