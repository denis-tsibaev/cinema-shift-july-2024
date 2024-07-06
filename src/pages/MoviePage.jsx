import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { BASE_URL, getMovie } from '../utils/api/serviceApi';

export const MoviePage = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const { filmId } = useParams();

  useEffect(() => {
    getMovie(filmId)
      .then(({ data }) => {
        setMovie(data.film);
        // console.log(data.film);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [filmId]);

  return (
    <>
      <div className='moviePage'>
        <img src={`${BASE_URL}${movie.img}`} alt={movie.name} />
        <h2 className='moviePage__title'>{movie.name}</h2>
        <p>{movie.description}</p>
        <p>
          Кинопоиск: <b>{movie.userRatings?.kinopoisk}</b>
        </p>
        <Button style={{ width: '250px' }} onClick={() => navigate(`/film/${filmId}/schedule`)}>
          Посмотреть расписание
        </Button>
      </div>
    </>
  );
};
