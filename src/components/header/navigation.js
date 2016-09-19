import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'

class Navigation extends React.Component {

  navigate(tab) {
    alert(tab.props['route'])
  }

  render() {
    const tabsStyle = {
      width: 200
    }

    return (
      <Tabs style={tabsStyle}>
        <Tab
          label='Create'
          route='create'
          onActive={this.navigate}
        />
        <Tab
          label='Complete'
          route='complete'
          onActive={this.navigate}
        />
      </Tabs>
    )
  }
}

export default Navigation
