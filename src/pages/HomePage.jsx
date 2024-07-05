import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { BASE_URL, getMoviesToday } from '../utils/api/serviceApi';

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
    <Container>
      <Header />
      {movies && (
        <>
          <h1 className='afisha-title'>Афиша</h1>
          <ul className='movieList'>
            {movies.map((film) => (
              <li key={film.id} className='movieItem'>
                <img src={`${BASE_URL}${film.img}`} alt={film.name} />
                <h3 className='afisha-movie-name'>{film.name}</h3>
                <Button onClick={() => navigate(`/film/${film.id}`)}>Подробнее</Button>
              </li>
            ))}
          </ul>
        </>
      )}
      <ToastContainer />
    </Container>
  );
};
