import React from 'react'
import AppBar from 'material-ui/AppBar'
import { APP_NAME } from '../../constants'

class Header extends React.Component {
  render() {
    return (
      <AppBar
        title={APP_NAME}
        showMenuIconButton={false}
      />
    )
  }
}

export default Header
