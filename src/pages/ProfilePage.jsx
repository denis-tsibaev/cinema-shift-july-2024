/* eslint-disable react/prop-types */
// import { useEffect } from 'react';
// import { getOrders } from '../utils/api/serviceApi';
export const ProfilePage = ({ person }) => {
  //   useEffect(() => {
  //     getOrders().then((data) => {
  //       console.log(data);
  //     });
  //   }, []);

  const storagedPerson = JSON.parse(localStorage.getItem('person'));

  if (storagedPerson) {
    person = storagedPerson;
  }

  return (
    <div className='profile-page'>
      <h1 className='profile-title'>Личный кабинет</h1>
      <div className='user-profile-description-container'>
        {person.firstname && (
          <p className='user-profile-description'>
            <b>Привет, {person.firstname}!</b>
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
    </div>
  );
};
