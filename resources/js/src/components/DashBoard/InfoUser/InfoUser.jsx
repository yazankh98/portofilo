import React, { useEffect, useState } from 'react'
import './InfoUser.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
const InfoUser = () => {
    const token = localStorage.getItem('token');
    const CreateInfoURL = 'http://127.0.0.1:8000/api/admin/store'

    const [nameUser, setnameUser] = useState("")
    const [jobUser, setjobUser] = useState("")
    const [emailUser, setemailUser] = useState("")
    const [numberUser, setnumberUser] = useState("")
    const [message, setmessage] = useState(false);
    const [info, setinfo] = useState("")
    const [Deletemessage, setDeletemessage] = useState(false);
    const [status, setstatus] = useState(null)

    function CreateInfoUser() {
        axios.post(CreateInfoURL, {
            name: nameUser,
            job: jobUser,
            email: emailUser,
            number: numberUser,
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
            'http://127.0.0.1:8000/api/admins',
            {
            }
        ).then((response) => {

            (setinfo(response.data),
                setstatus(response.data[1])

            )
        }).catch(erroe => console.log(erroe))

    }, [])

    const deleteUserInfo = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/admin/delete/${id}`,
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

            {/* genral information */}
            <h1 className='titlePage' >genral information</h1>
            <p className='infoUserDes' >Add New User:</p>
            <input className='infoInput' type="text" onChange={e => setnameUser(e.target.value)} name="name" id="nameUser" placeholder='name user' />
            <input className='infoInput' type="text" onChange={e => setjobUser(e.target.value)} name="job" id="job" placeholder='job' />
            <input className='infoInput' type="email" onChange={e => setemailUser(e.target.value)} name="email" id="emailUser" placeholder='email' />
            <input className='infoInput' type="number" onChange={e => setnumberUser(e.target.value)} name="number" id="number" placeholder='number' />

            <button className='btn btn-primary' onClick={CreateInfoUser}>Create</button>
            <Link className="btn btn-secondary btnBack" to="/createinfo"> Back </Link>
            {message &&
                <div className='alert-container'>
                    <div className='alert-inner'>Added Successfully </div>
                </div>}
            <div className='hr'></div>

            <p className='infoUserDes' >The First User In DB:</p>

            {status === null ?
                <h1 className='m-auto' >No Data To Show</h1>
                :

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">name</th>
                            <th scope="col">job</th>
                            <th scope="col">email</th>
                            <th scope="col">number</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info?.map((element, index) => {

                            return (

                                <tr key={index} >
                                    <td>{element.name}</td>
                                    <td>{element.job}</td>
                                    <td>{element.email}</td>
                                    <td>{element.number}</td>
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

export default InfoUser