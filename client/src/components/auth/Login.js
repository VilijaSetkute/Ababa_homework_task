import React, {useRef, useState, useContext} from 'react';
import http from "../../plugins/http";
import {useNavigate} from "react-router-dom";
import mainContext from "../../context/mainContext";

const Login = ({setAuthMessage}) => {

    const {setUser} = useContext(mainContext)
    const nav = useNavigate()
    const logEmail = useRef()
    const logPass = useRef()
    const stayLogged = useRef()

    async function handleLogin() {
        const loginInfo = {
            email: logEmail.current.value,
            pass: logPass.current.value,
            stayLoggedIn: stayLogged.current.checked
        }
        const data = await http.post('/login', loginInfo)
        if (data.success) {
            setUser(data.user)
            nav('/search')
            localStorage.setItem("stayLoggedIn", "true")
        } else {
            setAuthMessage(data.message)
        }
    }

    return (
        <div className='d-flex flex-column'>
            <input ref={logEmail} type="text" className='p-2 my-1 rounded-pill border-0 text-center' placeholder='enter your email'/>
            <input ref={logPass} type="text" className='p-2 my-1 rounded-pill border-0 text-center' placeholder='enter your password'/>
            <div className='d-flex align-items-center justify-content-center my-2'>
                <input ref={stayLogged} id='stayLogged' type="checkbox" className='me-2' />
                <label htmlFor="stayLogged" className='text-white fs-5'>Stay logged in</label>
            </div>

            <div className='auth-btn cursor p-2 my-1 rounded-pill border-0 text-center' onClick={handleLogin}>Login</div>
        </div>
    );
};

export default Login;