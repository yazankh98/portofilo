import React from 'react'
import './LogOut.css'
import axios from 'axios'
const LogOut = () => {
    const LogOutUrl = 'api/logout'
    const token = localStorage.getItem('token');
    function LogOut() {
        axios.post(
            LogOutUrl, {},

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((response) => {
            (console.log(response.data), window.location.reload()
            )
        }).catch(erroe => console.log(erroe))
    }
    return (
        < div >
            <button className="btn btn-danger btnBack" onClick={LogOut} type="button">LogOut</button>
        </ div>
    )
}

export default LogOut