import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from './components/Container';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { MoviePage } from './pages/MoviePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProfilePage } from './pages/ProfilePage';
import { SchedulePage } from './pages/SchedulePage';
import { ROUTES } from './utils/constants/router';
import { store } from './utils/redux/store';

export const App = () => (
  <BrowserRouter>
    <Container>
      <Header />
      <Provider store={store}>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.MOVIE} element={<MoviePage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.SHEDULE} element={<SchedulePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Provider>
    </Container>
  </BrowserRouter>
);
