import React, { createContext, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ReactDom from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import InfoUser from "./components/DashBoard/InfoUser/InfoUser";
import Certificate from "./components/DashBoard/Certificate/Certificate";
import Education from "./components/DashBoard/Education/Education";
import Experience from "./components/DashBoard/Experience/Experience";
import Project from "./components/DashBoard/Project/Project";
import Skill from "./components/DashBoard/Skill/Skill";
import Social from "./components/DashBoard/Social/Social";
import CreateInfo from "./components/DashBoard/CreateInfo/CreateInfo";
import Home from "./components/DashBoard/Home/Home";
import './main.css'
import LogIn from "./components/DashBoard/LogIn/LogIn";


export const ThemeContext = createContext('light')

function getInitialTheme() {
    const theme = localStorage.getItem('theme')
    return theme ? JSON.parse(theme) : 'light'
}
const Main = () => {
    const [theme, setTheme] = useState(getInitialTheme)

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme))
    }, [theme])

    return (

        <>

            <ThemeContext.Provider value={[theme, setTheme]} >
                <div className={`${theme} theme`}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/infouser" element={<InfoUser />} />
                        <Route path="/certificate" element={<Certificate />} />
                        <Route path="/education" element={<Education />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/project" element={<Project />} />
                        <Route path="/skill" element={<Skill />} />
                        <Route path="/social" element={<Social />} />
                        <Route path="/createinfo" element={<CreateInfo />} />
                        <Route path="/login" element={<LogIn />} />
                    </Routes>
                </div>
                
            </ThemeContext.Provider>
        </ >
    );
};


export default Main;

const container = document.getElementById("main");
const root = ReactDom.createRoot(container);
root.render(<BrowserRouter><Main /></BrowserRouter>);
