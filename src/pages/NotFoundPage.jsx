import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Container } from '../components/Container';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <div style={{ paddingTop: '150px' }}>
        <h1 style={{ fontSize: '150px', margin: '0' }}>404</h1>
        <h2>Страница не найдена</h2>
        <h3>Вернуться на главную страницу</h3>
        <Button type='button' onClick={() => navigate('/')}>
          На Афишу
        </Button>
      </div>
    </Container>
  );
};
