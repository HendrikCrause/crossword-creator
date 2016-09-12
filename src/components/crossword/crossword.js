import React from 'react'
import Block from './block'
import DisabledBlock from './disabledblock'
import Paper from 'material-ui/Paper'

const blockSize = 40

const puzzle = [
  ['a', 'b', '#'],
  ['#', '1', ''],
  ['', '#', '#']
]

class Crossword extends React.Component {

  render() {
    const style = {
      margin: 20,
      display: 'inline-block'
    }

    return (
      <Paper
        zDepth={2}
        style={style}
      >
        { puzzle.map((row) => {
          return (
            <Paper>
              {
                row.map((col) => {
                  if(col === '#'){
                    return (<DisabledBlock size={blockSize} />)
                  }
                  return (<Block value={col} size={blockSize} number={1} />)
                })
              }
            </Paper>
          )
        }) }
      </Paper>
    )
  }
}

export default Crossword
