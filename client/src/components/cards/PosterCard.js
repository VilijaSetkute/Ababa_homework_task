import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import http from '../../plugins/http';
import mainContext from '../../context/mainContext';

function PosterCard({ movie }) {
  const { favorites, setFavorites } = useContext(mainContext);
  const [favoriteStatus, setFavoriteStatus] = useState(false);

  useEffect(() => {
    const findFavorite = favorites.find((el) => el.imdbID === movie.imdbID);
    if (findFavorite) {
      setFavoriteStatus(true);
    } else {
      setFavoriteStatus(false);
    }
  }, []);

  async function handleFavorites() {
    const movieInfo = {
      Title: movie.Title,
      Year: movie.Year,
      imdbID: movie.imdbID,
      Type: movie.Type,
      Poster: movie.Poster,
    };
    const data = await http.post('/handle-favorites', movieInfo);
    if (data.success) {
      setFavorites(data.movies);
    }
    setFavoriteStatus(!favoriteStatus);
  }

  return (
    <div className="image-container m-3 ">
      <div>
        <img src={movie.Poster} alt="poster" />
      </div>
      <div
        onClick={handleFavorites}
        className="overlay d-flex align-items-center justify-content-center p-2"
        aria-hidden="true"
      >
        Add to your list
        <FontAwesomeIcon icon={faHeart} className={`ms-2 fs-4 ${favoriteStatus ? 'text-danger' : 'text-secondary'}`} />
      </div>
    </div>
  );
}

export default PosterCard;
