import './styles.css'
import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import startPicture from '../../assets/580b585b2edbce24c47b294a.png'
import AuthCard from "../auth/AuthCard";
import mainContext from "../../context/mainContext";

const Start = () => {

    const {authStatus, setAuthStatus, authOption, setAuthOption} = useContext(mainContext)

    function auth(option) {
        if (authStatus) {
            setAuthOption(option)
            if (option === authOption) {
                setAuthStatus(false)
            }
        } else {
            setAuthOption(option)
            setAuthStatus(true)
        }
    }

    return (
        <div className='start d-flex flex-column justify-content-center align-items-center'>
            {authStatus && <AuthCard/>}
            <div className='fs-2 font-hand text-danger text-center'>
                ...so you think you got some nerves?
            </div>
            <div>
                <img src={startPicture} alt="blood dripping"/>
            </div>
            <div>
                <button className='btn btn-outline-danger mx-1' onClick={() => auth('login')}>Login</button>
                <button className='btn btn-outline-danger mx-1' onClick={() => auth('register')}>Register</button>
            </div>
        </div>
    );
};

export default Start;