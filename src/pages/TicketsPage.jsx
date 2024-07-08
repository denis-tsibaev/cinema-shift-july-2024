import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getTickets } from '../utils/api/serviceApi';

/* eslint-disable react/prop-types */
export const TicketsPage = ({ filmId = '1', person, card, tickets, day, time }) => {
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
      .then(() => {
        toast.success('Билеты куплены');
        // console.log;
      })
      .catch((error) => {
        console.log(error);
        toast.error('Произошла ошибка при покупке билетов');
      });
  }, [card, day, filmId, person, tickets, time]);

  const ticketsArr = tickets.pop();

  console.log('TicketsPage-peson: ', person);
  console.log('TicketsPage-card: ', card);
  console.log('TicketsPage-day: ', day);
  console.log('TicketsPage-day: ', time);
  console.log('TicketsPage-tickets: ', ticketsArr);

  return (
    <>
      <div style={{ fontSize: '150px', padding: '150px 0' }}>Tickets</div>
      <ToastContainer />
    </>
  );
};
