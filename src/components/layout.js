import React from 'react'
import Header from './header/header'
import Footer from './footer/footer'
import Content from './content/content'
import { APP_NAME } from '../constants'
import DocumentTitle from 'react-document-title'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <DocumentTitle title={APP_NAME}/>
        <Header/>
        <Content/>
        <Footer/>
      </div>
    )
  }
}

export default Layout
