import React, { useContext, useEffect } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Toolbar from '../toolbar/Toolbar';
import PosterCard from '../cards/PosterCard';
import http from '../../plugins/http';
import mainContext from '../../context/mainContext';

function UserMovies() {
  const { user, favorites, setFavorites } = useContext(mainContext);
  const nav = useNavigate();

  useEffect(() => {
    async function getFavoriteMovies() {
      const data = await http.post('/get-all-favorites', { user });
      if (data.success) {
        setFavorites(data.movies);
      }
    }
    getFavoriteMovies();
  }, []);

  return (
    <div className="container">
      <Toolbar />
      <div className="content d-flex flex-wrap justify-content-center align-items-center">
        <div className="">
          {favorites.length
            ? (
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {favorites.flatMap((x, i) => x.user === user
                  && <PosterCard key={x.imdbID} imdbID={x.imdbID} movie={x} />)}
              </div>
            )
            : (
              <div className="text-center">
                <div><FontAwesomeIcon icon={faBan} className="text-danger fs-1" /></div>
                <div className="py-3 fs-3">You have no planned to watch / liked movies</div>
                <div className="py-3">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => nav('/search')}
                  >
                    Start searching
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default UserMovies;
