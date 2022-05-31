import React, {useContext} from 'react';
import Recommendation from '../components/recommendation/Recommendation'
import mainContext from "../context/mainContext";
import {useNavigate} from "react-router-dom";

const RecommendationPage = () => {

    const {user} = useContext(mainContext)
    const nav = useNavigate()

    return (
        <div>
            {user ?
                <Recommendation/>
                :
                <div className='content d-flex flex-column justify-content-center align-items-center fs-3'>
                    <div>This content is private</div>
                    <div>Login or register to access it</div>
                    <button className='btn btn-outline-danger my-3 fs-4' onClick={() => nav('/')}>Gain access</button>
                </div>
            }
        </div>
    );
};

export default RecommendationPage;