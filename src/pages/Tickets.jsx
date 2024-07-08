import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getTickets } from '../utils/api/serviceApi';

/* eslint-disable react/prop-types */
export const Tickets = ({ filmId, person, card, tickets, day, time }) => {
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
        console.log;
      })
      .catch((error) => {
        console.log(error);
        toast.error('Произошла ошибка при покупке билетов');
      });
  }, [filmId, person, card, tickets, day, time]);

  return (
    <>
      <div style={{ fontSize: '150px', padding: '150px 0' }}>Tickets</div>
      <ToastContainer />
    </>
  );
};
