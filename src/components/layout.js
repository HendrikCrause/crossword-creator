import React from 'react'
import Header from './header/header'
import Footer from './footer/footer'
import Content from './content'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Content/>
        <Footer/>
      </div>
    )
  }
}

export default Layout
