import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Project.css'
const Project = () => {
    const token = localStorage.getItem('token');
    const CreateProjectURL = '/api/project/store'
    const [projectName, setprojectName] = useState("")
    const [projectAbout, setprojectAbout] = useState("")
    const [projectUrl, setprojectUrl] = useState("")
    const [projectImage, setprojectImage] = useState(null)

    const [message, setmessage] = useState(false);
    const [Deletemessage, setDeletemessage] = useState(false);
    const [status, setstatus] = useState(null)
    const [info, setinfo] = useState("")
    const handleFileSelect = (event) => {
        setprojectImage(event.target.files[0])
    }
    function createProject() {
        axios.post(CreateProjectURL, {
            name: projectName,
            about: projectAbout,
            url: projectUrl,
            image: projectImage
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
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
            '/api/projects',
            {
            }
        ).then((response) => {

            (setinfo(response.data[1]),
                setstatus(response.data[1])


            )
        }).catch(erroe => console.log(erroe))

    }, [])
    const deleteUserInfo = async (id) => {
        await axios.delete(`/api/project/delete/${id}`,
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
        <div  >
            <h1 className='titlePage' >Project information</h1>
            <p className='infoUserDes' >Add New Project:</p>
            <input className='infoInput' type="text" onChange={e => setprojectName(e.target.value)} name="projectName" id="projectName" placeholder='project Name' />
            <input className='infoInput' type="text" onChange={e => setprojectAbout(e.target.value)} name="projectAbout" id="projectAbout" placeholder='About Project' />
            <input className='infoInput' type="text" onChange={e => setprojectUrl(e.target.value)} name="projectUrl" id="projectUrl" placeholder='Project URL' />
            <input className='infoInput' type="file" name="projectImage" onChange={handleFileSelect} id="projectImage" />
            <button className='btn btn-primary' onClick={createProject}>Create</button>
            <Link className="btn btn-secondary btnBack" to="/createinfo"> Back </Link>
            {message && <div className='alert-container'>
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
                            <th scope="col">Project Name</th>
                            <th scope="col">about</th>
                            <th scope="col">url</th>
                            <th scope="col">image</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info?.map((element, index) => {

                            return (

                                <tr key={index} >
                                    <td>{element.name}</td>
                                    <td>{element.about}</td>
                                    <td className='url' >{element.url}</td>
                                    <td>  <img className='imageProject' src={`/storage/${element.image}`} alt="" /> </td>
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

export default Project