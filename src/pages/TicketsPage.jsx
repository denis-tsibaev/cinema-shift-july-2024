import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import acceptIcon from '../assets/images/accept.svg';
import { getTickets } from '../utils/api/serviceApi';

/* eslint-disable react/prop-types */
export const TicketsPage = ({ filmId, person, card, tickets, day, time }) => {
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
        console.log(data);
        // console.log(data.order.orderNumber);
        console.log(data.order.status);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Произошла ошибка при покупке билетов');
      });
  }, [card, day, filmId, person, tickets, time]);

  //   const ticketsArr = tickets.pop();

  //   console.log('TicketsPage-filmId: ', filmId);
  //   console.log('TicketsPage-peson: ', person);
  //   console.log('TicketsPage-card: ', card);
  //   console.log('TicketsPage-day: ', day);
  //   console.log('TicketsPage-day: ', time);
  //   console.log('TicketsPage-tickets: ', ticketsArr);

  return (
    <>
      {!data && <h1 className='tickets-page-title'>Tickets</h1>}

      {data && data.success && (
        <div className='tickets-page-container'>
          <img src={acceptIcon} alt='tickets payed accept icon' />
          <h2 className='tickets-page-paragraph'>Оплата прошла успешно</h2>
          <p className='tickets-page-paragraph'>Номер заказа: {data.order.orderNumber}</p>
          <p className='tickets-page-paragraph'>Статус заказ: {data.order.status}</p>{' '}
        </div>
      )}

      <ToastContainer />
    </>
  );
};
