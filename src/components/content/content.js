import React from 'react'
import { Router, Route, hashHistory } from 'react-router'

import Flow from './flow'
import Complete from './complete'

class Content extends React.Component {

  render() {
    const style = {
      width: '90%',
      margin: 'auto'
    }

    return (
      <div style={style}>
        <Router history={hashHistory}>
          <Route path='/' component={Flow}/>
          <Route path='complete' component={Complete}/>
        </Router>
      </div>
    )
  }
}

export default Content
