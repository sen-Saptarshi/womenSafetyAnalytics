import React, { useState } from 'react';
import Modal from 'react-modal';
import LoginModal from './LoginModal';

function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <header className="header">
      <h1 class="font-bold text-[rgb(252,186,3)] text-2xl"><a href="localhost:5173">Alert She</a></h1>
      <div className="nav">
        <button>Dashboard</button>
        <button>Analytics</button>
        <button>Notifications</button>
        <button onClick={() => setModalIsOpen(true)}>Login</button>
      </div>
      <LoginModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </header>
  );
}

export default Header;
