import './Footer.css';

export const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer-text'>
        Проект сделан в рамках программы ШИФТ интенсив, автор: Цибаев Денис
      </p>
      <p className='footer-text'>ШИФТ ЦФТ 2024</p>
      <div className='box-container'>
        <div className='box'></div>
        <div className='box'></div>
        <div className='box'></div>
      </div>
    </footer>
  );
};
