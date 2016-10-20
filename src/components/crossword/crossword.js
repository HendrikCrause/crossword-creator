import React from 'react'
import Block from './block'
import DisabledBlock from './disabledblock'
import Paper from 'material-ui/Paper'

import { BLOCK_SIZE, BLACK_CELL_PLACEHOLDER, DIRECTION } from '../../constants'
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
    this.handleKeyPress = this.handleKeyPress.bind(this)
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
    window.addEventListener('keydown', this.handleKeyPress)
  }

  componentWillUnmount() {
    crosswordStore.removeListener('change', this.resetState)
    window.removeEventListener('keydown', this.handleKeyPress)
  }

  handleKeyPress(event) {
    const keys = {
      'ArrowRight': DIRECTION.RIGHT,
       'ArrowLeft': DIRECTION.LEFT,
       'ArrowDown': DIRECTION.DOWN,
         'ArrowUp': DIRECTION.UP
    }
    if(keys[event.key]){
      this.incrementFocus(keys[event.key])
    }
  }

  incrementCell(cell, dir) {
    return {
      row: cell.row + dir.row,
      col: cell.col + dir.col
    }
  }

  incrementFocus(dir) {
    let newFocus = this.incrementCell(this.state.focus, dir)
    this.focusOnCell(newFocus)
  }

  focusOnBlock(idx) {
    let newFocus = this.idToCell(idx)
    this.focusOnCell(newFocus)
  }

  focusOnCell(cell) {
    if(this.characterAtCell(cell) === BLACK_CELL_PLACEHOLDER) {
      const nextWord = crosswordStore.nextWord(this.state.currentWord)
      this.setState({
        ...this.state,
        focus: nextWord.startCell,
        currentWord: nextWord
      })
      console.log('Blank Cell:',this.state.currentWord.word);
      return
    }

    const wordsAtCell = crosswordStore.wordsAtCell(cell)
    if(wordsAtCell.length === 1) {
      this.setState({
        ...this.state,
        focus: cell,
        currentWord: wordsAtCell[0]
      })
      console.log('Only one word:',this.state.currentWord.word);
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
      console.log('Already on word', this.state.currentWord.word);
      return
    }

    let atFirstChar = wordsAtCell.filter((w) => this.cellEquals(w.startCell, cell))
    if(atFirstChar.length > 0) {
      this.setState({
        ...this.state,
        focus: cell,
        currentWord: atFirstChar[0]
      })
      console.log('Starting cell of word:', this.state.currentWord.word);
      return
    }

    this.setState({
      ...this.state,
      focus: cell,
      currentWord: wordsAtCell[0]
    })
    console.log('Default word:', this.state.currentWord.word);
  }

  characterAtCell(cell) {
    if(cell
        && cell.row > -1
        && cell.col > -1
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

  goToNextBlock(idx) {
    const cell = this.idToCell(idx)
    const dir = crosswordStore.directionForOrientation(this.state.currentWord.orientation)
    this.incrementFocus(dir)

    // if(this.characterAtCell(this.incrementCell(cell, DIRECTION.RIGHT))
    //     !== BLACK_CELL_PLACEHOLDER) {
    //   this.incrementFocus(DIRECTION.RIGHT)
    // } else if(this.characterAtCell(this.incrementCell(cell, DIRECTION.DOWN))
    //     !== BLACK_CELL_PLACEHOLDER){
    //   this.incrementFocus(DIRECTION.DOWN)
    // }
  }

  render() {
    const style = {
      margin: 20,
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
