import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <section className='not-found-section'>
      <h1 className='not-found-title'>404</h1>
      <h2 className='not-found-subtitle'>Страница не найдена!</h2>
      <h3 className='not-found-subtitle'>Вернуться на главную страницу</h3>
      <Button onClick={() => navigate('/')}>На Афишу</Button>
    </section>
  );
};
