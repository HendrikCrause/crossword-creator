import React from 'react'
import { Router, Route, hashHistory } from 'react-router'

import Flow from './flow'
import Complete from './complete'

import {CONTAINER_WIDTH_PERC} from '../../constants'

class Content extends React.Component {

  render() {
    const style = {
      width: CONTAINER_WIDTH_PERC + '%',
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
