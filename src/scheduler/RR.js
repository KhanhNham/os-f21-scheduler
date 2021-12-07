import Queue from "../util/Queue";

export class RoundRobin {
  constructor(listOfTasks, quantum) {
    this.tasks = listOfTasks;
    this.quantum = quantum;
    this.time = 0;
    this.n = listOfTasks.length;
    this.queue = new Queue();
    this.wait = [];
    this.turn = [];
    this.arrival = [];
    this.inComingTasks = new Queue();
    this.tempBurst = [];
    this.complete = [];
    this.maxProccessIndex = 0;
    this.result = [];
  }

  
  simulate() {    
    this.tasks.sort((a, b) => a.enqueueTime - b.enqueueTime);
    this.tasks.map(p => this.inComingTasks.enqueue(p));
    this.tasks.map(p => this.arrival.push(p.enqueueTime));

    this.tasks.map(p => {
      // this.burst.push(p.processingTime);
      this.tempBurst.push(p.processingTime);
    });


    for (var i =0; i < this.tasks.length; i++) {
      this.complete[i] = false;
    }

    if (this.time < this.arrival[0]) {
      this.time = this.arrival[0];
    }
   
    this.queue.enqueue(1);

    while (true) {
      console.log("Running");
      if (this.checkIfAllDone()) {
        break;
      }

      while (!this.queue.isEmpty()) {
        var ctr = 0;
        while (ctr < this.quantum && (this.tempBurst[this.queue.peek()-1] > 0)) {
          this.tempBurst[this.queue.peek() - 1] -= 1;
          this.result.push(this.queue.peek()-1);
          console.log(this.queue.printQueue());
          this.time += 1;
          ctr++;
          this.checkNewArrival();
        }

        if ((this.tempBurst[this.queue.peek()-1] === 0) && (this.complete[this.queue.peek()-1] == false)) {
          this.turn[this.queue.peek()-1] = this.time;
          this.complete[this.queue.peek()-1] = true;
        }
          
        if(this.queue.isEmpty()){
          this.time++;
          this.checkNewArrival();
        }
        this.queueMaintainence();
      }
    }
    console.log("Done");
    return this.result;
  }

  checkIfAllDone() {
    var done = true;
      for (var i =0; i < this.n; i++) {
        if (this.tempBurst[i] !== 0) {
          done = false;
          break;
        }
      }
    return done;
  }

  checkNewArrival() {
    if(this.time <= this.arrival[this.n-1]){
      var newArrival = false;
      for(var j = (this.maxProccessIndex+1); j < this.n; j++){
          if(this.arrival[j] <= this.time){
              if(this.maxProccessIndex < j){
                  this.maxProccessIndex = j;
                  newArrival = true;
              }
          }
      }
      if(newArrival) {
        this.queue.enqueue(this.maxProccessIndex + 1);
      }      
    }
  }

  queueMaintainence() {
    var top = this.queue.dequeue();
    this.queue.enqueue(top);
  }
}