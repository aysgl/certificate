import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault()
        if (username === process.env.REACT_APP_USERNAME && password === process.env.REACT_APP_PASSWORD) {
            setIsLoggedIn(true);
            navigate('/');
        } else {
            alert("Username or password is incorrect!");
        }
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <form onSubmit={handleLogin} className='d-flex align-items-center justify-content-center vh-100 bg-light'>
            <div className='login bg-light p-4'>
                <h1 className='display-3 fw-light mb-3'>Login</h1>
                <input className='form-control mb-3' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className='form-control mb-3' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-primary'>Login</button>
                </div>
            </div>
        </form>
    );
};

export default Login;
