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
    this.time = 0;
    this.runningTasks = null;
    this.quantum = 0;
    this.currRank = 0;
    this.lastEnqueueTime = 0;
    this.listOfAllotments = listOfAllotments;
    this.timeLeft = 0;
    // this.ctr = 0;
  }

  simulate() {
    this.tasks.sort((a, b) => a.enqueueTime - b.enqueueTime);
    this.lastEnqueueTime = this.tasks[this.tasks.length-1].enqueueTime;

    this.tasks.map(p => this.incomingTasks.enqueue(p));
    this.time = this.incomingTasks.peek().enqueueTime;
    
    this.runningTasks = this.tasksForEachQueue[this.currRank];
    while (!this.incomingTasks.isEmpty() && this.incomingTasks.peek().enqueueTime <= this.time) {
      this.runningTasks.enqueue(this.incomingTasks.dequeue());
    }
    this.quantum = this.listOfQuantums[this.currRank];
    // this.timeLeft = this.listOfAllotments[this.currRank];
    
    while (!this.runningTasks.isEmpty()) {
      var ctr =0;
      while (ctr < this.quantum && !this.runningTasks.isEmpty() && this.runningTasks.peek().processingTime > 0 ) {
        this.checkNewArrival();
        this.runningTasks.peek().processingTime -= 1;
        this.result.push({queue: this.currRank, id: this.runningTasks.peek().id});
        // console.log("Running tasks in loop is " + this.runningTasks.printQueue());
        // console.log("Quantum is in loop is " + this.quantum);
        this.time += 1;
        ctr++;
      }
      
      this.queueMaintainence();
      this.checkNewArrival();

      var count = 0;
      //move to the next queue if running out of time allotment or there is no task to run in this queue
      while (this.runningTasks.isEmpty() && count < this.numQueues) {
        this.currRank += 1;
        if (this.currRank == this.numQueues) {
          this.currRank = 0;
        }
        this.runningTasks = this.tasksForEachQueue[this.currRank];
        this.quantum = this.listOfQuantums[this.currRank];
        // this.timeLeft = this.listOfAllotments[this.currRank];
        count += 1;
      }

      //CPU is idle
      if (this.runningTasks.isEmpty()) {
        this.changeToHighestPriorityQueue();
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

  changeToHighestPriorityQueue() {
    this.currRank = 0;
    this.runningTasks = this.tasksForEachQueue[0];
    this.quantum = this.listOfQuantums[0];
    // this.timeLeft = this.listOfAllotments[0];
  }

  checkNewArrival() {
    var hasNewArrival = false;
    while (!this.incomingTasks.isEmpty() && this.incomingTasks.peek().enqueueTime <= this.time) {
      this.tasksForEachQueue[0].enqueue(this.incomingTasks.dequeue());
      hasNewArrival = true;
    }

    if (hasNewArrival && this.currRank !== 0) {
      this.changeToHighestPriorityQueue();
      this.ctr = 0;
    }
  }

  queueMaintainence() {
    var top = this.runningTasks.dequeue();
    if (top.processingTime > 0) {
      var nextRank = this.currRank < this.numQueues-1 ? this.currRank + 1 : -1;

      if (nextRank !== -1) {
        this.tasksForEachQueue[nextRank].enqueue(top);
      } else {
        this.runningTasks.enqueue(top);
      }
    }
  }
}
