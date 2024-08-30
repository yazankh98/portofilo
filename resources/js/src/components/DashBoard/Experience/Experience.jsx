import React, { useState, useEffect } from 'react'
import './Experience.css'
import { Link } from 'react-router-dom';
const Experience = () => {
    const token = localStorage.getItem('token');
    const CreateExperienceURL = '/api/experience/store'
    const [experienceName, setexperienceName] = useState("")
    const [company, setcompany] = useState("")
    const [experienceDuration, setexperienceDuration] = useState("")

    const [message, setmessage] = useState(false);
    const [Deletemessage, setDeletemessage] = useState(false);
    const [status, setstatus] = useState(null)
    const [info, setinfo] = useState("")

    function createExperience() {
        axios.post(CreateExperienceURL, {
            name: experienceName,
            company: company,
            duration: experienceDuration,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                (console.log(response.data), setmessage(true)
                )
            }).catch(erroe => { window.alert("Error ,  Check The Input"), window.location.reload() }
            )
        setTimeout(() => {
            setmessage(false);
            window.location.reload()
        }, 1000);
    }
    useEffect(() => {
        axios.get(
            '/api/experiences',
            {
            }
        ).then((response) => {

            (setinfo(response.data[1]),
                setstatus(response.data[1]),
                console.log(response.data)


            )
        }).catch(erroe => console.log(erroe))

    }, [])
    const deleteUserInfo = async (id) => {
        await axios.delete(`/api/experience/delete/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((response) => {
                (console.log(response.data)), setDeletemessage(true)


            }).catch(erroe => console.log(erroe))
        setTimeout(() => {
            setDeletemessage(false);
            window.location.reload()
        }, 1000);
    }
    return (
        <div className='containerInfo' >
            <h1 className='titlePage' >Experience information</h1>
            <p className='infoUserDes' >Add New Experience:</p>
            <input className='infoInput' type="text" onChange={e => setexperienceName(e.target.value)} name="experienceName" id="experienceName" placeholder='position Name' />
            <input className='infoInput' type="text" onChange={e => setcompany(e.target.value)} name="company" id="company" placeholder='company name' />
            <input className='infoInput' type="text" onChange={e => setexperienceDuration(e.target.value)} name="experienceDuration" id="experienceDuration" placeholder='experience Duration' />
            <button className='btn btn-primary' onClick={createExperience}>Create</button>
            <Link className="btn btn-secondary btnBack" to="/createinfo"> Back </Link>
            {message &&
                <div className='alert-container'>
                    <div className='alert-inner'>Added Successfully </div>
                </div>}
            <div className='hr'></div>
            <p className='infoUserDes' >The Experiences:</p>
            {status == null ?
                <h1 className='m-auto' >No Data To Show</h1>
                :

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Position</th>
                            <th scope="col">company</th>
                            <th scope="col">Duration</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info && info.map((element, index) => {

                            return (

                                <tr key={index} >
                                    <td>{element.name}</td>
                                    <td>{element.company}</td>
                                    <td>{element.duration}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteUserInfo(element.id)} >Delete</button>
                                    </td>
                                </tr>

                            )

                        })}
                    </tbody>
                </table>

            }

            {Deletemessage &&
                <div className='alert-container'>
                    <div className='alert-inner'>Deleted Successfully </div>
                </div>}
        </div>
    )
}

export default Experience