import { ORIENTATION, BLACK_CELL_PLACEHOLDER } from '../constants'

class Board {
  constructor(height, width) {
    this.height = height
    this.width = width
    this.board = this.blankBoard()
    this.placements = []
  }

  blankBoard() {
    return Array.from(Array(this.height))
            .map((x) => Array.from(BLACK_CELL_PLACEHOLDER.repeat(this.width)))
  }

  pretty() {
    return this.board.map((row) => row.join(' ')).join('\n')
  }

  computePuzzle(words) {
    this.placements = []
    let sortedWords = this.sortByLength(words)
    sortedWords.every((w) => {
      let placement = this.suggestPlacement(w)
      if(placement === null) {
        return false
      }
      this.placeWord(w, {row: placement.row, col: placement.col}, placement.dir)
      return true
    })
  }

  sortByLength(arr) {
    return arr.slice().sort((a, b) => {
      return b.length - a.length
    })
  }

  suggestPlacement(word) {
    let chars = Array.from(word)
    let matchingLocations = chars
      .map((c) => this.locationsOfChar(c))

    let horizontalSuggestions = matchingLocations.map((locations, index) =>
      locations.map((loc) => this.findStartCell(index, loc, ORIENTATION.HORIZONTAL))
        .filter((loc) => this.canPlaceWord(word, loc, ORIENTATION.HORIZONTAL))
        .map((s) => {
          s.dir = ORIENTATION.HORIZONTAL
          return s
        })
    )

    let verticalSuggestions = matchingLocations.map((locations, index) =>
      locations.map((loc) => this.findStartCell(index, loc, ORIENTATION.VERTICAL))
        .filter((loc) => this.canPlaceWord(word, loc, ORIENTATION.VERTICAL))
        .map((s) => {
          s.dir = ORIENTATION.VERTICAL
          return s
        })
    )

    let suggestions = [].concat(horizontalSuggestions, verticalSuggestions).
              reduce((t, c) => t.concat(c), [])

    if(suggestions.length === 0) {
      return this.suggestRandomPlacement(word)
    }

    let randIdx = Math.floor(Math.random() * suggestions.length)
    return suggestions[randIdx]
  }

  findStartCell(charIndex, cell, dir) {
    return this.findCellAtIndex(0, cell, charIndex, dir)
  }

  findCellAtIndex(index, refCell, refIndex, dir) {
    if(dir === ORIENTATION.HORIZONTAL) {
      return {
        row: refCell.row,
        col: refCell.col + index - refIndex
      }
    } else if(dir === ORIENTATION.VERTICAL) {
      return {
        row: refCell.row + index - refIndex,
        col: refCell.col
      }
    } else {
      throw new Error('Unknown orientation ' + dir)
    }
  }

  suggestRandomPlacement(word) {
    let iter = 0
    const MAX_ITERATIONS = 100
    while(iter < MAX_ITERATIONS) {
      iter += 1

      let cell = this.randomCell()
      if(this.canPlaceWord(word, cell, ORIENTATION.HORIZONTAL)) {
        return {
          row: cell.row,
          col: cell.col,
          dir: ORIENTATION.HORIZONTAL
        }
      } else if(this.canPlaceWord(word, cell, ORIENTATION.VERTICAL)) {
        return {
          row: cell.row,
          col: cell.col,
          dir: ORIENTATION.VERTICAL
        }
      }
    }
  }

  placeWord(word, startCell, orientation) {
    const chars = Array.from(word)
    let cell = this.copyCell(startCell)
    chars.forEach((c) => {
      this.placeCharacter(c, cell)
      cell = this.nextCell(cell, orientation)
    })
    this.placements.push({
      word,
      startCell,
      orientation
    })
  }

  canPlaceWord(word, startCell, dir) {

    const charPlacements = Array.from(word).map((char, i) => {
      return {
        char,
        cell: this.findCellAtIndex(i, startCell, 0, dir)
      }
    })
    const wordFits = charPlacements.every((placement) => {
      const placedChar = this.charAt(placement.cell)
      if(placedChar === null) {
        return false
      }
      if(placedChar !== BLACK_CELL_PLACEHOLDER && placedChar !== placement.char) {
        return false
      }
      const adjacentCell1 = this.findCellAtIndex(-1, placement.cell, 0, ORIENTATION.OPPOSITE(dir))
      const adjacentCell2 = this.findCellAtIndex( 1, placement.cell, 0, ORIENTATION.OPPOSITE(dir))
      if(placedChar === BLACK_CELL_PLACEHOLDER &&
          (  this.charAt(adjacentCell1) !== BLACK_CELL_PLACEHOLDER
          || this.charAt(adjacentCell2) !== BLACK_CELL_PLACEHOLDER)) {
        return false
      }
      return true
    })

    const cellBefore = this.findCellAtIndex(-1, startCell, 0, dir)
    const emptyBefore = this.charAt(cellBefore) === null || this.charAt(cellBefore) === BLACK_CELL_PLACEHOLDER

    const cellAfter = this.findCellAtIndex(word.length, startCell, 0, dir)
    const emptyAfter = this.charAt(cellAfter) === null || this.charAt(cellAfter) === BLACK_CELL_PLACEHOLDER

    // let cell = this.copyCell(startCell)
    //
    // let wordFits = Array.from(word).every((char) => {
    //   if(this.charAt(cell) === null) {
    //     return false
    //   }
    //   if(this.charAt(cell) !== BLACK_CELL_PLACEHOLDER && this.charAt(cell) !== char) {
    //     return false
    //   }
    //   cell = this.nextCell(cell, dir)
    //   return true
    // })

    return wordFits && emptyBefore && emptyAfter
  }

  trimBoard() {
    this.trimRows()
    this.trimColumns()
  }

  trimRows() {
    let rowsToRemove = []
    this.board.forEach((row, index) => {
      if(this.containsOnlyBlackCells(row)) {
        rowsToRemove.push(index)
      }
    })
    rowsToRemove.reverse().forEach(this.removeRow.bind(this))
  }

  trimColumns() {
    let columnsToRemove = []
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

  locationsOfChar(char) {
    let sparceBoard = this.sparceBoard()
    return sparceBoard.filter((cell) => cell.value === char)
  }

  sparceBoard() {
    return this.board.reduce((total, row, rowIndex) => {
      return total.concat(row.map((value, colIndex) => {
        return {
          row: rowIndex,
          col: colIndex,
          value: value
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
    if (dir === ORIENTATION.VERTICAL) {
      return {
        row: cell.row + 1,
        col: cell.col
      }
    } else if(dir === ORIENTATION.HORIZONTAL) {
      return {
        row: cell.row,
        col: cell.col + 1
      }
    } else {
      throw new Error('Unknown orientation ' + dir)
    }
  }

  charAt(cell) {
    if(this.isOutsideBoard(cell)) {
      return null
    }
    return this.board[cell.row][cell.col]
  }

  isOutsideBoard(cell) {
    return cell.row >= this.height
        || cell.col >= this.width
        || cell.row < 0
        || cell.col < 0
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

export default Board
