import React from 'react'
import Block from './block'

const blockSize = 30

class Crossword extends React.Component {

  render() {
    const puzzle = [
      ['a', 'b', '#'],
      ['#', '1', ''],
      ['', '#', '#']
    ]

    return (
      <div style={{
        margin: 10
      }}>
        { puzzle.map((row) => {
          let renderedRow = row.map((col) => {
            return (<Block value={col} size={blockSize} />)
          })
          renderedRow.push( (<br/>) )
          return renderedRow
        }) }
      </div>
    )
  }
}

export default Crossword
