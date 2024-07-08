import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import './CreditCard.css';

// eslint-disable-next-line react/prop-types
export const CreditCard = ({ setCard }) => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const card = {
      pan: e.target.pan.value,
      expireDate: e.target.expireDate.value,
      cvv: e.target.cvv.value
    };

    setCard({ ...card });
    // console.log('card: ', card);
    navigate('/tickets');
  };
  return (
    <form className='credit-card-form' onSubmit={onSubmit}>
      <div className='credit-card-form-container'>
        <label>
          номер карты* <input type='number' name='pan' placeholder='0000 0000' required />
        </label>
        <label>
          срок* <input type='number' name='expireDate' placeholder='00/00' required />
        </label>
        <label>
          CVV* <input type='number' name='cvv' placeholder='0000' required />
        </label>
      </div>
      <Button type='submit'>Оплатить</Button>
    </form>
  );
};
