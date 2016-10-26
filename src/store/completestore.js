import { EventEmitter } from 'events'
import dispatcher from '../dispatcher/dispatcher'
import { ACTION, ORIENTATION, BLACK_CELL_PLACEHOLDER, DIRECTION } from '../constants'

class CompleteStore extends EventEmitter {
  constructor() {

  }

  handleActions(action) {
    console.log(action);
  }
}

const completeStore = new CompleteStore
dispatcher.register(completeStore.handleActions.bind(completeStore))

window.completeStore = completeStore
export default completeStore
