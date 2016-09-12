import React from 'react'
import Crossword from './crossword/crossword'

class Content extends React.Component {

  render() {
    return (
      <div style={{width: '90%', margin: 'auto'}}>
          <Crossword/>
      </div>
    )
  }
}

export default Content
