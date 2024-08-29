import React, { useEffect, useState } from 'react'
import './Certificate.css'
import { Link } from 'react-router-dom';
const Certificate = () => {
    const token = localStorage.getItem('token');
    const CreateCertificateURL = 'http://127.0.0.1:8000/api/certificate/store'
    const [certificateName, setcertificateName] = useState("")
    const [institute, setinstitute] = useState("")
    const [certificateDuration, setcertificateDuration] = useState("")
    const [message, setmessage] = useState(false);
    const [Deletemessage, setDeletemessage] = useState(false);
    const [status, setstatus] = useState(null)
    const [info, setinfo] = useState("")
    function createCertificate() {
        axios.post(CreateCertificateURL, {
            name: certificateName,
            institute: institute,
            duration: certificateDuration,
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
            'http://127.0.0.1:8000/api/certificates',
            {
            }
        ).then((response) => {

            (setinfo(response.data[1]),
                setstatus(response.data[1])

            )
        }).catch(erroe => console.log(erroe))

    }, [])

    const deleteUserInfo = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/api/certificate/delete/${id}`,
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
        <div>
            <h1 className='titlePage' >Certificate information</h1>
            <p className='infoUserDes' >Add New Certificate:</p>
            <input className='infoInput'  type="text" onChange={e => setcertificateName(e.target.value)} name="certificateName" id="certificateName" placeholder='certificate Name' />
            <input className='infoInput'  type="text" onChange={e => setinstitute(e.target.value)} name="number" id="number" placeholder='institute name' />
            <input className='infoInput'  type="text" onChange={e => setcertificateDuration(e.target.value)} name="certificateDuration" id="certificateDuration" placeholder='certificate Duration' />
            <button className='btn btn-primary' onClick={createCertificate}>Create</button>
            <Link className="btn btn-secondary btnBack" to="/createinfo"> Back </Link>
            {message &&
                <div className='alert-container'>
                    <div className='alert-inner'>Added Successfully </div>
                </div>}
            <div className='hr'></div>
            <p className='infoUserDes' >The Certificates:</p>
            {status === null ?
                <h1 className='m-auto' >No Data To Show</h1>
                :

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Certificate</th>
                            <th scope="col">Institute</th>
                            <th scope="col">Duration</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info?.map((element, index) => {

                            return (

                                <tr key={index} >
                                    <td>{element.name}</td>
                                    <td>{element.institute}</td>
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

export default Certificate