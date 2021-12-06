import React from "react";
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

export default function Graphics(props) {
  var x = props.startX;
  var count = 0;
  // const drawRect = (x, y, width, height, color, id) => <Rect key={id} x={x} y={y} width={width} height={height} fill={color}/>

  // const drawOneProcess = (process) => {
  //   var prev = x;
  //   x += process.processingTime;
  //   return drawRect(prev, props.y, process.processingTime, props.height, process.color, process.id);
  // }

  const drawRect = (x, y, width, height, color) => <Rect key={count} x={x} y={y} width={width} height={height} fill={color}/>

  const drawOneProcess = (process) => {
    if (props.scheduler === "RR") {
      return drawRect(x+count, props.y, 1, props.height, props.map.get(process));
    } else if (props.scheduler === "SJF") {
      var prev = x;
      x += process.processingTime;
      return drawRect(prev, props.y, process.processingTime, props.height, process.color);
    }
    
  }
  
  const drawAllProcesses = () => {
    return props.res.map(process => {
      count++;
      return drawOneProcess(process);
    })
  }
  
  return (
    <Stage width={window.innerWidth} height={200}>
      <Layer>
        {/* <Text text="Some text on canvas" fontSize={15} /> */}
        {drawAllProcesses()}
      </Layer>
    </Stage>
  );
}