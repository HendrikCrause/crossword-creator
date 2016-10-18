import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

class Introduction extends React.Component {
  render() {
    return (
      <div>
        <p>
          Welcome message
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
