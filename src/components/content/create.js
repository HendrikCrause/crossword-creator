import React from 'react'
import Editor from '../editor/editor'

class Create extends React.Component {
  render() {
    return (
      <div>
        <p>Enter the words and clues that should be included in the crossword puzzle</p>
        <Editor/>
      </div>
    )
  }
}

export default Create
