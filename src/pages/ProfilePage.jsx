import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import crossIcon from '../assets/images/cross.svg';
import { Button } from '../components/Button';
import '../components/CreditCard/CreditCard.css';
import { Modal } from '../components/Modal';
import {
  getOrders,
  getOtpCode,
  getUserSession,
  updateUser,
  userSignin
} from '../utils/api/serviceApi';

export const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const [phoneNumber, setPhoneNumber] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [person, setPerson] = useState({});
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
    userSignin({ phone: phoneNumber.toString(), code: otp }).then((data) => {
      setToken(data.token);
      setPerson(data.user);
      toast.success('Вы авторизованы');
    });
    form.reset();
  };

  const getUsersOrders = async () => {
    await getOrders().then(({ data }) => {
      setOrders(data.orders);
    });
  };

  const userInfo = async () => {
    try {
      const { data } = await getUserSession();
      setPerson(data.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const editUserInfo = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    updateUser({
      profile: {
        firstname: event.target.newName.value,
        middlename: event.target.newMiddlename.value,
        lastname: event.target.newLastname.value,
        email: event.target.newEmail.value,
        city: event.target.newCity.value
      },
      phone: person.phone
    });
    form.reset();
    toggleEditModal();
  };

  const navigate = useNavigate();

  return (
    <>
      {!token && (
        <div className='profile-page'>
          <h1 className='profile-title'>Личный кабинет</h1>
          <Button onClick={toggleModal}>Войти</Button>
          {showModal && (
            <Modal>
              <form className='credit-card-form' onSubmit={getCodeSubmit} autoComplete='on'>
                <label>
                  Номер телефона
                  <input type='phone' name='phone' required />
                </label>

                <Button type='submit' disabled={phoneNumber}>
                  Получить код
                </Button>
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

              <form className='credit-card-form' onSubmit={otpSubmit} autoComplete='on'>
                <label>
                  OTP код
                  <input type='phone' name='otp' required />
                </label>
                <Button type='submit' disabled={!phoneNumber}>
                  Продолжить
                </Button>
              </form>
            </Modal>
          )}
        </div>
      )}
      {token && (
        <div className='profile-page'>
          <h1 className='profile-title'>Добро пожаловать в личный кабинет</h1>
          <Button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
          >
            Выйти
          </Button>

          <Button onClick={toggleEditModal}>редактировать</Button>
          <Button onClick={userInfo}>обновить</Button>

          {showEditModal && (
            <Modal>
              <form className='credit-card-form' onSubmit={editUserInfo}>
                <div className='credit-card-form-container'>
                  <label>
                    Имя*
                    <input type='text' name='newName' required />
                  </label>
                  <label>
                    Фамилия*
                    <input type='text' name='newLastname' required />
                  </label>
                  <label>
                    Отчество
                    <input type='text' name='newMiddlename' />
                  </label>
                  <label>
                    email*
                    <input type='email' name='newEmail' required />
                  </label>
                  <label>
                    Город
                    <input type='text' name='newCity' />
                  </label>
                  <p style={{ color: 'gray', width: '300px', marginTop: '16px' }}>
                    Если хотите изменить номер телефона, то нужна новая регистрирация
                  </p>
                </div>
                <Button type='submit'>Продолжить</Button>
                <Button
                  onClick={toggleEditModal}
                  style={{
                    backgroundColor: 'transparent',
                    width: 'fit-content',
                    position: 'absolute',
                    top: '40px',
                    right: '40px'
                  }}
                >
                  <img src={crossIcon} alt='cross icon to close modal' />
                </Button>
              </form>
            </Modal>
          )}

          <div className='user-profile-description-container'>
            {person.firstname && person.lastname && (
              <p className='user-profile-description'>
                <b>
                  Привет, {person.firstname} {person.middlename} {person.lastname}!
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
            {person.city && (
              <p className='user-profile-description'>
                <b>Город: </b> {person.city}
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
        </div>
      )}
    </>
  );
};
