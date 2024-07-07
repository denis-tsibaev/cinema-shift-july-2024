/* eslint-disable react/prop-types */
import './Button.css';

export const Button = ({
  type = 'button',
  style,
  className = 'afisha-button',
  children,
  onClick,
  disabled
}) => (
  <button type={type} style={style} className={className} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);
