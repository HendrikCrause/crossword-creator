import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

import Editor from '../editor/editor'

class Create extends React.Component {
  render() {
    return (
      <div>
        <p>Enter the words and clues that should be included in the crossword puzzle</p>
        <Editor/>
        <FlatButton
          label="Back"
          onTouchTap={this.props.handlePrev}
          style={{marginRight: 12}}
        />
        <RaisedButton
          label="Generate crossword"
          primary={true}
          onTouchTap={this.props.handleNext}
        />
      </div>
    )
  }
}

export default Create
