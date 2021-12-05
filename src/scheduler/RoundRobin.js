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

class RoundRobin {
  
  constructor(numTasks, listOfTasks) {
    this.numTasks = numTasks;
    this.tasks = listOfTasks;
  };

  simulate() {
    const minHeap = new Heap((a, b) => a.processingTime < b.processingTime);
      
    this.tasks.sort((a, b) => a.enqueueTime != b.enqueueTime ? a.enqueueTime - b.enqueueTime : a.processingTime != b.processingTime
      ? a.processingTime - b.processingTime : a.id - b.id);
    

    const result = [];
    let time = 0;
    let i = 0;
    while (i < this.tasks.length || minHeap.size()) {
        if (i < this.tasks.length && minHeap.size() === 0) {
            time = Math.max(time, this.tasks[i].enqueueTime);
        }
        while (i < this.tasks.length && this.tasks[i].enqueueTime <= time) {
            minHeap.push(this.tasks[i]);
            i++;
        }
        
        const process = minHeap.pop();
        time += process.processingTime;
        result.push(process)
    }
  
    return this.tasks;
    }
}

export default RoundRobin;