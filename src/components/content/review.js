import React from 'react'
import FlatButton from 'material-ui/FlatButton'

import AvLoop from 'material-ui/svg-icons/av/loop'

import NameAndDescription from '../header/namedesc'
import Crossword from '../crossword/crossword'
import Clues from '../clues/clues'
import ShareUrl from './shareurl'

class Review extends React.Component {

  render() {
    return (
      <div>
        <div>
          <FlatButton
            label="Generate Different Crossword Puzzle"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.props.generate}
            icon={<AvLoop/>}
          />
        </div>
        <NameAndDescription displayMode={true}/>
        <Crossword />
        <Clues />
        <ShareUrl handlePrev={this.props.handlePrev}/>
      </div>
    )
  }
}

export default Review
