import React from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

class Navigation extends React.Component {

  render() {
    return (
      <Drawer
        docked={false}
        open={this.props.open}
        onRequestChange={this.props.toggleNav}
      >
        <MenuItem onTouchTap={this.props.toggleNav}>Menu Item</MenuItem>
        <MenuItem onTouchTap={this.props.toggleNav}>Menu Item 2</MenuItem>
      </Drawer>
    )
  }
}

export default Navigation
