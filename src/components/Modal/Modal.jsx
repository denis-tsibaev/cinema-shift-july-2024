import { createPortal } from 'react-dom';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children }) => {
  return createPortal(
    <div className='modal-backdrop'>
      <div className='modal-content'>{children}</div>
    </div>,
    modalRoot
  );
};
