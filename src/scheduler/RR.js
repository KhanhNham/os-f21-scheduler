export class RoundRobin {
  constructor(listOfTasks, quantum) {
    this.tasks = listOfTasks;
    this.quantum = quantum;
    this.time = 0;
    this.n = listOfTasks.length;
    this.queue = [];
    this.wait = [];
    this.turn = [];
    this.arrival = [];
    this.burst = [];
    this.tempBurst = [];
    this.complete = [];
    this.maxProccessIndex = 0;
    this.result = [];
  }

  
  simulate() {    
    // this.tasks.sort((a, b) => a.enqueueTime != b.enqueueTime ? a.enqueueTime - b.enqueueTime : a.processingTime != b.processingTime
    //   ? a.processingTime - b.processingTime : a.id - b.id);
    this.tasks.map(p => this.arrival.push(p.enqueueTime));

    this.tasks.map(p => {
      this.burst.push(p.processingTime);
      this.tempBurst.push(p.processingTime);
    });


    for (var i =0; i < this.tasks.length; i++) {
      this.complete[i] = false;
      this.queue[i] = 0;
    }

    if (this.time < this.arrival[0]) {
      this.time = this.arrival[0];
    }
   
    this.queue[0] = 1;
    console.log(this.arrival);
    console.log(this.burst);
    while (true) {
      console.log("Running");
      var done = true;
      for (var i =0; i < this.n; i++) {
        if (this.tempBurst[i] !== 0) {
          done = false;
          break;
        }
      }
      if (done) {
        break;
      }

      for (var i =0; i < this.n && (this.queue[i] !== 0); i++) {
        var ctr = 0;
        while (ctr < this.quantum && (this.tempBurst[this.queue[0]-1] > 0)) {
          this.tempBurst[this.queue[0] - 1] -= 1;
          this.result.push(this.queue[0]-1);
          this.time += 1;
          ctr++;
          this.checkNewArrival();
        }

        if ((this.tempBurst[this.queue[0]-1] === 0) && (this.complete[this.queue[0]-1] == false)) {
          this.turn[this.queue[0]-1] = this.time;
          this.complete[this.queue[0]-1] = true;
        }

        var idle = true;
        if(this.queue[this.n-1] === 0){
            for(var k = 0; k < this.n && this.queue[k] !== 0; k++){
                if(this.complete[this.queue[k]-1] == false){
                    idle = false;
                }
            }
        } else {
          idle = false;
        }
          
        if(idle){
          this.time++;
          this.checkNewArrival();
        }
        this.queueMaintainence();
      }
    }
    console.log("Done");
    return this.result;
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
        this.queueUpdation();  
      }      
    }
  }

  queueUpdation() {
    var zeroIndex = -1;
      for(var i = 0; i < this.n; i++){
          if(this.queue[i] == 0){
              zeroIndex = i;
              break;
          }
      }
      if(zeroIndex == -1) {
        return;
      }
          
      this.queue[zeroIndex] = this.maxProccessIndex + 1;
  }

  queueMaintainence() {
    for(var i = 0; (i < this.n-1) && (this.queue[i+1] != 0) ; i++){
      var temp = this.queue[i];
      this.queue[i] = this.queue[i+1];
      this.queue[i+1] = temp;
    }
  }
}