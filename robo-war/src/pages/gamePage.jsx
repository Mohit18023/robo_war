import React, { useRef, useEffect, useState } from 'react';
import spriteImage from '../Images/background.png';
import IdleImage from "../Images/Idle1.png";
import IdleImage1 from "../Images/Idle2.png";
import RunImage from "../Images/Run.png";
import RunImage1 from "../Images/Run1.jpg";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  let player;
  let enemy;
  let backgroundImage;
  let timer = 60;
  let timerId;


  const keys = {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    ArrowRight: {
      pressed: false,
    },
    ArrowLeft: {
      pressed: false,
    },

  };

  let lastkey = ''; // Initialize lastkey with an empty string

  function determineWinner({ player, enemy, timerId }){
    clearTimeout(timerId);
    document.querySelector('#displayText').style.display = 'flex';
      if (player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'Tie';
      }
      
      else if(player.health > enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins!!';
      }

      else if(enemy.health > player.health){
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins!!';
      }
  }
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 576;

    backgroundImage = new Image();
    backgroundImage.src = spriteImage;

    player = new Fighter({
      position: { x: 150, y: 425 },
      velocity: { x: 0, y: 0 },
      offset: {
        x:0,
        y: 0
      },
      imageSrc: {
        IdleImage,
        frameMax: 5,
        scale: 2.5,
        offset: {
          x:215,
          y:157
        },
      },
      sprites: {
        idle: {
          imageSrc: IdleImage,
      frameMax: 5,

        },
        run: {
          imageSrc: RunImage,
          frameMax: 5,
        },
      },
    });

    enemy = new Sprite({
      position: { x: 650, y: 425 },
      velocity: { x: 0, y: 0 },
      offset: {
        x:0,
        y:0
      },
      imageSrc: {
        IdleImage,
        frameMax: 5,
        scale: 2.5,
        offset: {
          x:215,
          y:157
        },
      },
      sprites: {
        idle: {
          imageSrc: IdleImage,
      frameMax: 5,

        },
        run: {
          imageSrc: RunImage,
          frameMax: 5,
        },
      },
      // color: 'blue'

    });

    backgroundImage.onload = () => {
      // Draw the background image
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      // Draw the initial sprites
      player.draw(ctx);
      enemy.draw(ctx);
    };

    // Event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    function handleKeyDown(event) {
      switch (event.key) {
        case 'd':
          keys.d.pressed = true;
          lastkey = 'd';
          break;
        case 'a':
          keys.a.pressed = true;
          lastkey = 'a';
          break;
          case ' ':
            player.attack()  
            break;
        case 'ArrowRight':
          keys.ArrowRight.pressed = true;
          enemy.lastkey = 'ArrowRight';
          break;
          case 'ArrowLeft':
          keys.ArrowLeft.pressed = true;
          enemy.lastkey = 'ArrowLeft';
          break;
          case 'ArrowDown':
            enemy.isAttacking = true;
            break
      }
    }

    function handleKeyUp(event) {
      switch (event.key) {
        case 'd':
          keys.d.pressed = false;
          break;
        case 'a':
          keys.a.pressed = false;
          break;
        case 'ArrowRight':
          keys.ArrowRight.pressed = false;
          enemy.lastkey = 'ArrowRight';
          break;
          case 'ArrowLeft':
          keys.ArrowLeft.pressed = false;
          enemy.lastkey = 'ArrowLeft';
          break;
      }
    }

    
    
  //   function decreaseTimer() {
  //     if (timer > 0) {
  //       setTimeout(() => {
  //         timer--;
  //         document.querySelector('#timer').innerHTML = timer;
  //         decreaseTimer(); // Call itself for the next second
  //       }, 1000);
  //     }
      
  //     if (timer === 0){
  //       determineWinner({ player, enemy });
  //   }
  // }
  function decreaseTimer() {
    if (timer > 0 && player.health > 0 && enemy.health > 0) {
      timerId = setTimeout(() => {
        timer--;
        document.querySelector('#timer').innerHTML = timer;
        decreaseTimer(); // Call itself for the next second
      }, 1000);
    }
  
    if (player.health <= 0 || enemy.health <= 0) {
      determineWinner({ player, enemy, timerId });
    }
  }
  
    decreaseTimer(); // Start the countdown

  }, []);

  const gravity = 0.007;

  // class Sprite {
  //   constructor({ position, velocity,color = 'red', offset= { x: 0, y: 0 } }) {
  //     this.position = position;
  //     this.velocity = velocity;
  //     this.height = 150;
  //     this.width = 50;
  //     this.attackbox = {
  //       position: {
  //         x:this.position.x,
  //         y:this.position.y
  //       },
  //       offset,
        
  //       width: 100 ,
  //       height: 50
  //     }
  //     this.isAttacking = '';
  //     this.color = color;
  //     this.health = 100
  //   }
  class Fighter {
    constructor({ position, velocity,color = 'red', offset= { x: 0, y: 0 }, imageSrc, scale = 5, frameMax = 1, sprites}) {
      this.position = position;
      this.velocity = velocity;
      this.height = 250;
      this.width = 200;
      this.image = new Image();
      this.image.src =  IdleImage;
     
      this.scale = scale;
      this.frameMax = frameMax;
      this.framesCurrent = 5;
      this.frameElapsed = 0;
      this.framesHold = 1;
     this.sprites = sprites;
     for( const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
     }
      this.attackbox = {
        position: {
          x:this.position.x,
          y:this.position.y
        },
        offset,
        
        width: 150 ,
        height: 10
      }
      this.isAttacking = '';
      this.color = color;
      this.health = 100
    }
    
    draw(ctx) {
      if (this.image.complete) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
      }
      // ctx.fillStyle = this.color;
      // ctx.fillRect(this.position.x, this.position.y, 50, this.height);
      //attack box
      if (this.isAttacking) {

      
      ctx.fillStyle = 'green';
      ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y , this.attackbox.width , this.attackbox.height)
    }
  }
  animateFrames() {
    this.frameElapsed++;
if (this.frameElapsed % this.framesHold === 0) {
  if (this.framesCurrent < this.framesMax - 1) {
    this.framesCurrent++
  }
  else {
    this.framesCurrent = 0
  }
}
  }

    update(ctx) {
      this.attackbox.position.x = this.position.x - this.attackbox.offset.x;
      this.attackbox.position.y = this.position.y;
      
this.animateFrames();
  
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      if (this.position.y + this.height >= ctx.height) {
        this.velocity.y = 0;
        this.position.y = ctx.height - this.height;
      } else {
        this.velocity.y += gravity;
      }
    }
      attack() {
        this.isAttacking = true
        setTimeout(() => {
          this.isAttacking = false
        }, 100
        );
        
      
    }
  }

    class Sprite {
      constructor({ position, velocity,color = 'red', offset= { x: 0, y: 0 }, imageSrc, scale = 5, frameMax = 1 }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 250;
        this.width = 200;
        this.image1 = new Image();
        this.image1.src =  IdleImage1;
        this.scale = scale;
        this.frameMax = frameMax;
        this.framesCurrent = 5;
        this.frameElapsed = 0;
        this.framesHold = 1;
        // this.sprites = sprites;
        // for( const sprite in this.sprites) {
        //  sprites[sprite].image = new Image();
        //  sprites[sprite].image.src = sprites[sprite].imageSrc;
        // }
       
        this.attackbox = {
          position: {
            x:this.position.x,
            y:this.position.y
          },
          offset,
          
          width: 150 ,
          height: 10
        }
        this.isAttacking = '';
        this.color = color;
        this.health = 100
      }
  
      draw(ctx) {
        if (this.image1.complete) {
          ctx.drawImage(this.image1, this.position.x, this.position.y, this.width, this.height);
        }
        // ctx.fillStyle = this.color;
        // ctx.fillRect(this.position.x, this.position.y, 50, this.height);
        //attack box
        if (this.isAttacking) {
  
        
        ctx.fillStyle = 'green';
        ctx.fillRect(this.attackbox.position.x, this.attackbox.position.y , this.attackbox.width , this.attackbox.height)
      }
    }
    animateFrames() {
      this.frameElapsed++;
  if (this.frameElapsed % this.framesHold === 0) {
    if (this.framesCurrent < this.framesMax - 1) {
      this.framesCurrent++
    }
    else {
      this.framesCurrent = 0
    }
  }
    }
  
      update(ctx) {
        this.attackbox.position.x = this.position.x - this.attackbox.offset.x;
        this.attackbox.position.y = this.position.y;
  this.animateFrames();
    
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.position.y + this.height >= ctx.height) {
          this.velocity.y = 0;
          this.position.y = ctx.height - this.height;
        } else {
          this.velocity.y += gravity;
        }
      }
        attack() {
          this.isAttacking = true
          setTimeout(() => {
            this.isAttacking = false
          }, 100
          );
          
        
      }
    }
  
  function rectangularCollision({rectangle1, rectangle2}) {
    return (
      rectangle1.attackbox.position.x + rectangle1.attackbox.width >= 
      rectangle2.position.x && rectangle1.attackbox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackbox.position.y + rectangle1.attackbox.height >= rectangle2.position.y
        && rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height

    );
  }
 

  function animate() {
    const canvas = canvasRef.current;

     if (canvas && player && enemy) {
      const ctx = canvas.getContext('2d');

      // Clear the canvas
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the background image
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      // Update and draw the sprites
      player.update(canvas);
      player.draw(ctx);

      enemy.update(canvas);
      enemy.draw(ctx);

      player.velocity.x = 0;
      enemy.velocity.x = 0;
   
      player.image = player.sprites.idle.image;
    
      if (keys.a.pressed && lastkey === 'a') {
        player.velocity.x = -5;
        player.image = player.sprites.run.image;
      } else if (keys.d.pressed && lastkey === 'd') {
        player.velocity.x = 5;
        player.image = player.sprites.run.image;
      }
      
      if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft') {
        enemy.velocity.x = -5;
      } else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight') {
        enemy.velocity.x = 5;
      }
      // detect for collision
      if (rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
      }) &&
        player.isAttacking) {
          player.isAttacking = false
          enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        console.log('go');
      }
      
      if (rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
      }) &&
        enemy.isAttacking) {
          enemy.isAttacking = false
          player.health -= 20
            document.querySelector('#playerHealth').style.width = player.health + '%'
        console.log('enemy attack successful');
      }
    
      // end game based on health
      if(player.health <= 0 || player.health <=0) {
        determineWinner({ player, enemy, timerId });
      }
    
    }
    
    window.requestAnimationFrame(animate);
  }

  useEffect(() => {
    animate(); // Start the animation loop after the initial render
  }, []);


return (
  <div style={{ position: 'relative', display: 'inline-block' }}>
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {/* Player Health Bar */}
      <div style={{ position: 'relative', height: '30px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ backgroundColor: 'blue', height: '30px', width: '100%' }}></div>
        <div
          id="playerHealth"
          style={{
            position: 'absolute',
            background: 'lightblue',
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
          }}
        ></div>
      </div>

      {/* Timer */}
      <div
      id = "timer"
       style={{ 
        backgroundColor: 'yellow', 
        width: '100px', 
        height: '100px', 
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}
      >
        {timer}
      </div>

      {/* Enemy Health Bar */}
      <div style={{ position: 'relative', height: '30px', width: '100%' }}>
        <div style={{ backgroundColor: 'blue', height: '30px' }}></div>
        <div
          id="enemyHealth"
          style={{
            position: 'absolute',
            background: 'lightblue',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        ></div>
      </div>
      <div></div>
    </div>
    <div
    id="displayText"
     style={{
      position: 'absolute', 
      color: 'yellow',
      alignItems: 'center', 
      justifyContent:'center',
      top: 0,
      right : 0,
      bottom : 0,
      left: 0,
      display: 'none'
      }}>Tie
      </div>
    <canvas ref={canvasRef} style={{ boxSizing: 'border-box' }} {...props} />
  </div>
);
};

export default Canvas;