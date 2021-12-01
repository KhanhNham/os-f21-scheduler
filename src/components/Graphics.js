import React from "react";
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

export default function Graphics() {
  const drawRect = (x, y, width, height) => <Rect x={x} y={y} width={width} height={height} fill={'green'}/>

  const drawNRect = (num) => {
    for (let i =0; i < num; i++) {
      console.log("Drawing rect...");
      var x = Math.floor(Math.random() * 500) + 50;
      var y = Math.floor(Math.random() * 500) + 50;
      drawRect(x, y, 50, 50);
    }
  }
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Some text on canvas" fontSize={15} />
        <Rect x={50} y={50} width={50} height={50} fill={'green'}/>
        {/* {drawNRect(10)} */}
      </Layer>
    </Stage>
  );
}