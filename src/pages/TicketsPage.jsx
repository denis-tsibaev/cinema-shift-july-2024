import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
  const [showCancelModal, setShowCancelModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const toggleModal2 = () => {
    setShowCancelModal(!showCancelModal);
  };

  //   console.log('tickets', tickets);
  //   console.log('filmName', filmName);

  const data = JSON.parse(localStorage.getItem('data'));
  //   const order = data.order.orderNumber;
  //   const date = data.order.tickets.map((ticket) => ticket.seance.date)[0];
  //   const hourmin = data.order.tickets.map((ticket) => ticket.seance.time)[0];
  //   const rowcol = data.order.tickets.map((ticket) => `${ticket.row}-${ticket.column}`).join(', ');
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
              <b> ряд-место: </b>
              {data.order.tickets.map((ticket) => `${ticket.row}-${ticket.column}`).join(', ')}
            </p>
            <div className='movie-ticket-info-container'>
              <span className='movie-ticket-payInfo'>Оплачен</span>
              <span className='movie-ticket-code'>код билета {data.order.orderNumber}</span>
            </div>
            <Button style={{ width: '300px' }} onClick={setShowCancelModal}>
              Вернуть билет
            </Button>
            {showCancelModal && (
              <Modal>
                <h3 style={{ marginTop: '50px', marginBottom: '50px' }}>
                  Вы передумали и хотите вернуть билет?
                </h3>
                <Button style={{ marginRight: '20px' }} onClick={toggleModal2}>
                  Нет
                </Button>
                <Button onClick={() => {}}>Вернуть</Button>
              </Modal>
            )}
          </div>
        </>
      )}

      {showModal && (
        <Modal>
          {data.success && (
            <div className='tickets-page'>
              <div className='subtitle-and-image-container'>
                <img src={acceptIcon} alt='tickets payed accept icon' />
                <h2 className='tickets-page-subtitle'>Оплата прошла успешно!</h2>
              </div>
              <div className='paragraph-container'>
                <p className='paragraph'>
                  <b>Номер билета: </b>
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
    </section>
  );
};
