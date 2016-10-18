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
      focus: crosswordStore.getStartingCell()
    }
    this.resetState = this.resetState.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  resetState() {
    this.setState({
      grid: crosswordStore.makeGrid(),
      focus: this.state.focus
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
    switch (event.key) {
      case 'ArrowLeft':
        this.incrementFocus(DIRECTION.LEFT)
        event.preventDefault()
        break
      case 'ArrowRight':
        this.incrementFocus(DIRECTION.RIGHT)
        event.preventDefault()
        break
      case 'ArrowUp':
        this.incrementFocus(DIRECTION.UP)
        event.preventDefault()
        break
      case 'ArrowDown':
        this.incrementFocus(DIRECTION.DOWN)
        event.preventDefault()
        break
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
    if(this.characterAtCell(newFocus) !== BLACK_CELL_PLACEHOLDER) {
      this.setState({
        grid: this.state.grid,
        focus: newFocus
      })
    }
  }

  characterAtCell(cell) {
    if(this.state.grid[cell.row][cell.col]) {
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

  goToNextBlock(idx) {
    let cell = this.idToCell(idx)

    if(this.characterAtCell(this.incrementCell(cell, DIRECTION.RIGHT))
        !== BLACK_CELL_PLACEHOLDER) {
      this.incrementFocus(DIRECTION.RIGHT)
    } else if(this.characterAtCell(this.incrementCell(cell, DIRECTION.DOWN))
        !== BLACK_CELL_PLACEHOLDER){
      this.incrementFocus(DIRECTION.DOWN)
    }
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
                        goToNextBlock={this.goToNextBlock.bind(this)}
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
