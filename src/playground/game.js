'use strict'

function sortByLength(arr) {
  return arr.slice().sort((a, b) => {
    return b.length - a.length
  })
}

const direction = {
  HORIZONTAL: 1,
  VERTICAL: 2
}

const BLACK_CELL_PLACEHOLDER = '_'

class Board {
  constructor(height, width) {
    this.height = height
    this.width = width
    this.board = this.blankBoard()
  }

  blankBoard() {
    return Array.from(Array(this.height))
            .map((x) => Array.from(BLACK_CELL_PLACEHOLDER.repeat(this.width)))
  }

  pretty() {
    return this.board.map((row) => row.join(' ')).join('\n')
  }

  placeWord(word, startCell, dir) {
    const chars = Array.from(word)
    let cell = this.copyCell(startCell)
    chars.forEach((c) => {
      this.placeCharacter(c, cell)
      cell = this.nextCell(cell, dir)
    })
  }

  canPlaceWord(word, startCell, dir) {
    let cell = this.copyCell(startCell)
    return Array.from(word).every((char) => {
      if(this.charAt(cell) === null) {
        return false
      }
      if(this.charAt(cell) !== BLACK_CELL_PLACEHOLDER && this.charAt(cell) !== char) {
        return false
      }
      cell = this.nextCell(cell, dir)
      return true
    })
  }

  trimBoard() {
    let rowsToRemove = []
    let columnsToRemove = []
    this.board.forEach((row, index) => {
      if(this.containsOnlyBlackCells(row)) {
        rowsToRemove.push(index)
      }
    })
    rowsToRemove.reverse().forEach(this.removeRow.bind(this))

    Array.from(Array(this.width))
      .map((e, i) => this.getColumn(i))
      .forEach((col, index) => {
        if(this.containsOnlyBlackCells(col)) {
          columnsToRemove.push(index)
        }
      })
    columnsToRemove.reverse().forEach(this.removeColumn.bind(this))
  }

  getRow(index) {
    if(index < 0) {
      index += this.height
    }
    return this.board[index]
  }

  getColumn(index) {
    if(index < 0) {
      index += this.width
    }
    return this.board.map((row) => row[index])
  }

  removeRow(index){
    if(index < 0) {
      index += this.height
    }
    this.board.splice(index, 1)
    this.height -= 1
  }

  removeColumn(index){
    if(index < 0) {
      index += this.width
    }
    this.board.forEach((row) => row.splice(index, 1))
    this.width -= 1
  }

  locationOfChar(char) {
    let sparceBoard = this.sparceBoard()
  }

  sparceBoard() {
    return this.board.reduce((total, row, rowIndex) => {
      return total.concat(row.map((col, colIndex) => {
        return {
          row: rowIndex,
          col: colIndex,
          value: col
        }
      }).filter((e) => e.value !== BLACK_CELL_PLACEHOLDER))
    }, [])
  }

  containsOnlyBlackCells(arr) {
    return arr.every((e) => e === BLACK_CELL_PLACEHOLDER)
  }

  copyCell(cell) {
    return {
      row: cell.row,
      col: cell.col
    }
  }

  nextCell(cell, dir) {
    if (dir === direction.VERTICAL) {
      return {
        row: cell.row + 1,
        col: cell.col
      }
    } else if(dir === direction.HORIZONTAL) {
      return {
        row: cell.row,
        col: cell.col + 1
      }
    } else {
      throw new Error('Unknown direction ' + dir)
    }
  }

  charAt(cell) {
    if(cell.row >= this.height || cell.col >= this.width) {
      return null
    }
    return this.board[cell.row][cell.col]
  }

  placeCharacter(char, cell) {
    this.board[cell.row][cell.col] = char
  }

  randomCell() {
    return {
      row: this.randomRow(),
      col: this.randomCol()
    }
  }

  randomRow() {
    return Math.floor(Math.random() * this.height)
  }

  randomCol() {
    return Math.floor(Math.random() * this.width)
  }
}

const HEIGHT = 10
const WIDTH = 10
const WORD_LIST = ['hello', 'world', 'how', 'are', 'the', 'children', 'doing', 'today', 'friend']

let sortedWords = sortByLength(WORD_LIST)
let board = new Board(HEIGHT, WIDTH)


board.placeWord(sortedWords[0], {row: 1, col:2}, direction.VERTICAL)
console.log(board.sparceBoard())

// console.log(board.canPlaceWord('hello', {row:0,col:13}, direction.HORIZONTAL))
