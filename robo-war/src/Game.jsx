// src/components/Game.js
import React, { useState, useEffect } from 'react';
import './Game.css';
import Weapons from './Weapons';
import RobotFace from './RobotFace.jsx'
function Game() {
  const [weapons, setWeapons] = useState([]);
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const initialWeapons = [
      { x: 100, y: 100, type: 'laser-gun' },
      { x: 200, y: 200, type: 'rocket-launcher' },
      // Add more weapons
    ];
    setWeapons(initialWeapons);

    
    // Handle robot movements here based on user input
    // You'll need to add event listeners for arrow key presses
        const handleKeyPress = (event) => {
          weapons.forEach((weapon, index) => {
            const dx = robotPosition.x - weapon.x;
            const dy = robotPosition.y - weapon.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 20) {
              // Robot is within range of a weapon (adjust the pickup range as needed)
              // Collect the weapon by removing it from the weapons array
              const updatedWeapons = [...weapons];
              updatedWeapons.splice(index, 1);
              setWeapons(updatedWeapons);
            }
           });

          switch (event.key) {
            case 'ArrowUp':
              setRobotPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y - 10 }));
              break;
            case 'ArrowDown':
              setRobotPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + 10 }));
              break;
            case 'ArrowLeft':
              setRobotPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - 10 }));
              break;
            case 'ArrowRight':
              setRobotPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + 10 }));
              break;
            default:
              break;
          }
        };
      
        window.addEventListener('keydown', handleKeyPress);
      
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
          
       
      }, []);

  return (
    <div className="game">
      <div className="game-board">
        {/* Render the game board */}
        {weapons.map((weapon, index) => (
    <Weapons 
      key={index}
      x={weapon.x}
      y={weapon.y}
      type={weapon.type}
    />
  ))}
      </div>
      {/* <RobotFace /> */}
      <div
        className="robot"
        style={{ left: `${robotPosition.x}px`, top: `${robotPosition.y}px` }}
      >
        
        {/* Render the robot */}
      </div>
    </div>
  );
}

export default Game;