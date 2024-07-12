import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import crossIcon from '../assets/images/cross.svg';
import { Button } from '../components/Button';
import '../components/CreditCard/CreditCard.css';
import { Modal } from '../components/Modal';
import { getOrders, getOtpCode, userSession, userSignin } from '../utils/api/serviceApi';

export const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [phoneNumber, setPhoneNumber] = useState('');
  const personDefault = {
    firstname: '',
    lastname: '',
    middlename: '',
    email: '',
    city: 'Novosibirsk',
    phone: phoneNumber
  };
  const person = JSON.parse(localStorage.getItem('person')) || personDefault;
  const [orders, setOrders] = useState([]);
  const getCodeSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const phoneNumber = form.phone.value;
    setPhoneNumber(phoneNumber);
    getOtpCode(phoneNumber);
    form.reset();
  };

  const otpSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const otp = form.otp.value;
    userSignin({ phone: phoneNumber.toString(), code: otp }).then((token) => {
      setToken(token);
      localStorage.setItem('token', token);
    });
    form.reset();
  };

  const getUsersOrders = async () => {
    await getOrders().then(({ data }) => {
      setOrders(data.orders);
    });
  };

  const aboutUser = () => {
    const userProfile = userSession();
    console.log('userProfile: ', userProfile);
    localStorage.setItem('person', JSON.stringify(userProfile));
  };

  //   console.log('token: ', token);
  //   console.log('orders: ', orders);

  const navigate = useNavigate();

  return (
    <>
      {!token && (
        <div className='profile-page'>
          <h1 className='profile-title'>Личный кабинет</h1>
          <Button onClick={toggleModal}>Войти</Button>
          {showModal && (
            <Modal>
              <form className='credit-card-form' onSubmit={getCodeSubmit}>
                <label>
                  Номер телефона
                  <input type='phone' name='phone' required />
                </label>

                <Button type='submit'>Получить код</Button>
                <Button
                  onClick={toggleModal}
                  style={{
                    backgroundColor: 'white',
                    width: 'fit-content',
                    position: 'absolute',
                    top: '0',
                    right: '0'
                  }}
                >
                  <img src={crossIcon} alt='cross icon to close modal' />
                </Button>
              </form>

              <form className='credit-card-form' onSubmit={otpSubmit}>
                <label>
                  OTP код
                  <input type='phone' name='otp' required />
                </label>
                <Button type='submit'>Продолжить</Button>
              </form>
            </Modal>
          )}
        </div>
      )}
      {token && (
        <div className='profile-page'>
          <h1 className='profile-title'>Личный кабинет</h1>
          <Button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
          >
            Выйти
          </Button>

          <Button onClick={aboutUser}>О пользователе</Button>

          <div className='user-profile-description-container'>
            {person.firstname && person.lastname && (
              <p className='user-profile-description'>
                <b>
                  Привет, {person.firstname} {person.lastname}!
                </b>
              </p>
            )}

            {person.phone && (
              <p className='user-profile-description'>
                <b>Телефон: </b> {person.phone}
              </p>
            )}
            {person.email && (
              <p className='user-profile-description'>
                <b>Почта: </b> {person.email}
              </p>
            )}
          </div>
          <Button onClick={getUsersOrders} style={{ width: '300px' }}>
            Получить список билетов
          </Button>
          <div style={{ fontSize: '20px', marginTop: '20px', marginBottom: '20px' }}>
            {orders.length === 0 && <p>Список билетов пуст</p>}
            <ol>
              {orders.map((order) => (
                <li key={order.orderNumber}>
                  номер заказа {order.orderNumber}---{order.phone}---{order.status}
                </li>
              ))}
            </ol>
          </div>
          {/* <Button onClick={toggleModal}>Modal Window</Button> */}
          {showModal && (
            <Modal>
              <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                <h2> Добро пожаловать в личный кабинет!</h2>
              </div>
              <Button onClick={toggleModal}>Ok</Button>
              {/* <Button
                onClick={toggleModal}
                style={{
                  backgroundColor: 'white',
                  width: 'fit-content',
                  position: 'absolute',
                  top: '0',
                  right: '0'
                }}
              >
                <img src={crossIcon} alt='cross icon to close modal' />
              </Button> */}
            </Modal>
          )}
        </div>
      )}
    </>
  );
};
