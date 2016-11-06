import React from 'react'
import Block from './block'
import DisabledBlock from './disabledblock'
import Paper from 'material-ui/Paper'

import { BLOCK_SIZE, MARGIN_SIZE, BLACK_CELL_PLACEHOLDER, DIRECTION } from '../../constants'
import crosswordStore from '../../store/crosswordstore'

class Crossword extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      grid: crosswordStore.makeGrid(),
      focus: crosswordStore.getStartingCell(),
      currentWord: crosswordStore.getFirstWord()
    }
    this.resetState = this.resetState.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  resetState() {
    this.setState({
      grid: crosswordStore.makeGrid(),
      focus: this.state.focus,
      currentWord: this.state.currentWord
    })
  }

  componentWillMount() {
    crosswordStore.on('change', this.resetState)
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    crosswordStore.removeListener('change', this.resetState)
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  handleKeyDown(event) {
    const keys = {
      'ArrowRight': DIRECTION.RIGHT,
       'ArrowLeft': DIRECTION.LEFT,
       'ArrowDown': DIRECTION.DOWN,
         'ArrowUp': DIRECTION.UP
    }
    if(keys[event.key]){
      event.preventDefault()
      this.incrementFocus(keys[event.key], true)
    }
    if(event.key === 'Tab' && event.shiftKey) {
      event.preventDefault()
      this.goToPreviousWord()
    }
    else if(event.key === 'Tab') {
      event.preventDefault()
      this.goToNextWord()
    }
  }

  handleKeyUp(event) {
    if(event.key === 'Backspace') {
      if(!this.cellEquals(this.state.focus, this.state.currentWord.startCell)) {
        this.goToPreviousBlock()
      }
    }
  }

  incrementCell(cell, dir) {
    return {
      row: cell.row + dir.row,
      col: cell.col + dir.col
    }
  }

  incrementFocus(dir, ignoreBlank=false) {
    let newFocus = this.incrementCell(this.state.focus, dir)
    this.focusOnCell(newFocus, ignoreBlank)
  }

  focusOnBlock(idx) {
    let newFocus = this.idToCell(idx)
    this.focusOnCell(newFocus)
  }

  focusOnCell(cell, ignoreBlank=false) {
    if(this.characterAtCell(cell) === BLACK_CELL_PLACEHOLDER) {
      if(!ignoreBlank) {
        this.goToNextWord()
      }
      return
    }

    const wordsAtCell = crosswordStore.wordsAtCell(cell)
    if(wordsAtCell.length === 1) {
      this.setState({
        ...this.state,
        focus: cell,
        currentWord: wordsAtCell[0]
      })
      return
    }

    const alreadyOnWord = wordsAtCell
        .filter((w) => w === this.state.currentWord)
        .length > 0
    if(alreadyOnWord) {
      this.setState({
        ...this.state,
        focus: cell
      })
      return
    }

    let atFirstChar = wordsAtCell.filter((w) => this.cellEquals(w.startCell, cell))
    if(atFirstChar.length > 0) {
      this.setState({
        ...this.state,
        focus: cell,
        currentWord: atFirstChar[0]
      })
      return
    }

    this.setState({
      ...this.state,
      focus: cell,
      currentWord: wordsAtCell[0]
    })
  }

  characterAtCell(cell) {
    if(cell
        && cell.row > -1 && cell.row < this.state.grid.length
        && cell.col > -1 && cell.col < this.state.grid[cell.row].length
        && this.state.grid[cell.row][cell.col]) {
      return this.state.grid[cell.row][cell.col].char
    }
    return BLACK_CELL_PLACEHOLDER
  }

  idToCell(idx) {
    let coordinates = idx.split('_')
    return {
      row: parseInt(coordinates[0]),
      col: parseInt(coordinates[1])
    }
  }

  cellEquals(c1, c2) {
    return c1.row === c2.row && c1.col === c2.col
  }

  goToNextWord() {
    const nextWord = crosswordStore.nextWord(this.state.currentWord)
    this.setState({
      ...this.state,
      focus: nextWord.startCell,
      currentWord: nextWord
    })
  }

  goToPreviousWord() {
    const prevWord = crosswordStore.previousWord(this.state.currentWord)
    this.setState({
      ...this.state,
      focus: prevWord.startCell,
      currentWord: prevWord
    })
  }

  goToNextBlock() {
    const dir = crosswordStore.directionForOrientation(this.state.currentWord.orientation)
    this.incrementFocus(dir)
  }

  goToPreviousBlock() {
    const dir = crosswordStore.reverseDirectionForOrientation(this.state.currentWord.orientation)
    this.incrementFocus(dir)
  }

  render() {
    const style = {
      margin: MARGIN_SIZE,
      display: 'inline-block',
    }

    return (
      <Paper
        zDepth={2}
        style={style}
      >
        {
          this.state.grid.map((row, j) => {
            return (
              <Paper key={'row' + j}>
                {
                  row.map((col, i) => {
                    const key = j + '_' + i
                    if(col.char === BLACK_CELL_PLACEHOLDER){
                      return (<DisabledBlock key={key} size={BLOCK_SIZE} />)
                    }
                    return (
                      <Block
                        key={key}
                        idx={key}
                        value={col.char}
                        size={BLOCK_SIZE}
                        number={col.number}
                        empty={this.props.empty}
                        goToNextBlock={() => this.goToNextBlock(key)}
                        focusOnBlock={() => this.focusOnBlock(key)}
                        focus={this.state.focus.row === j && this.state.focus.col === i}
                        check={this.props.check}
                      />
                    )
                  })
                }
              </Paper>
            )
          })
        }
      </Paper>
    )
  }
}

export default Crossword
