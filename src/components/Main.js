import React from "react";
import RoundRobin from "../rr-sim";


function runSimulation() {
  let roundRobin = new RoundRobin();
  let res = roundRobin.simulate();
  return (
    <>
      <p>Test</p>
      {/* {
        res.map(process => {
          return <p>enqueueTime {process.enqueuingTime} processingTime {process.enqueuingTime}</p>
        })
      } */}
    </>
  )
}
export default function Main() {

  return (
    <>
      <h1>Hello :)</h1>
      {runSimulation()}
    </>
    
  )
}