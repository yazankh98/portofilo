import React, { useEffect, useState, useContext } from 'react'
import './NavBar.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LogOut from '../LogOut/LogOut'

import { ThemeContext } from './../../../main'
const isadmin = 'api/isadmin'
const token = localStorage.getItem('token');
const NavBar = () => {
    const [isAdmin, setisAdmin] = useState();
    const [showMenu, setshowMenu] = useState(true)
    const [theme, setTheme] = useContext(ThemeContext)
    useEffect(() => {
        axios.get(
            isadmin,

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((response) => {
            (setisAdmin(response.data)

            )
        }).catch(erroe => console.log(erroe))
    }, []);
    return (
        <div>
            <nav style={{ backgroundColor: (theme === 'dark') ? 'rgb(39 97 98)' : 'rgb(192 228 229)' }} className="navbar nav navbar-expand-lg ">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <h4 className='webName' style={{ color: (theme === 'light') ? 'black' : 'white' }} >Yazan's Portofilo</h4>
                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li>
                                <a className='btn btn-secondary btnBack wer' href="#Education">Education</a>
                            </li>
                            <li>
                                <a className='btn btn-secondary  btnBack wer' href="#Certificate">Certificate</a>
                            </li>
                            <li>
                                <a className='btn btn-secondary btnBack wer' href="#Experiences">Experiences</a>
                            </li>
                            <li >
                                <a className='btn btn-secondary  btnBack wer' href="#Skill">Skill</a>
                            </li>
                            <li>
                                <a className='btn btn-secondary btnBack wer' href="#Projects">Projects</a>
                            </li>
                            <li>
                                <a className='btn btn-secondary btnBack wer' href="#Contact">Contact</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li >
                                <Link className="btn btn-secondary btnBack" to="/login"> Are You Admin? </Link>
                            </li>
                            <li>
                                {isAdmin && <Link className="btn btn-info btnBack" to="/createinfo"> Create Info  </Link>}
                            </li>
                            <li>
                                {isAdmin && <LogOut />}
                            </li>
                        </ul>
                    </div>
                </div>
                <div onClick={() => {
                    {
                        setTheme(theme === 'dark' ? 'light' : 'dark')
                    }
                }} className="darkMood">
                    {theme === 'dark' ?
                        <img src="/images/DarkMood.png" alt="" />
                        :
                        <img src="/images/LightMood.png" alt="" />
                    }
                </div>
            </nav>



            {/* navbar for mobile screen */}
            <nav style={{ backgroundColor: (theme === 'dark') ? 'rgb(39 97 98)' : 'rgb(192 228 229)' }} className='navMobile' >
                <div className="navMobilecontainer">
                    <div className="logoMobile">
                        <a className="navbar-brand" href="#">Yazan's Portofilo</a>
                    </div>
                    <div className="menuMobile">
                        <img onClick={() => { setshowMenu(!showMenu) }} src="/images/Menu.png" alt="" />
                    </div>
                </div>
                <div style={{ display: (showMenu) ? "none" : "block" }} className="pagesMobile">
                    <img onClick={() => { setshowMenu(!showMenu) }} className='pageMobileExit' src="/images/exit.png" alt="" />
                    <ul>
                        <li>
                            <a className='btn btn-secondary btnBack wer' href="#Education">Education</a>
                        </li>
                        <li className='Certificate' >
                            <a className='btn btn-secondary btnBack wer' href="#Certificate">Certificate</a>
                        </li>
                        <li>
                            <a className='btn btn-secondary btnBack wer' href="#Experiences">Experiences</a>
                        </li>
                        <li className='Skill'>
                            <a className='btn btn-secondary btnBack wer' href="#Skill">Skill</a>
                        </li>
                        <li>
                            <a className='btn btn-secondary btnBack wer' href="#Projects">Projects</a>
                        </li>

                    </ul>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li>
                            <Link className="btn btn-secondary btnBack" to="/login"> Are You Admin? </Link>
                        </li>
                        <li className='createinfo' >
                            {isAdmin && <Link className="btn btn-info btnBack" to="/createinfo"> Create Info  </Link>}
                        </li>
                        <li>
                            {isAdmin && <LogOut />}
                        </li>
                    </ul>
                    <div className="navMobileLine"></div> <br />

                    <div className="togle" >
                        <p style={{ color: 'black' }}  >Dark Mood</p>
                        <label class="ui-switch"  >
                            <input type="checkbox" />
                            <div class="slider" onClick={() => {
                                setTheme(theme === 'dark' ? 'light' : 'dark')
                            }}>
                                <div class="circle"></div>
                            </div>
                        </label>
                    </div>
                    <br />

                </div>
            </nav>
        </div>
    )
}

export default NavBar