import Heap from "../util/Heap";

class Process {
  Process(enqueueTime, processingTime) {
    this.enqueueTime = enqueueTime;
    this.processingTime = processingTime;
  }

  getEnqueueTime() {
    return this.enqueueTime;
  }
  getProcessingTime() {
    return this.processingTime;
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
      {id: 1, enqueueTime: 1, processingTime: 20, color: "red"},
      {id: 2, enqueueTime: 2, processingTime: 40, color: "blue"},
      {id: 3, enqueueTime: 3, processingTime: 20, color: "green"},
      {id: 4, enqueueTime: 4, processingTime: 10, color: "black"},
    ];

    const minHeap = new Heap((a, b) => a.processingTime < b.processingTime);
      
    tasks.sort((a, b) => a.enqueueTime != b.enqueueTime ? a.enqueueTime - b.enqueueTime : a.processingTime != b.processingTime
      ? a.processingTime - b.processingTime : a.id - b.id);
      
    const result = [];
    let time = 0;
    let i = 0;
    while (i < tasks.length || minHeap.size()) {
        if (i < tasks.length && minHeap.size() === 0) {
            time = Math.max(time, tasks[i].enqueueTime);
        }
        while (i < tasks.length && tasks[i].enqueueTime <= time) {
            minHeap.push(tasks[i]);
            i++;
        }
        
        const process = minHeap.pop();
        time += process.processingTime;
        result.push(process)
    }
  
    return result;
    }
}

export default RoundRobin;
