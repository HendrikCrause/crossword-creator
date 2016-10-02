import React from 'react'
import Crossword from '../crossword/crossword'
import Clues from '../clues/clues'

class Review extends React.Component {

  render() {
    return (
      <div>
          <Crossword />
          <Clues />
      </div>
    )
  }
}

export default Review
