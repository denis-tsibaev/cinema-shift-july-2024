import { useState } from 'react';
import crossIcon from '../assets/images/cross.svg';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal/Modal';
import { Person } from '../components/Person';

// eslint-disable-next-line react/prop-types
export const PaymentProfilePage = ({ setPerson }) => {
  const [showModal, setShowModal] = useState(true);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div style={{ fontSize: '100px', padding: '150px 0' }}>
      PaymentProfilePage
      {showModal && (
        <Modal>
          <Person setPerson={setPerson} />
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
