import React from 'react'
import { Tabs, Tab } from 'material-ui/Tabs'
import { hashHistory } from 'react-router'

class Navigation extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      location: this.props.location.pathname
    }
  }

  navigate(tab) {
    this.setState({location:tab.props['value']})
    hashHistory.push(tab.props['value'])
  }

  render() {
    const tabsStyle = {
      width: 150
    }

    const tabs = [
      {
        label: 'Home',
        route: '/'
      }, {
        label: 'Create',
        route: '/create'
      }, {
        label: 'Review',
        route: '/review'
      },
    ]

    return (
      <Tabs value={this.state.location}>
        {
          tabs.map(t => {
            return (
              <Tab
                key={t.route}
                value={t.route}
                style={tabsStyle}
                label={t.label}
                onActive={this.navigate.bind(this)}
              />
            )
          })
        }
      </Tabs>
    )
  }
}

export default Navigation
