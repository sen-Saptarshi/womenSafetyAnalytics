import React from 'react';

function Map() {
  return (
    <div className="map">
      <iframe
        title="Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.7076252670464!2d79.9339704144317!3d22.68423628512296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981ae142c8ab20d%3A0x9b1b3bd3d4018d7e!2sJabalpur%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1599497983374!5m2!1sen!2sin"
        width="1100"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Map;

