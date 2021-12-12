import React from "react";
import { Stage, Layer, Rect, Text, Group } from 'react-konva';

export default function Graphics(props) {
  var x = props.startX;
  var count = 0;

  const drawRect = (x, y, width, height, color) => <Rect key={count} x={x} y={y} width={width} height={height} fill={color}/>

  const drawOneProcess = (process, y) => {
    if (props.scheduler === "SJF" ) {
      var prev = x;
      x += process.processingTime;
      return drawRect(prev, y, process.processingTime, props.height, process.color);
    } else if (props.scheduler === "RR") {
      return drawRect(x+count, y, 1, props.height, props.colorMap.get(process));
    } else {
      return drawRect(x+count, y+(props.height * process.queue), 1, props.height, props.colorMap.get(process.id));
    }
    
  }
  
  const drawAllProcesses = () => {
    var y = props.y + 80;
    return props.res.map(process => {
      count++;
      return drawOneProcess(process, y);
    })
  }

  const drawIndexTable = () => {
    var tempX = props.startX;
    var pairs = [];
    props.colorMap.forEach((color, id) => {
      pairs.push(
        {id: id, color: color}
      );
    });
    return pairs.map(p => {
      var rectX = tempX;
      tempX += 100;
      return (
        <Group>
          <Rect x={rectX} y={props.y} width={20} height={20} fill={p.color}/>
          <Text x={rectX + 30} y={props.y} text={"P"+p.id} fontSize={15} />
        </Group>
      )
    })
  }
  
  
  return (
    <Stage width={window.innerWidth} height={props.windowHeight}>
      <Layer>
        {drawIndexTable()}
        {drawAllProcesses()}
      </Layer>
    </Stage>    
  );
}