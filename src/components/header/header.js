import React from 'react'
import AppBar from 'material-ui/AppBar'
import Navigation from './navigation'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { navOpen: false }
  }

  toggleNav() {
    this.setState({navOpen: !this.state.navOpen})
  }

  render() {
    return (
      <AppBar
        title="Data Collector"
        onLeftIconButtonTouchTap={this.toggleNav.bind(this)}
      >
          <Navigation
            open={this.state.navOpen}
            toggleNav={this.toggleNav.bind(this)}
          />
      </AppBar>
    )
  }
}

export default Header
