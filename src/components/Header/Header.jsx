import { Link } from 'react-router-dom';
import ReactLogo from '../../assets/images/cinema-logo.svg';
import './Header.css';

export const Header = () => {
  return (
    <nav className='nav'>
      <Link to='/'>
        <img src={ReactLogo} width={102} alt='cinema-shift-logo' />
      </Link>
      <Link to='/' className='nav__link'>
        Главная
      </Link>
      <Link to='/profile' className='nav__link'>
        Профиль
      </Link>
      <Link to='/tickets' className='nav__link'>
        Билеты
      </Link>
    </nav>
  );
};
