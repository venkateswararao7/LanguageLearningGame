import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import '../styles/Login.css';
import { setGlobalState } from './Globalvariable';
import { store } from '../App';

function Login() {
    const initialUser = {
        email: '',
        password: '',
        score: 0,
    };

    const [logEamil, setLogEmail] = useContext(store);
    const [user, setUser] = useState(initialUser);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setPasswordError(false); // Reset password error when the user types
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/create', user);
            if (response.data.msg === 'right') {
                setGlobalState('email', response.data.email);
                setGlobalState('score', response.data.score);
                setLogEmail(user.email);
                navigate('/home');
            } else {
                // Set password error if login is not successful
                setPasswordError(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="Login-page">
            <div className="Login">
                <div className="login-heading">
                    <h2>Welcome To The Language Learning Game</h2>
                </div>
                <div>
                    <div className="log-sym">
                        <LoginIcon />
                    </div>
                    <div className="log-details">
                        <form onSubmit={handleSubmit} method="post">
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Enter Email"
                            />
                            <br />
                            <input
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Password"
                                style={{ borderColor: passwordError ? 'red' : '' }}
                            />
                            <br />

                            <button className="log-button" type="submit">
                                Log In
                            </button>
                            {passwordError ? <h2 style={{ color: 'red' }}>incorrect password</h2> : ""}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
