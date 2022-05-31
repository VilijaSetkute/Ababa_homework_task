import React, {useEffect, useState} from 'react';
import './styles.css'
import Toolbar from "../toolbar/Toolbar";
import PosterCard from "../cards/PosterCard";
import http from "../../plugins/http";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const Recommendation = () => {

    const [recommendedList, setRecommendedList] = useState([])
    const [spinner, setSpinner] = useState(true)

    useEffect(() => {
        async function getRecommendedList() {
            const data = await http.get('/recommended-movies')
            if (data.success) {
                setRecommendedList(data.movies)
                setSpinner(false)
            }
        }
        getRecommendedList()
    }, [])

    return (
        <div className='container'>
            <Toolbar/>
            <div className='content d-flex flex-wrap justify-content-center align-items-center'>
                {spinner ?
                    <div><FontAwesomeIcon icon={faSpinner} className='fs-1 text-danger spinner'/></div>
                    :
                    <div className='d-flex flex-wrap justify-content-center'>
                        {recommendedList.map((x, i) => <PosterCard key={x.imdbID} imdbID={x.imdbID} movie={x}/>)}
                    </div>
                }
            </div>
        </div>
    );
};

export default Recommendation;