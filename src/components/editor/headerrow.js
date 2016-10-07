import React from 'react'
import { TableHeaderColumn, TableRow } from 'material-ui/Table'

import { narrowStyle, wordStyle, colStyle, actionsStyle } from './styles'

class HeaderRow extends React.Component {
  render() {
    return (
      <TableRow>
        <TableHeaderColumn style={narrowStyle}>ID</TableHeaderColumn>
        <TableHeaderColumn style={wordStyle}>Word</TableHeaderColumn>
        <TableHeaderColumn style={colStyle}>Clue</TableHeaderColumn>
        <TableHeaderColumn style={actionsStyle}>Actions</TableHeaderColumn>
      </TableRow>
    )
  }
}

export default HeaderRow
