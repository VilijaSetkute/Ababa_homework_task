import React, {useEffect, useState} from 'react';
import './styles.css'
import Toolbar from "../toolbar/Toolbar";
import PosterCard from "../cards/PosterCard";
import http from "../../plugins/http";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";

const Search = () => {

    const [searchResults, setSearchResult] = useState([])
    const [searchMessage, setSearchMessage] = useState('')
    const [seenJoke, setSeenJoke] = useState(false)

    useEffect(() => {
        const jokeState = localStorage.getItem('seenJoke')
        if (!jokeState) {
            const timeoutRef = setTimeout(() => {
                localStorage.setItem('seenJoke', true);
                setSeenJoke(true)
                clearTimeout(timeoutRef);
            }, 10000);
        } else {
            setSeenJoke(true)
        }
    }, [])

    async function getMovieRequest(event) {
        if (event.key === 'Enter') {
            if (event.target.value.length > 2) {
                const searchInfo = {
                    database: 'movies',
                    searchText: event.target.value
                }
                const data = await http.post('/movie-search', searchInfo)
                if (data.success) {
                    setSearchResult(data.movies)
                }
                setSearchMessage(data.message)
            }
            else {
                setSearchMessage('Minimum 3 symbols needed for search')
            }
        }
    }

    return (
        <div className='container'>
            <Toolbar/>
            <div className='w-100 py-3 mx-auto d-flex justify-content-center text-center align-items-center'>
                <input
                    className='form-control'
                    type="text" placeholder='type to search and click enter ...'
                    onKeyPress={(event) => getMovieRequest(event)}
                />
            </div>
            <div className='content-search d-flex flex-column align-items-center'>
                {!seenJoke && <div className='font-hand fs-3 fst-italic mt-5 mb-3 text-center'>
                    I regret to inform you that this is no horror movies' page. <br/>
                    I just like black and red combination
                    <img className='ms-2' style={{height: '25px'}} src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/rolling-on-the-floor-laughing_1f923.png" alt=""/>
                </div>}
                {searchMessage.includes('We couldn') && <div><FontAwesomeIcon icon={faBan} className='text-danger fs-1'/></div>}
                <div className='my-2 text-white text-center fs-4'>{searchMessage}</div>
                {searchResults.length > 0 ?
                    <div className='d-flex flex-wrap justify-content-center align-items-center'>
                        {searchResults.map((x, i) => <PosterCard key={x.imdbID} imdbID={x.imdbID} movie={x}/>)}
                    </div>
                    :
                    <div className='text-white fs-4'>
                        Start searching by typing
                    </div>
                }
            </div>
        </div>
    );
};

export default Search;