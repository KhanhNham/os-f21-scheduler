import Heap from "../util/Heap";

class SJF {
  constructor(listOfTasks) {
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

    // for (var j =0; j < this.tasks.length; j++) {
    //   console.log("enqueuingTime: " + this.tasks[j].enqueueTime + " processingTime: " + this.tasks[j].processingTime + " id: " + this.tasks[j].id);
    // }
  
    return result;
    }
}

export default SJF;
