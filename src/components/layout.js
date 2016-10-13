import React from 'react'
import DocumentTitle from 'react-document-title'
import ReactHeight from 'react-height'

import Header from './header/header'
import Content from './content/content'
import Footer from './footer/footer'
import { APP_NAME } from '../constants'

class Layout extends React.Component {

  render() {

    const hfStyle = {
      flex: 'none'
    }

    const contentStyle = {
      flex: 1
    }

    const containerStyle = {
      display: 'flex',
      minHeight: window.innerHeight,
      flexDirection: 'column'
    }

    return (
      <div style={containerStyle}>
        <DocumentTitle title={APP_NAME}/>
        <Header style={hfStyle}/>
        <Content style={contentStyle}/>
        <Footer style={hfStyle}/>
      </div>
    )
  }
}

export default Layout
