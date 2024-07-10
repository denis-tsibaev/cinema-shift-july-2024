import { useState } from 'react';
import crossIcon from '../assets/images/cross.svg';
import { Button } from '../components/Button';
import { CreditCard } from '../components/CreditCard';
import { Modal } from '../components/Modal/Modal';

// eslint-disable-next-line react/prop-types
export const PaymentCardPage = ({ setCard }) => {
  const [showModal, setShowModal] = useState(true);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div style={{ fontSize: '150px', padding: '150px 0' }}>
      {/* PaymentPage */}
      {showModal && (
        <Modal>
          <CreditCard toggleModal={toggleModal} setCard={setCard} />
          <Button
            onClick={toggleModal}
            style={{
              backgroundColor: 'transparent',
              width: 'fit-content',
              position: 'absolute',
              top: '40px',
              right: '40px'
            }}
          >
            <img src={crossIcon} alt='cross icon to close modal' />
          </Button>
        </Modal>
      )}
    </div>
  );
};
