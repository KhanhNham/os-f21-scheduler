import { createSecurePair } from "tls";

const PROCESSING_TIME_UPPER_BOUND = 10;
const ENQUEUE_TIME_SCALE = 5;
const SCALE = 10;

export const generateColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

export const getListOfColors = (numTasks) => {
  let colorLs = [];
  var i =0;
  while (i < numTasks) {
    var color = generateColor();
    if (!colorLs.includes(color)) {
      colorLs.push(color);
      i++;
    }
  }
  return colorLs;
}

export const generateTasks = (listOfTasks) => {
  let tasks = [];
  const numTasks = listOfTasks.length;
  const colorLs = getListOfColors(numTasks);

  for (var i =0; i < numTasks; i++) {
    const curr = listOfTasks[i];
    tasks.push(
      {id: i, enqueueTime: curr.enqueueTime, processingTime: curr.processingTime, color: colorLs[i]},
    );
  }
  return tasks;
}

// THIS IS USED FOR GENERATING TASKS ARBITRARILY
// export const generateTasks = (numTasks) => {
//   let tasks = [];
//   const maxEnqueueTime = numTasks;
//   const colorLs = getListOfColors(numTasks);
//   let prevEnqueueTime = 0;

//   for (var i =0; i < numTasks; i++) {
//     var processingTime = Math.floor(1 + Math.random()*PROCESSING_TIME_UPPER_BOUND) * SCALE;
//     var enqueueTime = prevEnqueueTime + Math.floor(Math.random() * maxEnqueueTime);
//     tasks.push(
//       {id: i, enqueueTime: enqueueTime, processingTime: processingTime, color: colorLs[i]},
//     );
//     prevEnqueueTime = enqueueTime;
//   }
//   return tasks;
// }
