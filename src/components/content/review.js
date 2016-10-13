import React from 'react'

import Crossword from '../crossword/crossword'
import Clues from '../clues/clues'
import ShareUrl from './shareurl'

class Review extends React.Component {

  render() {
    return (
      <div>
          <Crossword />
          <Clues />
          <ShareUrl />
      </div>
    )
  }
}

export default Review
