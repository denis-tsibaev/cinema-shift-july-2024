/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';

export const SeatsPage = ({ hallName, places, time, tickets, setTickets }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleChangeInput = (event) => {
    if (event.target.checked) {
      setTotalPrice(totalPrice + Number(event.target.value));
      tickets.push({
        row: event.target.attributes.row.value,
        column: event.target.attributes.column.value,
        id: event.target.attributes.row.value + event.target.attributes.column.value
      });
    } else {
      setTotalPrice(totalPrice - Number(event.target.value));
      tickets &&
        setTickets(
          tickets.filter(
            (ticket) =>
              ticket.id !== event.target.attributes.row.value + event.target.attributes.column.value
          )
        );
    }
  };

  //   console.log(tickets);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className='seats-container'>
        <h1 className='seats-title'>Выбор места</h1>
        <h2 className='hall-name-date'>
          {hallName === 'Red' ? 'Красный зал' : hallName === 'Green' ? 'Зеленый зал' : 'Синий зал'},
          сеанс на: {time}
        </h2>
        <p className='screen'>ЭКРАН</p>
        <br />
        <br />
        <ol className={hallName}>
          {places?.map((row, i) =>
            row.map((seat, j) => (
              <>
                <li key={j} className='checkbox-item'>
                  <p className='checkbox-item-row'>{i + 1}р</p>
                  <p className='checkbox-item-seat'>{j + 1}м</p>
                  <label className='label-checkbox'>
                    <p className='checkbox-item-price'> {seat.price}</p>
                    {seat.type !== 'BLOCKED' ? (
                      <input
                        type='checkbox'
                        name='seat'
                        value={seat.price}
                        // eslint-disable-next-line react/no-unknown-property
                        row={i + 1}
                        // eslint-disable-next-line react/no-unknown-property
                        column={j + 1}
                        className='input-checkbox-seat'
                        onChange={handleChangeInput}
                      />
                    ) : (
                      <input disabled type='checkbox' className='input-checkbox-seat' />
                    )}
                  </label>
                </li>
              </>
            ))
          )}
        </ol>
      </div>
      <p className='total-price'>Итого: {totalPrice} &#8381;</p>
      <Button onClick={toggleModal} disabled={totalPrice === 0}>
        Подтвердить
      </Button>
      {showModal && (
        <Modal>
          <h2 className='modal-title'>Вы выбрали места</h2>
          <p className='modal-paragraph'>Сумма к оплате: {totalPrice} &#8381;</p>
          <p className='modal-paragraph'>Перейти к оплате билетов на выбранный сеанс?</p>
          <br />
          <br />
          <Button onClick={toggleModal} style={{ marginRight: '8px' }}>
            Отмена
          </Button>
          <Button onClick={() => navigate('/payment-profile')}>Перейти</Button>
        </Modal>
      )}
    </>
  );
};
