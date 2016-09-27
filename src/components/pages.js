import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Layout from './layout'
import Welcome from './routes/welcome'
import Create from './routes/create'
import Review from './routes/review'

class Pages extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Welcome} ></IndexRoute>
          <Route path='create' component={Create} ></Route>
          <Route path='review' component={Review} ></Route>
        </Route>
      </Router>
    )
  }
}

export default Pages
