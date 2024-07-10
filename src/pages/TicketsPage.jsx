import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import acceptIcon from '../assets/images/accept.svg';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { getTickets } from '../utils/api/serviceApi';

/* eslint-disable react/prop-types */
export const TicketsPage = ({ filmId, person, card, tickets, day, time }) => {
  useEffect(() => {
    getTickets({
      filmId,
      person,
      debitCard: card,
      seance: {
        date: day,
        time
      },
      tickets
    })
      .then(({ data }) => {
        localStorage.setItem('data', JSON.stringify(data));
        toast.success('Билеты куплены');
        setShowModal(true);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.reason);
        toast.error(error.response.data.reason);
      });
  }, [card, day, filmId, person, tickets, time]);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  //   console.log('tickets', tickets);
  //   console.log('filmName', filmName);
  const data = JSON.parse(localStorage.getItem('data'));
  //   localStorage.setItem('filmName', filmName);
  const filmName = localStorage.getItem('filmName');

  return (
    <section className='tickets-section'>
      {!data && <h1 className='tickets-page-title'>Tickets</h1>}
      {data && (
        <>
          <h2 className='movie-ticket-title'>Билеты</h2>
          <div className='movie-ticket'>
            <div className='movie-ticket-date-container'>
              <span className='movie-ticket-date'>
                {data.order.tickets.map((ticket) => ticket.seance.date)[0]}
              </span>
              <span className='movie-ticket-time'>
                {' '}
                в {data.order.tickets.map((ticket) => ticket.seance.time)[0]}
              </span>
            </div>
            <h3 className='movie-name-title'>{filmName}</h3>
            <p className='movie-ticket-text'>
              {data.order.tickets.map((ticket) => `${ticket.row}`).join(', ')}ряд ---{' '}
              {data.order.tickets.map((ticket) => `${ticket.column}`).join(', ')}место
            </p>
            <span className='movie-ticket-text'>Оплачен</span>
            <span className='movie-ticket-text ticket-code'>
              Код билета {data.order.orderNumber}
            </span>
            <Button style={{ width: '300px' }}>Вернуть билет</Button>
          </div>
        </>
      )}

      {showModal && (
        <Modal>
          {data && data.success && (
            <div className='tickets-page'>
              <div className='subtitle-and-image-container'>
                <img src={acceptIcon} alt='tickets payed accept icon' />
                <h2 className='tickets-page-subtitle'>Оплата прошла успешно!</h2>
              </div>
              <div className='paragraph-container'>
                <p className='paragraph'>
                  <b>Номер заказа: </b>
                  {data.order.orderNumber}
                </p>
                <p className='paragraph'>
                  <b>Билеты (ряд-место): </b>
                  {data.order.tickets.map((ticket) => `${ticket.row}-${ticket.column}`).join(', ')}
                </p>
                <p className='paragraph'>
                  <b>Фильм: </b> {filmName}
                </p>
                <p className='paragraph'>
                  <b>Дата и время: </b>
                  {data.order.tickets.map((ticket) => ticket.seance.date)[0]}
                  <span> в </span>
                  {data.order.tickets.map((ticket) => ticket.seance.time)[0]}
                </p>
              </div>
            </div>
          )}
          <Button onClick={toggleModal}>Закрыть</Button>
        </Modal>
      )}

      <ToastContainer />
    </section>
  );
};
