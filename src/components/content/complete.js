import React from 'react'

import Crossword from '../crossword/crossword'
import Clues from '../clues/clues'

import crosswordStore from '../../store/crosswordstore'

class Complete extends React.Component {

  componentWillMount() {
    try {
      crosswordStore.setInnerData(this.props.location.query.data)
    } catch(err) {
      console.error(err)
      this.props.history.push('')
    }
  }

  render() {
    return (
      <div>
        <Crossword empty={true} />
        <Clues />
      </div>
    )
  }
}

export default Complete
