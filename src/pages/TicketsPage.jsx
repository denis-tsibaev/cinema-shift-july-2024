import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import acceptIcon from '../assets/images/accept.svg';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { getTickets } from '../utils/api/serviceApi';

/* eslint-disable react/prop-types */
export const TicketsPage = ({ filmId, filmName, person, card, tickets, setTickets, day, time }) => {
  const [data, setdata] = useState(null);

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
        setdata(data);
        toast.success('Билеты куплены');
        setShowModal(true);
        setTickets([]);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.reason);
        setTickets([]);
        toast.error(error.response.data.reason);
        // toast.error('Произошла ошибка при покупке билетов');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  //   console.log('tickets', tickets);
  //   console.log('filmName', filmName);

  return (
    <>
      {!data && <h1 className='tickets-page-title'>Tickets</h1>}
      {data && (
        <>
          <h2>Билеты</h2>
          <div className='movie-ticket'>
            <p>
              Дата {data.order.tickets.map((ticket) => ticket.seance.date)[0]} и время{' '}
              {data.order.tickets.map((ticket) => ticket.seance.time)[0]}
            </p>
            <h3>filmName {filmName}</h3>
            <p>
              ряд и место{' '}
              {data.order.tickets.map((ticket) => `${ticket.row}-${ticket.column}`).join(', ')}
            </p>
            <p>Оплачен</p>
            <p>Код билета {data.order.orderNumber}</p>
            <Button>Вернуть билет</Button>
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
    </>
  );
};
