import React from 'react'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import { narrowStyle } from './styles'

class ButtonRow extends React.Component {
  render() {
    return (
      <TableRow>
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
      </TableRow>
    )
  }
}

export default ButtonRow
