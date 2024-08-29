import React from 'react'
import './CreateInfo.css'
import { Link } from 'react-router-dom'
const CreateInfo = () => {
    return (
        <div className='createInfoContainer' >

            <Link to="/infouser"> Create Genral Info  </Link> <br />
            <Link to="/certificate"> Create Certificate  </Link> <br />
            <Link to="/education"> Create Education  </Link> <br />
            <Link to="/experience"> Create Experience  </Link> <br />
            <Link to="/project"> Create Project  </Link> <br />
            <Link to="/skill"> Create Skill  </Link> <br />
            <Link to="/social"> Create Social  </Link> <br />
            <Link to="/"> Home </Link> <br />
            

        </div>
    )
}

export default CreateInfo