import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { cancelTicket } from '../utils/api/serviceApi';

export const TicketsPage = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [statusCancelled, setStatusCancelled] = useState(false);
  const data = JSON.parse(localStorage.getItem('data'));

  const toggleСancelModal = () => {
    setShowCancelModal(!showCancelModal);
  };

  const token = localStorage.getItem('token');
  const filmName = localStorage.getItem('filmName');
  const navigate = useNavigate();

  const cancelTicketAuth = () => {
    if (!token) {
      console.log('no token');
      toast('Вы не авторизованы');
      navigate('/profile');
    }
    cancelTicket(data.order._id.toString()).then((cancelResponse) => {
      console.log('cancel-data-success', cancelResponse.data.success);
      if (cancelResponse.data.success) {
        toast.info('Билет отменён');
      }
      setStatusCancelled(true);
    });
  };

  return (
    <section className='tickets-section'>
      {!data && <h1 className='tickets-page-title'>Здесь будут ваши билеты</h1>}
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
              <span className='movie-ticket-payInfo movie-ticket-payInfo-cancelled'>
                {!statusCancelled && 'Оплачено'}
                {statusCancelled && 'Билет отменён'}
              </span>
              <span className='movie-ticket-code'>код билета {data.order.orderNumber}</span>
            </div>
            {!statusCancelled && (
              <Button style={{ width: '300px' }} onClick={setShowCancelModal}>
                Вернуть билет
              </Button>
            )}
            {showCancelModal && (
              <Modal>
                <h4 style={{ marginTop: '50px', marginBottom: '50px' }}>
                  Вы передумали и хотите вернуть билет?
                </h4>
                <Button style={{ marginRight: '20px' }} onClick={toggleСancelModal}>
                  Нет
                </Button>
                <Button
                  onClick={() => {
                    cancelTicketAuth();
                    toggleСancelModal();
                  }}
                >
                  Вернуть
                </Button>
              </Modal>
            )}
          </div>
        </>
      )}
    </section>
  );
};
