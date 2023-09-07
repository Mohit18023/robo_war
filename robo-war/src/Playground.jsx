// src/components/Playground.js
import React, { useState } from 'react';

function Playground() {
  const [playerSpeed, setPlayerSpeed] = useState(5);

  const handleSpeedChange = (event) => {
    setPlayerSpeed(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <h2>Playground</h2>
      <label htmlFor="speed">Player Speed:</label>
      <input
        type="range"
        id="speed"
        min="1"
        max="10"
        value={playerSpeed}
        onChange={handleSpeedChange}
      />
      {/* Other playground features */}
    </div>
  );
}

export default Playground;
