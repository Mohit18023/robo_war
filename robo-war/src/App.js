import logo from './logo.svg';
import './App.css';
import './index.css';
import Login from './LogIn.jsx';
import Main from './Main.jsx';
import { Text } from "@chakra-ui/react"
import robo from "./robo.jpg"
import Game from './Game.jsx'
import lightgreenblue from "./lightgreenblue.png"
import RobotFace from './RobotFace.jsx';
import Playground from './Playground.jsx';
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom';

function App() {
  return (
    <div className="gradient-background" >
      <div
            class = "image"
            style = {{
            
               height: "100vh",
               width: "100vw",
              //  backgroundImage: `url(${lightgreenblue})`,
              // //  backgroundImage:
              // //  'url("https://th.bing.com/th/id/OIP.gXZ69lTKaHxWM4frZDPtAQHaEK?w=276&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7")',
              // //  'url("https://cdn.suwalls.com/wallpapers/fantasy/cyberpunk-metropolis-30098-1920x1080.jpg")',
              // //  'url("C:\Users\Meenal Jain\Desktop\robo_war\robo-war\public\robo.jpg")',
              // //  'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgmsFfdrW5ulZoWXdt0-V9LVC-qVaBWz02vvcv6qTq1OFX1Mfc6lMJhG-OnpMRWQHttUY&usqp=CAU")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
               Color : "white",
            }}
         >
        <div class="customText">
        {/* <link rel="preconnect" href="https://fonts.googleapis.com"></link> */}
        <link href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Black+Ops+One&family=Blaka+Ink&family=Bungee+Spice&family=Foldit&family=Rubik+Iso&family=Teko:wght@300&display=swap" rel="stylesheet"></link>
        <Text
        fontSize="6xl"
  fontWeight="medium"
>ROBOWAR
</Text>
<Text
  fontSize="2xl"
  fontWeight="bold"
>A Multiplayer  Game
</Text> 

{/* <Text
  fontSize="6xl"
  fontWeight="medium"
>Main Menu
</Text> */}
</div>
   
    {/* <Main />   */}
   <Login />
   
{/* <Game /> */}
{/* <RobotFace /> */}

    </div>
    {/* <Router>
    <nav>
        <ul>
          <li>
            <Link to="/">Game</Link>
          </li>
          <li>
            <Link to="/playground">Playground</Link>
          </li>
        </ul>
      </nav>
      <Routes>
      <Route path="/" exact component={Game} />
      <Route path="/playground" component={Playground} />
      </Routes>
      </Router> */}

    </div>  
  );
}

export default App;