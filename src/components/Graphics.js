import React from "react";
import { Stage, Layer, Rect, Text, Group } from 'react-konva';

export default function Graphics(props) {
  var x = props.startX;
  var count = 0;

  const drawRect = (x, y, width, height, color) => <Rect key={count} x={x} y={y} width={width} height={height} fill={color}/>

  const drawOneProcess = (process) => {
    if (props.scheduler === "SJF" ) {
      var prev = x;
      x += process.processingTime;
      return drawRect(prev, props.y, process.processingTime, props.height, process.color);
      
    } else {
      return drawRect(x+count, props.y, 1, props.height, props.colorMap.get(process));
    }
    
  }
  
  const drawAllProcesses = () => {
    return props.res.map(process => {
      count++;
      return drawOneProcess(process);
    })
  }

  const drawIndexTable = () => {
    var y = props.y + props.height + 50;
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
          <Rect x={rectX} y={y} width={20} height={20} fill={p.color}/>
          <Text x={rectX + 30} y={y} text={"P"+p.id} fontSize={15} />
        </Group>
      )
    })
  }
  
  
  return (
    <Stage width={window.innerWidth} height={200}>
      <Layer>
        {drawAllProcesses()}
        {drawIndexTable()}
      </Layer>
    </Stage>
  );
}