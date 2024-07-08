/* eslint-disable no-unused-vars */
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { Person } from '../components/Person';

export const ProfilePage = () => {
  const [name, setName] = useState('Username');
  const [phone, setPhone] = useState('+7 (999) 999-99-99');
  const [email, setEmail] = useState('mail@example.ru');

  const [showModal, setShowModal] = useState(true);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  //   const navigate = useNavigate();
  return (
    <div className='profile-page'>
      <h1 className='profile-title'>Личный кабинет</h1>
      <div className='user-profile-description-container'>
        {name && (
          <p className='user-profile-description'>
            <b>Привет, {name}!</b>
          </p>
        )}
        {phone && (
          <p className='user-profile-description'>
            <b>Телефон: </b> {phone}!
          </p>
        )}
        {email && (
          <p className='user-profile-description'>
            <b>Почта: </b> {email}!
          </p>
        )}
      </div>

      <Modal>
        <Person />
        <Button onClick={toggleModal}>Отмена</Button>
        <Button onClick={() => {}}>Продолжить</Button>
      </Modal>
    </div>
  );
};
