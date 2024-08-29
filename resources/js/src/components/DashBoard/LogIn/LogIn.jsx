import React, { useState, useEffect } from 'react'
import './LogIn.css'
import LogOut from '../LogOut/LogOut'
import { Link } from 'react-router-dom'



const LogIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/login', { email, password })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                window.location.reload()
            });
    };
    const [Token, setToken] = useState('');
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <div>
            <form action="" method='post' onSubmit={handleSubmit}>
                <input className='infoInput' type="email" onChange={e => setEmail(e.target.value)} autoComplete="username" name="email" id="email" placeholder='email' />
                <input className='infoInput' type="password" onChange={e => setPassword(e.target.value)} autoComplete="current-password" name="password" id="password" placeholder='password' />
                <input className='btn btn-primary' type="submit" name="submitLogin" id="submitLogin" value="Log In" />
                <Link className="btn btn-secondary btnBack" to="/"> Back </Link>
            </form>
        </div>
    )
}

export default LogIn