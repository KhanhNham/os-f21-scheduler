import { EventEmitter } from "events";

const CHANGE_EVENT = 'change';
let input = [];

class Store extends EventEmitter {
  constructor() {
    super();
    this.input = [];
    this.loadingStatus = "UNDEFINED";
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

  setInput(input) {
    this.input = input;
  }
}

export const InputStore = new Store();
