import React from 'react'
import DocumentTitle from 'react-document-title'
import ReactHeight from 'react-height'

import Header from './header/header'
import Content from './content/content'
import Footer from './footer/footer'
import { APP_NAME } from '../constants'

class Layout extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      headerHeight: 0,
      footerHeight: 0
    }
    console.log('Window:', window.innerHeight)
  }

  updateHeaderHeight(height) {
    console.log('Header:', height)
    this.setState({
      headerHeight: height,
      footerHeight: this.state.footerHeight
    })
  }

  updateFooterHeight(height) {
    console.log('Footer:', height)
    this.setState({
      headerHeight: this.state.headerHeight,
      footerHeight: height
    })
  }

  render() {
    return (
      <div>
        <DocumentTitle title={APP_NAME}/>
        <ReactHeight onHeightReady={this.updateHeaderHeight.bind(this)}>
          <Header/>
        </ReactHeight>

        <Content minHeight={window.innerHeight - (2 * this.state.headerHeight) - this.state.footerHeight} />

        <ReactHeight onHeightReady={this.updateFooterHeight.bind(this)}>
          <Footer/>
        </ReactHeight>
      </div>
    )
  }
}

export default Layout
