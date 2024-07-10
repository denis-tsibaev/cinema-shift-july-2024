/* eslint-disable react/prop-types */
import { useState } from 'react';
import crossIcon from '../assets/images/cross.svg';
// import { getOrders } from '../utils/api/serviceApi';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
export const ProfilePage = () => {
  //   useEffect(() => {
  //     getOrders().then((data) => {
  //       console.log(data);
  //     });
  //   }, []);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const person = JSON.parse(localStorage.getItem('person'));

  return (
    <div className='profile-page'>
      <h1 className='profile-title'>Личный кабинет</h1>
      <div className='user-profile-description-container'>
        {person.firstname && (
          <p className='user-profile-description'>
            <b>
              Привет, {person.firstname} {person.lastname}!
            </b>
          </p>
        )}
        {person.phone && (
          <p className='user-profile-description'>
            <b>Телефон: </b> {person.phone}!
          </p>
        )}
        {person.email && (
          <p className='user-profile-description'>
            <b>Почта: </b> {person.email}!
          </p>
        )}
      </div>
      <Button onClick={toggleModal} style={{ width: '300px' }}>
        Посмотреть купленные билеты
      </Button>
      {showModal && (
        <Modal>
          <div style={{ marginTop: '50px', marginBottom: '50px' }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas sit est quo dicta
            aut, porro possimus corporis ipsam magni accusantium esse asperiores qui consectetur
            mollitia itaque? A doloribus impedit ratione dolorem voluptatem soluta quis rerum error
            eaque quia id sapiente dignissimos, animi, natus eveniet itaque, molestiae distinctio
            nemo numquam. Accusamus corrupti provident rerum et dolor eum
          </div>
          <Button onClick={toggleModal}>ok</Button>
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
        </Modal>
      )}
    </div>
  );
};
