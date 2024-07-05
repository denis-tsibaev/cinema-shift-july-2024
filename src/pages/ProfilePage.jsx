import { Container } from '../components/Container';
import { Header } from '../components/Header';

export const ProfilePage = () => {
  return (
    <Container>
      <Header />
      <div style={{ color: 'white', fontSize: '24px' }}>
        Profile
        <p style={{ color: 'white' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </Container>
  );
};
