import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '../components/Button';
import { BASE_URL, getMoviesToday } from '../utils/api/serviceApi';

// eslint-disable-next-line react/prop-types
export const HomePage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesToday()
      .then(({ data }) => {
        setMovies(data.films);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error('Что-то пошло не так! Попробуйте позже.');
      });
  }, []);

  return (
    <>
      {movies && (
        <>
          <h1 className='afisha-title'>Афиша</h1>
          <ul className='movieList'>
            {movies.map((film) => (
              <li key={film.id} className='movieItem'>
                <div className='movie-image-container'>
                  <img src={`${BASE_URL}${film.img}`} alt={film.name} />
                </div>
                <div className='movie-info-container-home-page'>
                  <h2 className='afisha-movie-name'>{film.name}</h2>
                  <p className='movie-description-home-page'>{film.country.name}</p>
                  <p className='movie-description-home-page'>
                    {film.genres.map((genre) => genre).join(', ')}
                  </p>
                  <Button
                    onClick={() => navigate(`/film/${film.id}`)}
                    style={{ position: 'absolute', bottom: '8px', left: '75px' }}
                  >
                    Подробнее
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <ToastContainer />
    </>
  );
};
