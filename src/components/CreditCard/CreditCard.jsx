import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import acceptIcon from '../../assets/images/accept.svg';
import { getTickets } from '../../utils/api/serviceApi';
import { Button } from '../Button';
import { Modal } from '../Modal';
import './CreditCard.css';

// eslint-disable-next-line react/prop-types
export const CreditCard = ({ filmId, person, day, time, tickets }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userCard = {
      pan: e.target.pan.value,
      expireDate: e.target.expireDate.value,
      cvv: e.target.cvv.value
    };
    e.currentTarget.reset();

    // console.log('userCard', userCard);

    getTickets({
      filmId,
      person,
      debitCard: userCard,
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
        console.log(error.response.data.reason);
        console.log(error);
        toast.error(error.response.data.reason);
      });
  };
  const data = JSON.parse(localStorage.getItem('data'));
  const filmName = localStorage.getItem('filmName');

  return (
    <>
      <form className='credit-card-form' onSubmit={onSubmit}>
        <div className='credit-card-form-container'>
          <label>
            номер карты*{' '}
            <input
              type='number'
              name='pan'
              placeholder='0000 0000'
              required
              minLength={8}
              maxLength={8}
            />
          </label>
          <label>
            срок*{' '}
            <input
              type='number'
              name='expireDate'
              placeholder='00/00'
              required
              minLength={4}
              maxLength={4}
            />
          </label>
          <label>
            CVV*{' '}
            <input
              type='number'
              name='cvv'
              placeholder='0000'
              required
              minLength={4}
              maxLength={4}
            />
          </label>
        </div>
        <Button type='submit'>Оплатить</Button>
      </form>

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
          <Button
            onClick={() => {
              toggleModal();
              navigate('/tickets');
            }}
          >
            Закрыть
          </Button>
        </Modal>
      )}
    </>
  );
};
