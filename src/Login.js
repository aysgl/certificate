import React, { useState } from 'react'

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (username === process.env.REACT_APP_USERNAME && password === process.env.REACT_APP_PASSWORD) {
            setIsLoggedIn(true);
        } else {
            alert("Username or password is incorrect!");
        }
    };

    return (
        <div className='d-flex align-items-center justify-content-center vh-100 bg-light'>
            <div className='login bg-light p-4'>
                <h1 className='display-3 fw-light mb-3'>Login</h1>
                <input className='form-control mb-3' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className='form-control mb-3' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-primary' onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login