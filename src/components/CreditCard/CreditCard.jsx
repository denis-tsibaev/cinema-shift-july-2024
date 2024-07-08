import './CreditCard.css';
export const CreditCard = () => {
  return (
    <form className='credit-card-form'>
      <div className='credit-card-form-container'>
        <label>
          Ваш телефон
          <input type='phone' placeholder='+7 (999) 999-99-99' />
        </label>
        <label>
          Ваша почта
          <input type='phone' placeholder='mail@example.ru' />
        </label>
        <label>
          номер карты* <input type='number' placeholder='0000 0000' required />
        </label>
        <label>
          срок* <input type='number' placeholder='00/00' required />
        </label>
        <label>
          CVV* <input type='number' placeholder='0000' required />
        </label>
      </div>
    </form>
  );
};
