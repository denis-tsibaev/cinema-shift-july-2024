/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../utils/api/serviceApi';
import { Button } from '../Button';
import '../CreditCard/CreditCard.css';

export const Person = ({ setPerson }) => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const person = {
      firstname: e.target.name.value,
      lastname: e.target.surname.value,
      middlename: e.target.patronymic.value,
      email: e.target.email.value,
      city: e.target.city.value,
      phone: e.target.phone.value
    };
    setPerson({ ...person });
    updateUser({
      profile: {
        firstname: person.firstname,
        middlename: person.middlename,
        lastname: person.lastname,
        email: person.email,
        city: person.city
      },
      phone: person.phone
    });
    navigate('/payment-card');
  };

  return (
    <form className='credit-card-form' onSubmit={onSubmit}>
      <div className='credit-card-form-container'>
        <label>
          Имя*
          <input type='text' name='name' required />
        </label>
        <label>
          Фамилия*
          <input type='text' name='surname' required />
        </label>
        <label>
          Отчество
          <input type='text' name='patronymic' />
        </label>
        <label>
          Телефон*
          <input type='phone' name='phone' required />
        </label>
        <label>
          email*
          <input type='phone' name='email' required />
        </label>
        <label>
          Город
          <input type='text' name='city' />
        </label>
      </div>
      <Button type='submit'>Продолжить</Button>
    </form>
  );
};
