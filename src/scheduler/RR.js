import Queue from "../util/Queue";

export class RoundRobin {
  constructor(listOfTasks, quantum) {
    this.tasks = listOfTasks;
    this.quantum = quantum;
    this.time = 0;
    this.queue = new Queue();
    this.incomingTasks = new Queue();
    this.result = [];
    this.lastEnqueueTime =0;
  }

  
  simulate() {  
    this.tasks.sort((a, b) => a.enqueueTime - b.enqueueTime);
    this.lastEnqueueTime = this.tasks[this.tasks.length-1].enqueueTime;
    this.tasks.map(p => this.incomingTasks.enqueue(p));

    this.time = this.incomingTasks.peek().enqueueTime;

    this.queue.enqueue(this.incomingTasks.dequeue());

    while (!this.queue.isEmpty()) {
      var ctr = 0;
      while (ctr < this.quantum && (this.queue.peek().processingTime > 0)) {
        this.checkNewArrival();
        this.queue.peek().processingTime -= 1;
        this.result.push(this.queue.peek().id);
        this.time += 1;
        ctr++;
      }
        
      this.queueMaintainence();
      this.checkNewArrival();
      while (this.queue.isEmpty() && this.time <= this.lastEnqueueTime){
        this.time += 1;
        this.checkNewArrival();
      }
    }
    console.log(this.result);
    console.log("Done");
    return this.result;
  }

  checkNewArrival() {
    while (!this.incomingTasks.isEmpty() && this.incomingTasks.peek().enqueueTime <= this.time) {
      this.queue.enqueue(this.incomingTasks.dequeue());
    }
  }

  queueMaintainence() {
    var top = this.queue.dequeue();
    if (top.processingTime !== 0) {
      this.queue.enqueue(top);
    }
  }
}