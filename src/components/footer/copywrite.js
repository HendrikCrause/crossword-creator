import React from 'react'
import Paper from 'material-ui/Paper'

const style = {
  textAlign: 'center'
}

class Copywrite extends React.Component {
  render() {
    return (
      <p style={style}>&copy; {new Date().getFullYear()}</p>
    )
  }
}

export default Copywrite
