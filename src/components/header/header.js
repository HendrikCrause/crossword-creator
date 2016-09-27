import React from 'react'
import AppBar from 'material-ui/AppBar'
import Navigation from './navigation'
import { appName } from '../../constants'

class Header extends React.Component {
  render() {
    return (
      <AppBar
        title={appName}
        showMenuIconButton={false}
      >
        <Navigation location={this.props.location}/>
      </AppBar>
    )
  }
}

export default Header
