import React, {useContext, useEffect, useState} from 'react';
import './styles.css'
import Toolbar from "../toolbar/Toolbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";
import PosterCard from "../cards/PosterCard";
import http from "../../plugins/http";
import mainContext from "../../context/mainContext";
import {useNavigate} from "react-router-dom";

const UserMovies = () => {

    const {favorites, setFavorites} = useContext(mainContext)
    const nav = useNavigate()

    useEffect(() => {
        async function getFavorites() {
            const data = await http.get('/get-all-favorites')
            if (data.success) {
                setFavorites(data.movies)
            }
        }
        getFavorites()
    }, [])

    return (
        <div className='container'>
            <Toolbar/>
            <div className='content d-flex flex-wrap justify-content-center align-items-center'>
                <div className=''>
                    {favorites.length ?
                        <div className='d-flex flex-wrap justify-content-center align-items-center'>
                            {favorites.map((x, i) => <PosterCard key={x.imdbID} imdbID={x.imdbID} movie={x}/>)}
                        </div>
                        :
                        <div className='text-center'>
                            <div><FontAwesomeIcon icon={faBan} className='text-danger fs-1'/></div>
                            <div className='py-3 fs-3'>You have no planned to watch / liked movies</div>
                            <div className='py-3'>
                                <button className='btn btn-outline-danger' onClick={() => nav('/search')}>Start searching</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserMovies;