import { EventEmitter } from 'events'

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

  addWord(word={word: '', clue: ''}) {
    this.words.push({
      number: this.nextNumber(),
      word: word.word,
      clue: word.clue
    })
    this.emit('change')
  }

  nextNumber() {
    return this.words
            .map((w) => w.number)
            .reduce((t, c) => t < c ? c : t)
             + 1
  }

  getAllWords() {
    return this.words
  }
}

const crosswordStore = new CrosswordStore
window.crosswordStore = crosswordStore
export default crosswordStore
