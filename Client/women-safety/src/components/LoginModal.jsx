import React, { useState } from 'react';
import Modal from 'react-modal';
import UserLogin from './UserLogin';
import PoliceLogin from './PoliceLogin';

Modal.setAppElement('#root');

function LoginModal({ modalIsOpen, setModalIsOpen }) {
  const [loginType, setLoginType] = useState(null);

  const renderLoginForm = () => {
    switch (loginType) {
      case 'user':
        return <UserLogin />;
      case 'police':
        return <PoliceLogin />;
      default:
        return (
          <>
            <h2>Login</h2>
            <button className="login-option" onClick={() => setLoginType('user')}>User Login</button>
            <button className="login-option" onClick={() => setLoginType('police')}>Police Login</button>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </>
        );
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '10px',
          width: '400px',
          textAlign: 'center',
        },
      }}
    >
      {renderLoginForm()}
      {loginType && (
        <button onClick={() => setLoginType(null)}>Back</button>
      )}
    </Modal>
  );
}

export default LoginModal;
