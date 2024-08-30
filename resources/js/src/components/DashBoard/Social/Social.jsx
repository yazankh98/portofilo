import React, { useState, useEffect } from 'react'
import './Social.css'
import { Link } from 'react-router-dom';
const Social = () => {
    const token = localStorage.getItem('token');
    const CreateSocialURL = '/api/social/store'
    const [socialName, setsocialName] = useState("")
    const [socialUrl, setsocialUrl] = useState("")

    const [Deletemessage, setDeletemessage] = useState(false);
    const [message, setmessage] = useState(false)
    const [status, setstatus] = useState(null)
    const [info, setinfo] = useState("")

    function createSocial() {
        axios.post(CreateSocialURL, {
            name: socialName,
            url: socialUrl,
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
            '/api/socials',
            {
            }
        ).then((response) => {

            (setinfo(response.data[1]),
                setstatus(response.data[1])

            )
        }).catch(erroe => console.log(erroe))

    }, [])
    const deleteUserInfo = async (id) => {
        await axios.delete(`/api/social/delete/${id}`,
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
            <h1 className='titlePage' >Social information</h1>
            <p className='infoUserDes' >Add New Social:</p>
            <h1>Social</h1>
            <input className='infoInput' type="text" onChange={e => setsocialName(e.target.value)} name="socialName" id="socialName" placeholder='Social Name' />
            <input className='infoInput' type="text" onChange={e => setsocialUrl(e.target.value)} name="socialUrl" id="socialUrl" placeholder='Social URL' />
            <button className='btn btn-primary' onClick={createSocial}>Create</button>
            <Link className="btn btn-secondary btnBack" to="/createinfo"> Back </Link>
            {message && <div className='alert-container'>
                <div className='alert-inner'>Added Successfully </div>
            </div>}
            <div className='hr'></div>
            <p className='infoUserDes' >The Skills:</p>
            {status === null ?
                <h1 className='m-auto' >No Data To Show</h1>
                :

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Social Name</th>
                            <th scope="col">URL</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info?.map((element, index) => {

                            return (

                                <tr key={index} >
                                    <td>{element.name}</td>
                                    <td>{element.url}</td>
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

export default Social