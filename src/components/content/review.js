import React from 'react'
import Crossword from '../crossword/crossword'
import Clues from '../clues/clues'

import crosswordStore from '../../store/crosswordstore'

class Review extends React.Component {

  render() {
    return (
      <div>
          <Crossword />
          <Clues />
          <p>{crosswordStore.dataString()}</p>
      </div>
    )
  }
}

export default Review
