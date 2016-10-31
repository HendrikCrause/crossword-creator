import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import {APP_NAME} from '../../constants'

class Introduction extends React.Component {
  render() {
    return (
      <div>
        <p>
          This is {APP_NAME}. The app that let's you create your very own crossword puzzles.
          It's very easy, just click the button to get started.
        </p>
        <RaisedButton
          label="Let's get started"
          primary={true}
          onTouchTap={this.props.handleNext}
        />
      </div>
    )
  }
}

export default Introduction
