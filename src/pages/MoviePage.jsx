import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import emptyStarIcon from '../assets/images/empty-star.svg';
import goldStarIcon from '../assets/images/gold-star.svg';
import { Button } from '../components/Button';
import { BASE_URL, getMovie } from '../utils/api/serviceApi';

// eslint-disable-next-line react/prop-types
export const MoviePage = ({ setFilmId }) => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const { filmId } = useParams();
  filmId && setFilmId(filmId.toString());

  useEffect(() => {
    getMovie(filmId)
      .then(({ data }) => {
        setMovie(data.film);
        localStorage.setItem('filmName', data.film.name);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [filmId]);

  return (
    <>
      <div className='movie-page'>
        <img src={`${BASE_URL}${movie.img}`} alt={movie.name} />
        <div className='container-description-movie-page'>
          <h2 className='movie-page-title'>{movie.name}</h2>
          <h3 className='original-movie-name'>
            <span className='movie-details-span'>оригинальное название: </span>({movie.originalName}
            )
          </h3>
          <h4 className='release-date'>
            <span className='movie-details-span'>дата выхода: </span>
            {movie.releaseDate}
          </h4>
          {movie.directors && (
            <p className='movie-description-movie-page '>
              <b>Режиссёр: </b> {movie.directors[0]?.fullName}
            </p>
          )}
          {movie.actors && (
            <p className='movie-description-movie-page'>
              <b>Актёры: </b> {movie.actors?.map((actor) => actor.fullName.toString()).join(', ')}
            </p>
          )}
          <hr />
          <p className='movie-description-movie-page'>{movie.description}</p>
          <img src={goldStarIcon} alt='rating star' className='rating-star' />
          <img src={goldStarIcon} alt='rating star' className='rating-star' />
          <img src={goldStarIcon} alt='rating star' className='rating-star' />
          <img src={goldStarIcon} alt='rating star' className='rating-star' />
          <img src={emptyStarIcon} alt='rating star' className='rating-star' />
          <p className='rating-description-movie-page'>
            Кинопоиск: <b>{movie.userRatings?.kinopoisk}</b> imdb: <b>{movie.userRatings?.imdb}</b>
          </p>
          <Button style={{ width: '250px' }} onClick={() => navigate(`/film/${filmId}/schedule`)}>
            Посмотреть расписание
          </Button>
        </div>
      </div>
    </>
  );
};
