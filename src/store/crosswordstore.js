import { EventEmitter } from 'events'
import dispatcher from '../dispatcher/dispatcher'
import { ACTION } from '../constants'

class CrosswordStore extends EventEmitter {
  constructor() {
    super()

    this.words = [
      {
        number: 1,
        word: 'hello',
        clue: 'A friendly greeting'
      }, {
        number: 2,
        word: 'world',
        clue: 'Also known as Earth'
      }, {
        number: 3,
        word: 'children',
        clue: 'Miniature people'
      }, {
        number: 4,
        word: 'doing',
        clue: 'Taking action'
      }, {
        number: 5,
        word: 'today',
        clue: 'The present'
      }, {
        number: 6,
        word: 'friend',
        clue: 'A family member you can pick'
      }
    ]
  }

  addWord(word={word:'',clue:''}) {
    this.words.push({
      number: this.nextNumber(),
      word: word.word,
      clue: word.clue
    })
    this.emit('change')
  }

  nextNumber() {
    if(this.words.length === 0) {
      return 1
    }
    return this.words
            .map((w) => w.number)
            .reduce((t, c) => t < c ? c : t)
             + 1
  }

  removeWord(number) {
    this.words = this.words
                  .filter((w) => w.number !== number)
                  .map((w, i) => {
                    return {
                      number: i + 1,
                      word: w.word,
                      clue: w.clue
                    }
                  })
    if(this.words.length === 0) {
      this.addWord()
    }
    this.emit('change')
  }

  updateWord(word) {
    this.words = this.words
                  .map((w) => {
                    return w.number !== word.number ? w : {
                      number: word.number,
                      word: word.word,
                      clue: word.clue
                    }
                  })
    this.emit('change')
  }

  getAllWords() {
    return this.words
  }

  handleActions(action) {
    switch (action.type) {
      case ACTION.ADD_WORD:
        this.addWord(action.word)
        break
      case ACTION.REMOVE_WORD:
        this.removeWord(action.number)
        break
      case ACTION.UPDATE_WORD:
        this.updateWord(action.number, action.word)
        break
    }
  }
}

const crosswordStore = new CrosswordStore
dispatcher.register(crosswordStore.handleActions.bind(crosswordStore))

window.crosswordStore = crosswordStore
window.dispatcher = dispatcher
export default crosswordStore
