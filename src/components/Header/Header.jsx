import { Link } from 'react-router-dom';
import CinemaLogo from '../../assets/images/cinema-logo.svg';
import cinemaPersonIcon from '../../assets/images/cinema-person.svg';
import cinemaTicketIcon from '../../assets/images/cinema-ticket.svg';
import './Header.css';

export const Header = () => {
  return (
    <nav className='nav'>
      <Link to='/'>
        <img src={CinemaLogo} width={102} alt='cinema-shift-logo' />
      </Link>
      <Link to='/' className='nav-link'>
        Главная
      </Link>
      <Link to='/profile' className='nav-link'>
        <img src={cinemaPersonIcon} alt='person logo' />
        Профиль
      </Link>
      <Link to='/tickets' className='nav-link'>
        <img src={cinemaTicketIcon} alt='ticket logo' />
        Билеты
      </Link>
    </nav>
  );
};
