import React, { useEffect, useState } from 'react'
import './Education.css'
import { Link } from 'react-router-dom';
const Education = () => {
    const token = localStorage.getItem('token');
    const CreateEducationURL = '/api/education/store'
    const [educationName, seteducationName] = useState("")
    const [university, setuniversity] = useState("")
    const [educationDuration, seteducationDuration] = useState("")

    const [message, setmessage] = useState(false);
    const [Deletemessage, setDeletemessage] = useState(false);
    const [status, setstatus] = useState(null)
    const [info, setinfo] = useState("")

    function createEducation() {
        axios.post(CreateEducationURL, {
            name: educationName,
            university: university,
            duration: educationDuration,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                (console.log(response.data), setmessage(true)
                )
            }).catch(erroe => { window.alert("Error ,  check the Input"), window.location.reload() }
            )
        setTimeout(() => {
            setmessage(false);
            window.location.reload()
        }, 1000);
    }
    useEffect(() => {
        axios.get(
            '/api/educations',
            {
            }
        ).then((response) => {

            (setinfo(response.data[1]),
                setstatus(response.data[1])

            )
        }).catch(erroe => console.log(erroe))

    }, [])
    const deleteUserInfo = async (id) => {
        await axios.delete(`/api/education/delete/${id}`,
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
            <h1 className='titlePage' >Education information</h1>
            <p className='infoUserDes' >Add New Education:</p>
            <input className='infoInput' type="text" onChange={e => seteducationName(e.target.value)} name="educationName" id="educationName" placeholder='education Name' />
            <input className='infoInput' type="text" onChange={e => setuniversity(e.target.value)} name="university" id="university" placeholder='university name' />
            <input className='infoInput' type="text" onChange={e => seteducationDuration(e.target.value)} name="educationDuration" id="educationDuration" placeholder='education Duration' />
            <button className='btn btn-primary' onClick={createEducation}>Create</button>
            <Link className="btn btn-secondary btnBack" to="/createinfo"> Back </Link>
            {message &&
                <div className='alert-container'>
                    <div className='alert-inner'>Added Successfully </div>
                </div>}
            <div className='hr'></div>
            <p className='infoUserDes' >The Educations:</p>
            {status === null ?
                <h1 className='m-auto' >No Data To Show</h1>
                :

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Certificate</th>
                            <th scope="col">University</th>
                            <th scope="col">Duration</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info && info.map((element, index) => {

                            return (

                                <tr key={index} >
                                    <td>{element.name}</td>
                                    <td>{element.university}</td>
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

export default Education