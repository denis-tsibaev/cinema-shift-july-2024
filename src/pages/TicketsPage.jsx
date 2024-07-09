import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import acceptIcon from '../assets/images/accept.svg';
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
        toast.success('Билеты куплены');
        setdata(data);
        //   setTickets([]);
      })
      .catch((error) => {
        // console.log(error);
        // console.log(error.response.data.reason);
        setTickets([]);
        toast.error('Произошла ошибка при покупке билетов');
        toast.error(error.response.data.reason);
      });
  }, []);

  console.log('tickets', tickets);

  return (
    <>
      {!data && <h1 className='tickets-page-title'>Tickets</h1>}

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
      <Link className='go-to-profile-link' to='/profile'>
        Перейти в личный кабинет
      </Link>
      <ToastContainer />
    </>
  );
};
