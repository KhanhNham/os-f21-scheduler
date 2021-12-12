import Queue from "../util/Queue";

export class MLFQ {
  constructor(listOfTasks, listOfQuantums, listOfAllotments) {
    this.tasks = listOfTasks;
    this.listOfQuantums = listOfQuantums;
    this.tasksForEachQueue = [];
    this.numQueues = listOfQuantums.length;
    for (var i =0; i < this.numQueues; i++) {
      this.tasksForEachQueue.push(new Queue());
    }
    this.result = [];
    this.incomingTasks = new Queue();
    this.currQueue = null;
    this.complete = [];
    this.time = 0;
    this.runningTasks = null;
    this.quantum = 0;
    this.currRank = 0;
    this.lastEnqueueTime = 0;
    this.listOfAllotments = listOfAllotments;
    this.timeLeft = 0;
    this.ctr = 0;
  }

  simulate() {
    console.log("Hey" + this.listOfAllotments);
    for (var i =0; i < this.tasks.length; i++) {
      this.complete[this.tasks[i].id] = false;
    }  
    this.tasks.sort((a, b) => a.enqueueTime - b.enqueueTime);
    this.lastEnqueueTime = this.tasks[this.tasks.length-1].enqueueTime;

    this.tasks.map(p => this.incomingTasks.enqueue(p));
    this.time = this.incomingTasks.peek().enqueueTime;
    
    this.runningTasks = this.tasksForEachQueue[this.currRank];
    while (!this.incomingTasks.isEmpty() && this.incomingTasks.peek().enqueueTime <= this.time) {
      this.runningTasks.enqueue(this.incomingTasks.dequeue());
    }
    this.quantum = this.listOfQuantums[this.currRank];
    this.timeLeft = this.listOfAllotments[this.currRank];
    
    while (!this.runningTasks.isEmpty()) {
      // console.log("Running...");
      // var ctr = 0;
      this.ctr = 0;
      while (this.ctr < this.quantum && this.timeLeft > 0 && !this.runningTasks.isEmpty() && this.runningTasks.peek().processingTime > 0 ) {
        this.runningTasks.peek().processingTime -= 1;
        this.result.push({queue: this.currRank, id: this.runningTasks.peek().id});
        // console.log("Running tasks in loop is " + this.runningTasks.printQueue());
        // console.log("Quantum is in loop is " + this.quantum);
        this.time += 1;
        this.timeLeft -= 1;
        this.ctr++;
        this.checkNewArrival();
      }
      console.log("time left " + this.timeLeft + " rank " + this.currRank + " this.ctr " + this.ctr);
      this.queueMaintainence();
      
      var count = 0;
      while (this.timeLeft === 0 || (this.runningTasks.isEmpty() && count < this.numQueues)) {
        //move to the next queue
        this.currRank += 1;
        if (this.currRank == this.numQueues) {
          this.currRank = 0;
        }
        this.runningTasks = this.tasksForEachQueue[this.currRank];
        this.quantum = this.listOfQuantums[this.currRank];
        this.timeLeft = this.listOfAllotments[this.currRank];
        count += 1;
      }

      if (this.runningTasks.isEmpty()) {
        this.runningTasks = this.tasksForEachQueue[0];
        this.quantum = this.listOfQuantums[0];
        while (this.runningTasks.isEmpty() && this.time <= this.lastEnqueueTime) {
          this.time++;
          this.checkNewArrival();
        }
      }
    }
    
    console.log("Done");
    console.log(this.result);
    return this.result;
  }

  checkNewArrival() {
    while (!this.incomingTasks.isEmpty() && this.incomingTasks.peek().enqueueTime <= this.time) {
      // console.log("adding " + this.incomingTasks.peek().id);
      this.tasksForEachQueue[0].enqueue(this.incomingTasks.dequeue());
    }
  }

  queueMaintainence() {
    var top = this.runningTasks.dequeue();
    // console.log("top processing time " + top.processingTime);
    if (top.processingTime > 0) {
      var nextRank = this.currRank < this.numQueues-1 ? this.currRank + 1 : -1;
      if (nextRank !== -1 && this.ctr === this.quantum) {
        this.tasksForEachQueue[nextRank].enqueue(top);
      } else {
        this.runningTasks.enqueue(top);
      }
    }
  }

}