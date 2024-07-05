/* eslint-disable react/prop-types */
// import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';

export const SeatsPage = ({
  hallName,
  places,
  time,
  tickets,
  setTickets,
  totalPrice,
  setTotalPrice
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleChangeInput = (e) => {
    if (e.target.checked) {
      setTotalPrice(totalPrice + Number(e.target.value));
      tickets.push({
        row: e.target.attributes.row.value,
        column: e.target.attributes.column.value,
        id: e.target.attributes.row.value + e.target.attributes.column.value
      });
    } else {
      setTotalPrice(totalPrice - Number(e.target.value));
      setTickets(
        tickets.filter(
          (ticket) => ticket.id !== e.target.attributes.row.value + e.target.attributes.column.value
        )
      );
    }
    // console.log(e.target);
    // console.log(e.target.value);
  };

  console.log(tickets);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div className='seats-container'>
        <h1>Выбор места</h1>
        <h2>
          {hallName === 'Red' ? 'Красный зал' : hallName === 'Green' ? 'Зеленый зал' : 'Синий зал'},
          сеанс на: {time}
        </h2>
        <p className='screen'>Экран</p>
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
      <p>Итого: {totalPrice}</p>
      <Button onClick={toggleModal} disabled={totalPrice === 0}>
        Подтвердить
      </Button>
      {showModal && (
        <Modal>
          <h2>Вы выбрали места</h2>
          <p>Сумма к оплате: {totalPrice}</p>
          <p>Перейти к оплате билетов на выбранный сеанс?</p>
          <br />
          <br />
          <br />

          <Button style={{ marginRight: '5px' }} onClick={() => navigate('/profile')}>
            Перейти
          </Button>

          <Button onClick={toggleModal}>Отмена</Button>
        </Modal>
      )}
    </>
  );
};
