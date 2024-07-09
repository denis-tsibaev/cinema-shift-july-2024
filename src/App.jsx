import { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
  const [person, setPerson] = useState({});
  const [card, setCard] = useState({});
  const [filmId, setFilmId] = useState(null);
  const [filmName, setFilmName] = useState(null);

  return (
    <BrowserRouter>
      <Container>
        <Header />
        <Provider store={store}>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.MOVIE} element={<MoviePage setFilmName={setFilmName} />} />
            <Route
              path={ROUTES.PROFILE}
              element={<ProfilePage person={person} setPerson={setPerson} />}
            />
            <Route
              path={ROUTES.TICKETS}
              element={
                <TicketsPage
                  day={day}
                  time={time}
                  setTime={setTime}
                  tickets={tickets}
                  setTickets={setTickets}
                  ё
                  person={person}
                  card={card}
                  filmId={filmId}
                  filmName={filmName}
                />
              }
            />
            <Route
              path={ROUTES.PAYMENT_PROFILE}
              element={<PaymentProfilePage setPerson={setPerson} />}
            />
            <Route path={ROUTES.PAYMENT_CARD} element={<PaymentCardPage setCard={setCard} />} />
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
                  filmId={filmId}
                  setFilmId={setFilmId}
                />
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Provider>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;
