import React, { useState ,useEffect } from 'react'
import './Skill.css'
import { Link } from 'react-router-dom';
const Skill = () => {
    const token = localStorage.getItem('token');
    const CreateSkillURL = '/api/skill/store'
    const [SkillName, setSkillName] = useState("")
    const [message, setmessage] = useState(false);

    const [Deletemessage, setDeletemessage] = useState(false);
    const [status, setstatus] = useState(null)
    const [info, setinfo] = useState("")

    function createSkill() {
        axios.post(CreateSkillURL, {
            name: SkillName,
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
            '/api/skills',
            {
            }
        ).then((response) => {

            (setinfo(response.data[1]),
                setstatus(response.data[1])

            )
        }).catch(erroe => console.log(erroe))

    }, [])
    const deleteUserInfo = async (id) => {
        await axios.delete(`/api/skill/delete/${id}`,
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
            <h1 className='titlePage' >Skill information</h1>
            <p className='infoUserDes' >Add New Skill:</p>
            <h1>Skill</h1>
            <input className='infoInput' type="text" onChange={e => setSkillName(e.target.value)} name="SkillName" id="SkillName" placeholder='Sill Name' />
            <button className='btn btn-primary' onClick={createSkill}>Create</button>
            <Link className="btn btn-secondary btnBack" to="/createinfo"> Back </Link>
            {message &&
                <div className='alert-container'>
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
                            <th scope="col">Skill Name</th>
                            <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info?.map((element, index) => {

                            return (

                                <tr key={index} >
                                    <td>{element.name}</td>
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

export default Skill