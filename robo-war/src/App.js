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
    <div className="App">
      <h1>this is changed</h1>
    <p>this is paragraph</p>
    <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
    Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
            Meenal
            </a>
            </header>
    </div>
  );
}

export default App;