import { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './components/Container';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { MoviePage } from './pages/MoviePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PaymentCardPage } from './pages/PaymentCardPage';
import { PaymentProfilePage } from './pages/PaymentProfilePage';
import { ProfilePage } from './pages/ProfilePage';
import { SchedulePage } from './pages/SchedulePage';
import { TicketsPage } from './pages/TicketsPage';
import { ROUTES } from './utils/constants/router';
import { store } from './utils/redux/store';

function App() {
  const [day, setDay] = useState(null);
  const [time, setTime] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [person, setPerson] = useState(null);
  const [filmId, setFilmId] = useState(null);
  //   const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Provider store={store}>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.MOVIE} element={<MoviePage setFilmId={setFilmId} />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.TICKETS} element={<TicketsPage />} />
            <Route
              path={ROUTES.PAYMENT_PROFILE}
              element={<PaymentProfilePage setPerson={setPerson} />}
            />
            <Route
              path={ROUTES.PAYMENT_CARD}
              element={
                <PaymentCardPage
                  filmId={filmId}
                  person={person}
                  day={day}
                  time={time}
                  tickets={tickets}
                />
              }
            />
            <Route
              path={ROUTES.SHEDULE}
              element={
                <SchedulePage
                  day={day}
                  setDay={setDay}
                  time={time}
                  setTime={setTime}
                  tickets={tickets}
                  setTickets={setTickets}
                />
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Provider>
        <Footer />
      </Container>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
