import React from 'react'
import Block from './block'
import DisabledBlock from './disabledblock'
import Paper from 'material-ui/Paper'

import { BLOCK_SIZE, BLACK_CELL_PLACEHOLDER } from '../../constants'
import crosswordStore from '../../store/crosswordstore'

class Crossword extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      grid: crosswordStore.makeGrid()
    }
    this.resetState = this.resetState.bind(this)
  }

  resetState() {
    this.setState({
      grid: crosswordStore.makeGrid()
    })
  }

  componentWillMount() {
    crosswordStore.on('change', this.resetState)
  }

  componentWillUnmount() {
    crosswordStore.removeListener('change', this.resetState)
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
