import React from 'react'
import Crossword from './crossword/crossword'
import Clues from './clues/clues'

class Content extends React.Component {

  render() {
    return (
      <div style={{
        width: '90%',
        margin: 'auto',
      }}>
          <Crossword/>
          <Clues/>
      </div>
    )
  }
}

export default Content
