import React from "react";
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

export default function Graphics(props) {
  var x = props.startX;
  const drawRect = (x, y, width, height, color, id) => <Rect key={id} x={x} y={y} width={width} height={height} fill={color}/>

  const drawOneProcess = (process) => {
    var prev = x;
    x += process.processingTime;
    return drawRect(prev, props.y, process.processingTime, props.height, process.color, process.id);
  }
  

  const drawAllProcesses = () => {
    return props.res.map(process => {
      return drawOneProcess(process);
      
    })
  }
  
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {/* <Text text="Some text on canvas" fontSize={15} /> */}
        {drawAllProcesses()}
      </Layer>
    </Stage>
  );
}