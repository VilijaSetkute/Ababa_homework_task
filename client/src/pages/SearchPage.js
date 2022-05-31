import React, {useContext} from 'react';
import Search from "../components/search/Search";
import mainContext from "../context/mainContext";
import {useNavigate} from "react-router-dom";

const SearchPage = () => {

    const {user} = useContext(mainContext)
    const nav = useNavigate()

    return (
        <div>
            {user ?
                <Search/>
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

export default SearchPage;