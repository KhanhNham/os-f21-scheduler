import { EventEmitter } from "events";

const CHANGE_EVENT = 'change';
let input = [];

class Store extends EventEmitter {
  constructor() {
    super();
    this.input = [];
    this.loadingStatus = "UNDEFINED";
    this.quantum = 0;
    this.numQueues = 0;
    this.listOfQuantum = [];
    this.windowHeight = window.innerHeight;
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getInput() {
    return this.input;
  }

  getNumInput() {
    return this.input.length;
  }

  getQuantum() {
    return this.quantum;
  }

  getListOfQuantum() {
    return this.listOfQuantum;
  }

  getWindowHeight() {
    return this.windowHeight;
  }

  setInput(input) {
    this.input = input;
  }
  
  setQuantum(quantum) {
    this.quantum = quantum;
  }
  
  setListOfQuantum(listOfQuantum) {
    this.listOfQuantum = listOfQuantum;
  }

  setWindowHeight(height) {
    this.windowHeight = height;
  }
}

export const InputStore = new Store();
