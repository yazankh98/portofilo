import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import Footer from '../Footer/Footer'
import Contact from '../Contact/Contact'
import NavBar from '../NavBar/NavBar'
const Home = () => {

    const [infoCertificate, setinfoCertificate] = useState("")
    const [infoEducation, setinfoEducation] = useState("")
    const [infoExperience, setinfoExperience] = useState("")
    const [infoSkill, setinfoSkill] = useState("")
    const [infoProject, setinfoProject] = useState("")


    useEffect(() => {
        axios.get(
            'http://127.0.0.1:8000/api/educations',
            {
            }
        ).then((response) => {
            (setinfoEducation(response.data[1])
            )
        }).catch(erroe => console.log(erroe))
    }, [])
    useEffect(() => {
        axios.get(
            'http://127.0.0.1:8000/api/certificates',
            {
            }
        ).then((response) => {
            (setinfoCertificate(response.data[1]))
        }).catch(erroe => console.log(erroe))

    }, [])
    useEffect(() => {
        axios.get(
            'http://127.0.0.1:8000/api/skills',
            {
            }
        ).then((response) => {
            (setinfoSkill(response.data[1])
            )
        }).catch(erroe => console.log(erroe))
    }, [])
    useEffect(() => {
        axios.get(
            'http://127.0.0.1:8000/api/experiences',
            {
            }
        ).then((response) => {
            (setinfoExperience(response.data[1])
            )
        }).catch(erroe => console.log(erroe))
    }, [])
    useEffect(() => {
        axios.get(
            'http://127.0.0.1:8000/api/projects', {})
            .then((response) => {
                (setinfoProject(response.data[1]))
            }).catch(erroe => console.log(erroe))
    }, [])

    return (
        <div className='home' >
            <NavBar />

            <div className="Hero">
                <div className='HeroTitle' >
                    <h1>Hi , <br /> <span>I'm Yazan</span></h1> <br />
                    <h1>Full Stack Developer | Crafting Innovative Solutions for Seamless User Experiences</h1>
                </div>
                <img className='Pic' src="/images/yazan.png" alt="" />
            </div>

            <section className='About' id='About' >
                <p className='AboutTitle' >
                    Hello! I'm Yazan Khairi Al-anam, a recent graduate eager to kickstart my journey as a full stack developer. Armed with a informatic engineering From Ittihad Private University, I have a strong foundation in both front-end and back-end development. I've gained proficiency in HTML, CSS, JavaScript, Library Like React , frameworks like , Bootstrap. And Know Well GIT/github. alongside backend technologies such as PHP And MySQL .
                    I delved into projects using Laravel to develop scalable web applications, honing my skills in database management, API integrations, and server-side logic. I am passionate about creating user-friendly interfaces and leveraging backend technologies to deliver robust solutions. I know how to design using Photoshop and Illustrator. I'm excited about the prospect of contributing my skills and learning from
                    experienced professionals in the field. Let's connect to explore how my dedication and skills can benefit your team..!!
                </p>
            </section>
            <section className='Education' id='Education' >
                <h2 className='titleEducation' >Education</h2>
                {infoEducation && infoEducation.map((element, index) => {
                    return (
                        <div key={index} >
                            <b>{element.duration}</b>
                            <h5>{element.name} / {element.university}</h5>

                        </div>
                    )
                })}
            </section>
            <section className='Certificate' id='Certificate' >
                <h2 className='titleCertificate' > Certificate</h2>
                {infoCertificate && infoCertificate.map((element, index) => {
                    return (
                        <div key={index}>
                            <p  >
                                <b>{element.name}  </b>
                                <span>  /  {element.institute}</span>
                                <i> - {element.duration}</i>
                            </p>
                            <hr />
                        </div>
                    )
                })}
            </section>
            <section className='Experience' id='Experiences' >
                <h2 className='titleExperiences' >Experiences</h2>
                {infoExperience && infoExperience.map((element, index) => {
                    return (
                        <div key={index}>
                            <p  >
                                <b>{element.name}  </b>
                                <span>  /  {element.company}</span>
                                <i> - {element.duration}</i>
                            </p>
                            <hr />
                        </div>
                    )
                })}
            </section>
            <section className='Skill' id='Skill'  >
                <h2 className='titleSkil' >Skills</h2>
                <div className='SkillContainer' >
                    {infoSkill && infoSkill.map((element, index) => {
                        return (
                            <b className='SkillName' key={index} >{element.name}</b>
                        )
                    })}
                </div>
            </section>
            <h2 className='titleProject' >Projects</h2>
            <section className='Project' id='Projects' >

                {infoProject && infoProject.map((element, index) => {
                    return (
                        <div key={index} >
                            <div className="card ProjectContainer ">
                                <img src={`/storage/${element.image}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{element.name}</h5>
                                    <p className="card-text">{element.about}</p>
                                    <a className="btn btn-primary" href={`${element.url}`} target="_blank">Visit</a>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </section>
            <section className='Social' id='Contact' >
                <Contact />
            </section>
            <Footer />
        </div>
    )
}

export default Home