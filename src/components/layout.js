import React from 'react'
import Header from './header/header'
import Footer from './footer/footer'
import Content from './content'
import { appName } from '../constants'
import DocumentTitle from 'react-document-title'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <DocumentTitle title={appName}/>
        <Header location={this.props.location}/>
        <Content>{this.props.children}</Content>
        <Footer/>
      </div>
    )
  }
}

export default Layout
