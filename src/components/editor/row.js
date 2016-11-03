import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import TextField from 'material-ui/TextField'

import FlatButton from 'material-ui/FlatButton'
import ContentClear from 'material-ui/svg-icons/content/clear'

import { narrowStyle, wordStyle, colStyle, actionsStyle, labelStyle } from './styles'

class Row extends React.Component {

  remove() {
    this.props.handleRemoveWord(this.props.number)
  }

  updateWord(event) {
    this.props.handleUpdateWord({
      number: this.props.number,
      word: event.target.value,
      clue: this.props.clue
    })
  }

  updateClue(event) {
    this.props.handleUpdateWord({
      number: this.props.number,
      word: this.props.word,
      clue: event.target.value
    })
  }

  render() {
    return (
      <TableRow>
        <TableRowColumn style={narrowStyle}>{this.props.number}</TableRowColumn>
        <TableRowColumn style={wordStyle}>
          <TextField
            value={this.props.word}
            name={'word_' + this.props.number}
            onChange={this.updateWord.bind(this)}
          />
        </TableRowColumn>
        <TableRowColumn style={colStyle}>
          <TextField
            fullWidth={true}
            multiLine={true}
            rows={1}
            value={this.props.clue}
            name={'clue_' + this.props.number }
            onChange={this.updateClue.bind(this)}
          />
        </TableRowColumn>
        <TableRowColumn style={wordStyle}>
          <FlatButton
            label="Remove"
            icon={<ContentClear />}
            labelPosition='before'
            onTouchTap={this.remove.bind(this)}
          />
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default Row
