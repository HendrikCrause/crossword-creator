import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentClear from 'material-ui/svg-icons/content/clear'

import { narrowStyle } from './styles'

class ButtonRow extends React.Component {
  render() {
    return (
      <TableRow displayBorder={false}>
        <TableRowColumn style={narrowStyle}></TableRowColumn>
        <TableRowColumn>
          <RaisedButton
            label="Add"
            primary={true}
            icon={
              <ContentAdd />
            }
            labelPosition='before'
            onTouchTap={this.props.handleAddWord}
          />
        </TableRowColumn>
        <TableRowColumn>
          <FlatButton
            label="Remove All"
            icon={<ContentClear />}
            labelPosition='before'
            onTouchTap={this.props.handleClearWords}
          />
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default ButtonRow
