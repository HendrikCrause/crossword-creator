import React from 'react'
import SubHeader from 'material-ui/Subheader'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

class ClueSection extends React.Component {
  render() {
    const style = {
      display: 'inline-block',
      verticalAlign: 'top',
      // width: '45%'
    }

    return (
      <div style={style}>
        <SubHeader>{this.props.heading}</SubHeader>
        <Table selectable={false} style={{width: 'inherited'}}>
          <TableBody displayRowCheckbox={false}>
            {
              this.props.data.map((d) => {
                return (
                  <TableRow key={d.number}>
                    <TableRowColumn>{d.number}</TableRowColumn>
                    <TableRowColumn>{d.clue}</TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default ClueSection
