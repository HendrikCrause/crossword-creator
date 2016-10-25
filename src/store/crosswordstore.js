import { EventEmitter } from 'events'
import dispatcher from '../dispatcher/dispatcher'
import { ACTION, ORIENTATION, BLACK_CELL_PLACEHOLDER, DIRECTION } from '../constants'
import utf8 from 'utf8'
import base64 from 'base-64'

// const puzzle = [
//   t o d a y _ _ _
//   _ _ o _ _ f _ _
//   c h i l d r e n
//   _ e n _ _ i _ _
//   _ l g _ _ e _ _
//   _ l _ _ _ n _ _
//   w o r l d d _ _
// ]


class CrosswordStore extends EventEmitter {
  constructor() {
    super()

    this.words = [
      {
        number: 1,
        word: 'hello',
        clue: 'A friendly greeting',
        orientation: ORIENTATION.VERTICAL,
        startCell: {
          row: 2,
          col: 1
        }
      }, {
        number: 2,
        word: 'world',
        clue: 'Also known as Earth',
        orientation: ORIENTATION.HORIZONTAL,
        startCell: {
          row: 6,
          col: 0
        }
      }, {
        number: 3,
        word: 'children',
        clue: 'Miniature people',
        orientation: ORIENTATION.HORIZONTAL,
        startCell: {
          row: 2,
          col: 0
        }
      }, {
        number: 4,
        word: 'doing',
        clue: 'Taking action',
        orientation: ORIENTATION.VERTICAL,
        startCell: {
          row: 0,
          col: 2
        }
      }, {
        number: 5,
        word: 'today',
        clue: 'The present',
        orientation: ORIENTATION.HORIZONTAL,
        startCell: {
          row: 0,
          col: 0
        }
      }, {
        number: 6,
        word: 'friend',
        clue: 'A family member you can pick',
        orientation: ORIENTATION.VERTICAL,
        startCell: {
          row: 1,
          col: 5
        }
      }
    ]

    this.currentGrid = this.makeGrid().map((row) => {
      return row.map((col) => {
        return col.char === BLACK_CELL_PLACEHOLDER ? col.char : ''
      })
    })
  }

  wordsAtCell(cell) {
    return this.words.filter((w) => {
      return Array.from(w.word)
        .map((char, i) => {
          let dir = this.directionForOrientation(w.orientation)
          return {
            row: w.startCell.row + dir.row * i,
            col: w.startCell.col + dir.col * i
          }
        })
        .filter((c) => c.row === cell.row && c.col === cell.col)
        .length !== 0
    })
  }

  directionForOrientation(orientation) {
    if(orientation === ORIENTATION.VERTICAL) {
      return DIRECTION.DOWN
    }
    if(orientation === ORIENTATION.HORIZONTAL) {
      return DIRECTION.RIGHT
    }
    throw "Unknown orientation: " + orientation
  }

  reverseDirectionForOrientation(orientation) {
    if(orientation === ORIENTATION.VERTICAL) {
      return DIRECTION.UP
    }
    if(orientation === ORIENTATION.HORIZONTAL) {
      return DIRECTION.LEFT
    }
    throw "Unknown orientation: " + orientation
  }

  getTypingDirection() {
    if(!this.words
      || this.words.length === 0
      || this.words[0].orientation === ORIENTATION.HORIZONTAL) {
      return DIRECTION.RIGHT
    }
    return DIRECTION.DOWN
  }

  getStartingCell() {
    if(!this.words || this.words.length === 0) {
      return {
        row: 0,
        col: 0
      }
    }
    return this.words[0].startCell
  }

  getFirstWord() {
    if(!this.words || this.words.length === 0) {
      return null
    }
    return this.words[0]
  }

  nextWord(word=null) {
    if(!word) {
      return this.getFirstWord()
    }
    const higherWords = this.words.filter((w) => w.number > word.number)
    return higherWords.length > 0 ? higherWords[0] : this.getFirstWord()
  }

  getInnerData() {
    return base64.encode(utf8.encode(JSON.stringify(this.words)))
  }

  decode(base) {
    return JSON.parse(utf8.decode(base64.decode(base)))
  }

  setInnerData(base64Data) {
    this.words = this.decode(base64Data)
    this.emit('change')
  }

  makeGrid() {
    let height = this.calcHeight()
    let width = this.calcWidth()
    let grid = Array.from(Array(height))
      .map((row) => {
        return Array.from(Array(width))
          .map((col) => {
            return {
              char: BLACK_CELL_PLACEHOLDER
            }
          })
      })

    this.getHorizontalWords().forEach((w) => {
      Array.from(w.word).forEach((c, i) => {
        grid[w.startCell.row][w.startCell.col + i] = {
          char: c,
          number: i === 0 ? w.number : undefined
        }
      })
    })

    this.getVerticalWords().forEach((w) => {
      Array.from(w.word).forEach((c, i) => {
        grid[w.startCell.row + i][w.startCell.col] = {
          char: c,
          number: i === 0 ? w.number : undefined
        }
      })
    })

    return grid
  }

  calcHeight() {
    let maxHorizontal = this.getHorizontalWords()
              .reduce((t, c) => (t < c.startCell.row ? c.startCell.row : t), 0)
    let maxVertical = this.getVerticalWords()
              .reduce((t, c) => {
                let lastCharIdx = c.startCell.row + c.word.length - 1
                return t < lastCharIdx ? lastCharIdx : t
              }, 0)
    return Math.max(maxVertical, maxHorizontal) + 1
  }

  calcWidth() {
    let maxVertical = this.getVerticalWords()
              .reduce((t, c) => (t < c.startCell.col ? c.startCell.col : t), 0)
    let maxHorizontal = this.getHorizontalWords()
              .reduce((t, c) => {
                let lastCharIdx = c.startCell.col + c.word.length - 1
                return t < lastCharIdx ? lastCharIdx : t
              }, 0)
    return Math.max(maxVertical, maxHorizontal) + 1
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

  getHorizontalWords() {
    return this.words.filter((w) => w.orientation === ORIENTATION.HORIZONTAL)
  }

  getVerticalWords() {
    return this.words.filter((w) => w.orientation === ORIENTATION.VERTICAL)
  }

  enterCharacter(cell, value) {
    this.currentGrid[cell.row][cell.col] = value
  }

  hasErrors() {
    return this.makeGrid()
             .some((row, i) =>
                row.some((col, j) =>
                  col.char !== this.currentGrid[i][j]
                )
              )
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
      case ACTION.ENTER_CHARACTER:
        this.enterCharacter(action.cell, action.value)
        break
    }
  }
}

const crosswordStore = new CrosswordStore
dispatcher.register(crosswordStore.handleActions.bind(crosswordStore))

window.crosswordStore = crosswordStore
export default crosswordStore
