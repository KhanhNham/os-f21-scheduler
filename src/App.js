import './App.css';
import React from "react";
import Main from './components/Main';
import Graphics from './components/Graphics';
import RoundRobin from './scheduler/rr-sim';

function App() {
  let roundRobin = new RoundRobin();
  let res = roundRobin.simulate();

  return (
    <>
      <Main/>
      <Graphics res={res} startX={100} y={100} height={50}/>
    </>
  );
}

export default App;
