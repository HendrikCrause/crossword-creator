import { EventEmitter } from 'events'
import utf8 from 'utf8'
import base64 from 'base-64'

import dispatcher from '../dispatcher/dispatcher'
import { ACTION, ORIENTATION, BLACK_CELL_PLACEHOLDER,
  DIRECTION, MAX_HEIGHT, MAX_WIDTH,
  MAX_ORPHAN_WORDS, MAX_BLACK_SQUARE_PERCENTAGE } from '../constants'
import PuzzleGenerator from '../generator/puzzle'

const DEMO_DATA = [
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


class CrosswordStore extends EventEmitter {
  constructor() {
    super()

    this.words = DEMO_DATA

    this.currentGrid = this.makeGrid().map((row) => {
      return row.map((col) => {
        return col.char === BLACK_CELL_PLACEHOLDER ? col.char : ''
      })
    })

    this.name = ''
    this.description = ''
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

  previousWord(word=null) {
    if(!word) {
      return this.getFirstWord()
    }
    const lowerWords = this.words.filter((w) => w.number < word.number)
    return lowerWords.length > 0 ? lowerWords[lowerWords.length - 1] : this.words[this.words.length - 1]
  }

  getInnerData() {
    const out = {
      words: this.words,
      name: this.name,
      description: this.description
    }
    return base64.encode(utf8.encode(JSON.stringify(out)))
  }

  decode(base) {
    return JSON.parse(utf8.decode(base64.decode(base)))
  }

  setInnerData(base64Data) {
    const input = this.decode(base64Data)
    this.words = input.words
    this.name = input.name
    this.description = input.description
    this.currentGrid = this.makeGrid().map((row) => {
      return row.map((col) => {
        return col.char === BLACK_CELL_PLACEHOLDER ? col.char : ''
      })
    })
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
        let number = i === 0 ? w.number : undefined
        if(grid[w.startCell.row][w.startCell.col + i].number !== undefined) {
          number = grid[w.startCell.row][w.startCell.col + i].number
        }
        grid[w.startCell.row][w.startCell.col + i] = {
          char: c,
          number: number
        }
      })
    })

    this.getVerticalWords().forEach((w) => {
      Array.from(w.word).forEach((c, i) => {
        let number = i === 0 ? w.number : undefined
        if(grid[w.startCell.row + i][w.startCell.col].number) {
          number = grid[w.startCell.row + i][w.startCell.col].number
        }
        grid[w.startCell.row + i][w.startCell.col] = {
          char: c,
          number: number
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

  clearWords() {
    this.words = []
    this.addWord()
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
    this.emit('change')
  }

  hasErrors() {
    return this.makeGrid()
             .some((row, i) =>
                row.some((col, j) =>
                  col.char.toLowerCase() !== this.currentGrid[i][j].toLowerCase()
                )
              )
  }

  generateNewCrossword() {
    let foundSuitablePuzzle = false
    let count = 0
    let puzzle = new PuzzleGenerator(MAX_HEIGHT, MAX_WIDTH)

    while(!foundSuitablePuzzle && count++ < 100) {
      puzzle = new PuzzleGenerator(MAX_HEIGHT, MAX_WIDTH)
      puzzle.computePuzzle(this.words.map((w) => w.word))
      foundSuitablePuzzle = this.isSuitablePuzzle(puzzle)
    }

    this.words = this.words.map((w) => {
      const matchingPlacement = puzzle.placements.filter((p) => p.word === w.word)[0]
      if(!matchingPlacement) {
        return {
          word: w.word,
          clue: w.clue,
          number: w.number
        }
      }
      return {
        ...w,
        orientation: matchingPlacement.orientation,
        startCell: matchingPlacement.startCell
      }
    })
    this.emit('change')
  }

  isSuitablePuzzle(puzzle) {
    return puzzle.totalOrphanWords() <= MAX_ORPHAN_WORDS &&
      puzzle.percentageBlackSquares() <= MAX_BLACK_SQUARE_PERCENTAGE &&
      puzzle.placements.length === this.words.length
  }

  getName() {
    return this.name
  }

  getDescription() {
    return this.description
  }

  updateName(name) {
    this.name = name
    this.emit('change')
  }

  updateDescription(description) {
    this.description = description
    this.emit('change')
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
      case ACTION.GENERATE_CROSSWORD:
        this.generateNewCrossword()
        break
      case ACTION.UPDATE_NAME:
        this.updateName(action.name)
        break
      case ACTION.UPDATE_DESCRIPTION:
        this.updateDescription(action.description)
        break
      case ACTION.CLEAR_WORDS:
        this.clearWords()
        break
    }
  }
}

const crosswordStore = new CrosswordStore
dispatcher.register(crosswordStore.handleActions.bind(crosswordStore))

window.crosswordStore = crosswordStore
export default crosswordStore
