import Queue from "../util/Queue";

export class RoundRobin {
  constructor(listOfTasks, quantum) {
    this.tasks = listOfTasks;
    this.quantum = quantum;
    this.time = 0;
    this.queue = new Queue();
    this.incomingTasks = new Queue();
    this.complete = [];
    this.result = [];
  }

  
  simulate() {  
    for (var i =0; i < this.tasks.length; i++) {
      this.complete[this.tasks[i].id] = false;
    }  
    this.tasks.sort((a, b) => a.enqueueTime - b.enqueueTime);
    this.tasks.map(p => this.incomingTasks.enqueue(p));

    this.time = this.incomingTasks.peek().enqueueTime;

    this.queue.enqueue(this.incomingTasks.dequeue());

    while (!this.queue.isEmpty()) {
      var ctr = 0;
      // console.log(this.queue.printQueue());
      while (ctr < this.quantum && (this.queue.peek().processingTime > 0)) {
        this.queue.peek().processingTime -= 1;
        this.result.push(this.queue.peek().id);
        this.time += 1;
        ctr++;
        this.checkNewArrival();
      }

      if ((this.queue.peek().processingTime === 0) && (this.complete[this.queue.peek().id] == false)) {
        this.complete[this.queue.peek().id] = true;
      }
        
      if(this.queue.isEmpty()){
        this.time++;
        this.checkNewArrival();
      }
      this.queueMaintainence();
    }
    
    console.log("Done");
    return this.result;
  }

  checkNewArrival() {
    if (!this.incomingTasks.isEmpty()) {
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