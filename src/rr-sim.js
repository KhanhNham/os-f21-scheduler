import Heap from "./util/Heap";

class Process {
  enqueueTime;
  processingTime;

  Process(enqueueTime, processingTime) {
    this.enqueueTime = enqueueTime;
    this.processingTime = processingTime;
  }
}

function sortByProcessingTime(heap) {
  heap.sort((a,b) => a.processingTime - b.processingTime);
}

function sortByEnqueuingTime(heap) {
  heap.sort((a,b) => a.enqueueTime - b.enqueueTime);
}

class RoundRobin {
  constructor() {

  };

  simulate() {
    let tasks = [
      new Process(1, 2),
      new Process(2, 4),
      new Process(3, 2),
      new Process(4, 1)
    ];
    const minHeap = new Heap((a, b) => a.processingTime < b.processingTime);
      
    
    tasks.sort((a, b) => a.enqueueTime != b.enqueueTime 
      ? a.enqueueTime - b.enqueueTime : a.processingTime - b.processingTime)
      
    const result = [];
    let time = 0;
    let i = 0;
    while (i < tasks.length || minHeap.size()) {
        if (i < tasks.length && minHeap.size() === 0) {
            time = Math.max(time, tasks[i][0])
        }
        while (i < tasks.length && tasks[i][0] <= time) {
            minHeap.push(tasks[i]);
            i++;
        }
        const process = minHeap.pop();
        time += process.processingTime
        result.push(process)
        console.log(process.enqueueTime);
    }
    return result;
    }
}

export default RoundRobin;
