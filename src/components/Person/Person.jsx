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
      city: 'Novosibirsk',
      phone: e.target.phone.value
    };
    setPerson({ ...person });
    updateUser(person);
    navigate('/payment-card');
    // localStorage.setItem('person', JSON.stringify(person));
  };

  return (
    <form className='credit-card-form' onSubmit={onSubmit}>
      <div className='credit-card-form-container'>
        <label>
          Имя*
          <input type='text' name='name' placeholder='Александр' required />
        </label>
        <label>
          Фамилия*
          <input type='text' name='surname' placeholder='Пушкин' required />
        </label>
        <label>
          Отчество
          <input type='text' name='patronymic' placeholder='Сергеевич' />
        </label>
        <label>
          Телефон*
          <input type='phone' name='phone' placeholder='+7 (999) 999-99-99' required />
        </label>
        <label>
          email*
          <input type='phone' name='email' placeholder='mail@example.ru' required />
        </label>
      </div>
      <Button type='submit'>Продолжить</Button>
    </form>
  );
};
