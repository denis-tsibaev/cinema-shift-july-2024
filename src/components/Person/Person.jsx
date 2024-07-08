import '../CreditCard/CreditCard.css';

export const Person = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <form className='credit-card-form' onSubmit={onSubmit}>
      <div className='credit-card-form-container'>
        <label>
          Имя*
          <input type='text' placeholder='Александр' />
        </label>
        <label>
          Фамилия*
          <input type='text' placeholder='Пушкин' />
        </label>
        <label>
          Отчество
          <input type='text' placeholder='Сергеевич' />
        </label>
        <label>
          Телефон*
          <input type='phone' placeholder='+7 (999) 999-99-99' />
        </label>
        <label>
          email*
          <input type='phone' placeholder='mail@example.ru' />
        </label>
      </div>
    </form>
  );
};
