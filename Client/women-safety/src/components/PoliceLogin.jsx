import axios from 'axios';
import React, { useState } from 'react';

function PoliceLogin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [station, setStation] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle police login logic here
    axios.post()

    console.log('Police login:', { name, email, station, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Police Login</h3>
      <input
        type="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="station"
        placeholder="Station"
        value={station}
        onChange={(e) => setStation(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default PoliceLogin;
