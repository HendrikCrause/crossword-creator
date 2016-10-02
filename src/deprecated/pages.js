import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Layout from './layout'
import Welcome from './content/flow'

class Pages extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Welcome} ></IndexRoute>
        </Route>
      </Router>
    )
  }
}

export default Pages
