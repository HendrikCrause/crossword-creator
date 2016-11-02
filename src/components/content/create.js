import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import crosswordStore from '../../store/crosswordstore'
import { updateName, updateDescription } from '../../actions/crosswordactions'
import Editor from '../editor/editor'
import NameAndDescription from '../header/namedesc'

class Create extends React.Component {

  handleGenerateButton() {
    this.props.generate()
    this.props.handleNext()
  }

  render() {
    return (
      <div>
        <NameAndDescription displayMode={false}/>
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
          onTouchTap={this.handleGenerateButton.bind(this)}
        />
      </div>
    )
  }
}

export default Create
