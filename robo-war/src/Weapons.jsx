// src/components/Weapon.js
import React from 'react';

function Weapon(props) {
  return (
    <div
      className={`weapon ${props.type}`}
      style={{ left: `${props.x}px`, top: `${props.y}px` }}
    />
  );
}

export default Weapon;
